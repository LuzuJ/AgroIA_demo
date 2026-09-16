import { User } from '../models';
import { IUserRepository } from '../repositories/IUserRepository';

export class UserController {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.userRepository.getById(id);
    } catch (error) {
      console.error(`Error getting user ${id}:`, error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.getByEmail(email);
    } catch (error) {
      console.error(`Error getting user by email ${email}:`, error);
      return null;
    }
  }

  async getUsersByRole(role: string): Promise<User[]> {
    try {
      return await this.userRepository.getUsersByRole(role);
    } catch (error) {
      console.error(`Error getting users by role ${role}:`, error);
      return [];
    }
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    try {
      const newUser = new User(
        crypto.randomUUID(),
        userData.name,
        userData.avatar,
        userData.location,
        userData.role,
        userData.email,
        userData.bio
      );
      return await this.userRepository.create(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      return await this.userRepository.update(id, userData);
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      return false;
    }
  }
}
