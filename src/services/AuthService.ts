import { User, UserRole } from '../models/User';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  location: string;
  avatar?: string;
}

export class AuthService {
  private readonly db: IDBDatabase;
  private readonly CURRENT_USER_KEY = 'agriconnect_current_user';

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  /**
   * Login de usuario
   */
  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      // Buscar usuario por email
      const allUsers = await this.getAllUsers();
      const user = allUsers.find(u => u.email === credentials.email);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar password (en producción usar bcrypt o similar)
      if (user.password !== credentials.password) {
        throw new Error('Contraseña incorrecta');
      }

      // Guardar sesión en localStorage
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user.toJSON()));

      return user;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Registro de nuevo usuario
   */
  async register(data: RegisterData): Promise<User> {
    try {
      // Verificar si el email ya existe
      const allUsers = await this.getAllUsers();
      const existingUser = allUsers.find(u => u.email === data.email);

      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = new User(
        `user-${Date.now()}`,
        data.name,
        data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=10b981&color=fff`,
        data.location,
        data.role,
        data.email,
        data.password,
        undefined,
        new Date()
      );

      // Guardar en base de datos
      await this.addUser(newUser);

      // Guardar sesión
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser.toJSON()));

      return newUser;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  /**
   * Logout
   */
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  /**
   * Obtener usuario actual desde localStorage
   */
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(this.CURRENT_USER_KEY);
      if (!userData) return null;

      const json = JSON.parse(userData);
      return User.fromJSON(json);
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  }

  /**
   * Verificar si hay sesión activa
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const user = await this.getUser(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const updatedUser = {
        ...user,
        ...updates,
        id: user.id, // Asegurar que el ID no cambie
        email: user.email, // Asegurar que el email no cambie
      };

      await this.updateUser(updatedUser);

      // Actualizar sesión si es el usuario actual
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
      }

      return User.fromJSON(updatedUser);
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  }

  // Helper methods para interactuar con IndexedDB
  private getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.getAll();

      request.onsuccess = () => {
        const users = request.result.map((u: any) => User.fromJSON(u));
        resolve(users);
      };

      request.onerror = () => reject(request.error);
    });
  }

  private getUser(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result) {
          resolve(User.fromJSON(request.result));
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  private addUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.add(user.toJSON());

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private updateUser(user: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.put(user);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
