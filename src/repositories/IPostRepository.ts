import { IRepository } from './IRepository';
import { Post } from '../models';

export interface IPostRepository extends IRepository<Post> {
  getByUserId(userId: string): Promise<Post[]>;
  getByTags(tags: string[]): Promise<Post[]>;
  getRecent(limit: number): Promise<Post[]>;
  incrementLikes(postId: string): Promise<boolean>;
  decrementLikes(postId: string): Promise<boolean>;
  searchPosts(query: string): Promise<Post[]>;
}
