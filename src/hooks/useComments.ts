import { useState, useEffect } from 'react';
import { container } from '../config';
import { Comment } from '../models/Comment';

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await container.commentController.getCommentsByPostId(postId);
      setComments(data);
      setError(null);
    } catch (err) {
      setError('Error loading comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      loadComments();
    }
  }, [postId]);

  const addComment = async (commentData: {
    userId: string;
    author: string;
    authorAvatar: string;
    content: string;
  }) => {
    try {
      const newComment = await container.commentController.createComment({
        postId,
        ...commentData,
      });
      setComments(prev => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      console.error('Error creating comment:', err);
      throw err;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await container.commentController.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const likeComment = async (commentId: string) => {
    try {
      await container.commentController.likeComment(commentId);
      await loadComments();
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    likeComment,
    refresh: loadComments,
  };
}
