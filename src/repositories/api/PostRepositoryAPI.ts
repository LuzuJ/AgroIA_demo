import { IPostRepository } from '../IPostRepository';
import { Post } from '../../models';
import { apiClient } from './ApiClient';

/**
 * Post Repository - API REST Implementation
 * Alternative implementation using REST API instead of IndexedDB
 * Demonstrates how easy it is to swap data sources
 */
export class PostRepositoryAPI implements IPostRepository {
  private readonly endpoint = '/posts';

  async getAll(): Promise<Post[]> {
    const data = await apiClient.get<any[]>(this.endpoint);
    return data.map(item => Post.fromJSON(item));
  }

  async getById(id: string): Promise<Post | null> {
    try {
      const data = await apiClient.get<any>(`${this.endpoint}/${id}`);
      return Post.fromJSON(data);
    } catch (error) {
      return null;
    }
  }

  async create(post: Post): Promise<Post> {
    const data = await apiClient.post<any>(this.endpoint, post.toJSON());
    return Post.fromJSON(data);
  }

  async update(id: string, postData: Partial<Post>): Promise<Post | null> {
    try {
      const data = await apiClient.put<any>(`${this.endpoint}/${id}`, postData);
      return Post.fromJSON(data);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getByUserId(userId: string): Promise<Post[]> {
    const data = await apiClient.get<any[]>(`${this.endpoint}?userId=${userId}`);
    return data.map(item => Post.fromJSON(item));
  }

  async getByTags(tags: string[]): Promise<Post[]> {
    const tagsQuery = tags.join(',');
    const data = await apiClient.get<any[]>(`${this.endpoint}?tags=${tagsQuery}`);
    return data.map(item => Post.fromJSON(item));
  }

  async getRecent(limit: number = 20): Promise<Post[]> {
    const data = await apiClient.get<any[]>(`${this.endpoint}?limit=${limit}&sort=timestamp:desc`);
    return data.map(item => Post.fromJSON(item));
  }

  async incrementLikes(postId: string): Promise<boolean> {
    try {
      await apiClient.post(`${this.endpoint}/${postId}/like`, {});
      return true;
    } catch (error) {
      return false;
    }
  }

  async decrementLikes(postId: string): Promise<boolean> {
    try {
      await apiClient.post(`${this.endpoint}/${postId}/unlike`, {});
      return true;
    } catch (error) {
      return false;
    }
  }
}
