import { Post } from '../models';
import { IPostRepository } from '../repositories/IPostRepository';

export class PostController {
  constructor(private postRepository: IPostRepository) {}

  async getAllPosts(): Promise<Post[]> {
    try {
      return await this.postRepository.getAll();
    } catch (error) {
      console.error('Error getting all posts:', error);
      return [];
    }
  }

  async getRecentPosts(limit: number = 20): Promise<Post[]> {
    try {
      return await this.postRepository.getRecent(limit);
    } catch (error) {
      console.error('Error getting recent posts:', error);
      return [];
    }
  }

  async getPostById(id: string): Promise<Post | null> {
    try {
      return await this.postRepository.getById(id);
    } catch (error) {
      console.error(`Error getting post ${id}:`, error);
      return null;
    }
  }

  async getPostsByUserId(userId: string): Promise<Post[]> {
    try {
      return await this.postRepository.getByUserId(userId);
    } catch (error) {
      console.error(`Error getting posts by user ${userId}:`, error);
      return [];
    }
  }

  async getPostsByTags(tags: string[]): Promise<Post[]> {
    try {
      return await this.postRepository.getByTags(tags);
    } catch (error) {
      console.error('Error getting posts by tags:', error);
      return [];
    }
  }

  async createPost(postData: {
    userId: string;
    author: string;
    authorAvatar: string;
    content: string;
    tags?: string[];
    image?: string;
  }): Promise<Post> {
    try {
      const newPost = new Post(
        crypto.randomUUID(),
        postData.userId,
        postData.author,
        postData.authorAvatar,
        postData.content,
        0,
        0,
        postData.tags || [],
        postData.image
      );
      return await this.postRepository.create(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  async updatePost(id: string, postData: Partial<Post>): Promise<Post | null> {
    try {
      return await this.postRepository.update(id, postData);
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
      return null;
    }
  }

  async deletePost(id: string): Promise<boolean> {
    try {
      return await this.postRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting post ${id}:`, error);
      return false;
    }
  }

  async likePost(postId: string): Promise<boolean> {
    try {
      return await this.postRepository.incrementLikes(postId);
    } catch (error) {
      console.error(`Error liking post ${postId}:`, error);
      return false;
    }
  }

  async unlikePost(postId: string): Promise<boolean> {
    try {
      return await this.postRepository.decrementLikes(postId);
    } catch (error) {
      console.error(`Error unliking post ${postId}:`, error);
      return false;
    }
  }

  async searchPosts(query: string): Promise<Post[]> {
    try {
      if (!query.trim()) return this.getRecentPosts();
      return await this.postRepository.searchPosts(query);
    } catch (error) {
      console.error('Error searching posts:', error);
      return [];
    }
  }
}
