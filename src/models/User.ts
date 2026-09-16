export type UserRole = 'Agricultor' | 'Ingeniero' | 'Proveedor';

export class User {
  constructor(
    public id: string,
    public name: string,
    public avatar: string,
    public location: string,
    public role: UserRole,
    public email: string,
    public password: string,
    public bio?: string,
    public createdAt: Date = new Date()
  ) {}

  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.name,
      json.avatar,
      json.location,
      json.role,
      json.email,
      json.password,
      json.bio,
      json.createdAt ? new Date(json.createdAt) : new Date()
    );
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      location: this.location,
      role: this.role,
      email: this.email,
      password: this.password,
      bio: this.bio,
      createdAt: this.createdAt.toISOString()
    };
  }

  // Método para obtener usuario sin password (para mostrar en UI)
  toPublicJSON(): any {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      location: this.location,
      role: this.role,
      email: this.email,
      bio: this.bio,
      createdAt: this.createdAt.toISOString()
    };
  }
}
