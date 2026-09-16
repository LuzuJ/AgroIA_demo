import { Group } from '../models';
import { IGroupRepository } from '../repositories/IGroupRepository';

export class GroupController {
  constructor(private groupRepository: IGroupRepository) {}

  async getAllGroups(): Promise<Group[]> {
    try {
      return await this.groupRepository.getAll();
    } catch (error) {
      console.error('Error getting all groups:', error);
      return [];
    }
  }

  async getJoinedGroups(): Promise<Group[]> {
    try {
      return await this.groupRepository.getJoinedGroups();
    } catch (error) {
      console.error('Error getting joined groups:', error);
      return [];
    }
  }

  async getGroupById(id: string): Promise<Group | null> {
    try {
      return await this.groupRepository.getById(id);
    } catch (error) {
      console.error(`Error getting group ${id}:`, error);
      return null;
    }
  }

  async searchGroups(query: string): Promise<Group[]> {
    try {
      return await this.groupRepository.searchByName(query);
    } catch (error) {
      console.error('Error searching groups:', error);
      return [];
    }
  }

  async createGroup(groupData: {
    name: string;
    description: string;
    image: string;
    adminId?: string;
  }): Promise<Group> {
    try {
      const newGroup = new Group(
        crypto.randomUUID(),
        groupData.name,
        groupData.description,
        groupData.image,
        0,
        false,
        new Date(),
        groupData.adminId
      );
      return await this.groupRepository.create(newGroup);
    } catch (error) {
      console.error('Error creating group:', error);
      throw new Error('Failed to create group');
    }
  }

  async updateGroup(id: string, groupData: Partial<Group>): Promise<Group | null> {
    try {
      return await this.groupRepository.update(id, groupData);
    } catch (error) {
      console.error(`Error updating group ${id}:`, error);
      return null;
    }
  }

  async deleteGroup(id: string): Promise<boolean> {
    try {
      return await this.groupRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting group ${id}:`, error);
      return false;
    }
  }

  async toggleJoinGroup(groupId: string): Promise<Group | null> {
    try {
      return await this.groupRepository.toggleJoin(groupId);
    } catch (error) {
      console.error(`Error toggling join for group ${groupId}:`, error);
      return null;
    }
  }
}
