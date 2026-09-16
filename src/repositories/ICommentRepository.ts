import { Comment } from '../models/Comment';
import { IRepository } from './IRepository';

export interface ICommentRepository extends IRepository<Comment> {
  getByPostId(postId: string): Promise<Comment[]>;
  getByUserId(userId: string): Promise<Comment[]>;
  incrementLikes(commentId: string): Promise<boolean>;
  decrementLikes(commentId: string): Promise<boolean>;
}
