import { Comment } from '../models/Comment';
import { ICommentRepository } from './ICommentRepository';
import { DatabaseManager } from '../database/DatabaseManager';

export class CommentRepository implements ICommentRepository {
  private readonly storeName = 'comments';

  async getAll(): Promise<Comment[]> {
    const db = await DatabaseManager.getInstance();
    const tx = db.transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    const data = await store.getAll();
    await tx.done;
    return data.map(Comment.fromJSON);
  }

  async getById(id: string): Promise<Comment | null> {
    const db = await DatabaseManager.getInstance();
    const tx = db.transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    const data = await store.get(id);
    await tx.done;
    return data ? Comment.fromJSON(data) : null;
  }

  async getByPostId(postId: string): Promise<Comment[]> {
    const db = await DatabaseManager.getInstance();
    const tx = db.transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    const index = store.index('postId');
    const data = await index.getAll(postId);
    await tx.done;
    return data.map(Comment.fromJSON).sort((a, b) => b.timestamp - a.timestamp);
  }

  async getByUserId(userId: string): Promise<Comment[]> {
    const db = await DatabaseManager.getInstance();
    const tx = db.transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    const index = store.index('userId');
    const data = await index.getAll(userId);
    await tx.done;
    return data.map(Comment.fromJSON).sort((a, b) => b.timestamp - a.timestamp);
  }

  async create(comment: Comment): Promise<Comment> {
    const db = await DatabaseManager.getInstance();
    const tx = db.transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.add(comment.toJSON());
    await tx.done;
    return comment;
  }

  async update(id: string, data: Partial<Comment>): Promise<Comment | null> {
    const db = await DatabaseManager.getInstance();
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated = { ...existing.toJSON(), ...data };
    const tx = db.transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.put(updated);
    await tx.done;
    return Comment.fromJSON(updated);
  }

  async delete(id: string): Promise<boolean> {
    const db = await DatabaseManager.getInstance();
    const tx = db.transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.delete(id);
    await tx.done;
    return true;
  }

  async incrementLikes(commentId: string): Promise<boolean> {
    const comment = await this.getById(commentId);
    if (!comment) return false;
    await this.update(commentId, { likes: comment.likes + 1 });
    return true;
  }

  async decrementLikes(commentId: string): Promise<boolean> {
    const comment = await this.getById(commentId);
    if (!comment) return false;
    await this.update(commentId, { likes: Math.max(0, comment.likes - 1) });
    return true;
  }
}
