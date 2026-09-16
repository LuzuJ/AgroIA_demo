import { IRepository } from './IRepository';
import { Group } from '../models';

export interface IGroupRepository extends IRepository<Group> {
  getJoinedGroups(): Promise<Group[]>;
  toggleJoin(groupId: string): Promise<Group | null>;
  searchByName(query: string): Promise<Group[]>;
}
