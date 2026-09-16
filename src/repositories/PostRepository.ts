import { IPostRepository } from './IPostRepository';
import { Post } from '../models';
import { dbManager } from '../database/DatabaseManager';

export class PostRepository implements IPostRepository {
  private readonly storeName = 'posts';

  async getAll(): Promise<Post[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const posts = request.result.map((data: any) => Post.fromJSON(data));
        resolve(posts);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getById(id: string): Promise<Post | null> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result ? Post.fromJSON(request.result) : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async create(post: Post): Promise<Post> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(post.toJSON());

      request.onsuccess = () => resolve(post);
      request.onerror = () => reject(request.error);
    });
  }

  async update(id: string, postData: Partial<Post>): Promise<Post | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated = Object.assign(existing, postData);
    const db = await dbManager.getDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(updated.toJSON());

      request.onsuccess = () => resolve(updated);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(id: string): Promise<boolean> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async getByUserId(userId: string): Promise<Post[]> {
    const db = await dbManager.getDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('userId');
      const request = index.getAll(userId);

      request.onsuccess = () => {
        const posts = request.result.map((data: any) => Post.fromJSON(data));
        resolve(posts);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getByTags(tags: string[]): Promise<Post[]> {
    const allPosts = await this.getAll();
    return allPosts.filter(post => 
      tags.some(tag => post.tags.some(postTag => 
        postTag.toLowerCase().includes(tag.toLowerCase())
      ))
    ).sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }

  async searchPosts(query: string): Promise<Post[]> {
    const allPosts = await this.getAll();
    const lowerQuery = query.toLowerCase();
    return allPosts.filter(post => 
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }

  async getRecent(limit: number = 20): Promise<Post[]> {
    const allPosts = await this.getAll();
    return allPosts
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async incrementLikes(postId: string): Promise<boolean> {
    const post = await this.getById(postId);
    if (!post) return false;

    post.like();
    await this.update(postId, post);
    return true;
  }

  async decrementLikes(postId: string): Promise<boolean> {
    const post = await this.getById(postId);
    if (!post) return false;

    post.unlike();
    await this.update(postId, post);
    return true;
  }
}
