import { Comment } from '../models/Comment';
import { ICommentRepository } from '../repositories/ICommentRepository';
import { IPostRepository } from '../repositories/IPostRepository';

export class CommentController {
  constructor(
    private commentRepository: ICommentRepository,
    private postRepository?: IPostRepository
  ) {}

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      return await this.commentRepository.getByPostId(postId);
    } catch (error) {
      console.error(`Error getting comments for post ${postId}:`, error);
      return [];
    }
  }

  async createComment(commentData: {
    postId: string;
    userId: string;
    author: string;
    authorAvatar: string;
    content: string;
  }): Promise<Comment> {
    try {
      const newComment = new Comment(
        crypto.randomUUID(),
        commentData.postId,
        commentData.userId,
        commentData.author,
        commentData.authorAvatar,
        commentData.content
      );
      
      const createdComment = await this.commentRepository.create(newComment);
      
      // Increment comment count on post if postRepository is available
      if (this.postRepository) {
        const post = await this.postRepository.getById(commentData.postId);
        if (post) {
          await this.postRepository.update(commentData.postId, {
            comments: (post.comments || 0) + 1
          });
        }
      }
      
      return createdComment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Failed to create comment');
    }
  }

  async deleteComment(id: string): Promise<boolean> {
    try {
      // Get comment to find post ID
      const comment = await this.commentRepository.getById(id);
      const deleted = await this.commentRepository.delete(id);
      
      // Decrement comment count on post if postRepository is available
      if (deleted && comment && this.postRepository) {
        const post = await this.postRepository.getById(comment.postId);
        if (post) {
          await this.postRepository.update(comment.postId, {
            comments: Math.max(0, (post.comments || 0) - 1)
          });
        }
      }
      
      return deleted;
    } catch (error) {
      console.error(`Error deleting comment ${id}:`, error);
      return false;
    }
  }

  async likeComment(commentId: string): Promise<boolean> {
    try {
      return await this.commentRepository.incrementLikes(commentId);
    } catch (error) {
      console.error(`Error liking comment ${commentId}:`, error);
      return false;
    }
  }
}
