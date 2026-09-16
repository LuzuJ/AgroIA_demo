import { IRepository } from './IRepository';
import { User } from '../models';

export interface IUserRepository extends IRepository<User> {
  getByEmail(email: string): Promise<User | null>;
  getUsersByRole(role: string): Promise<User[]>;
}
