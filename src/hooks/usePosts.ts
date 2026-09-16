import { useState, useEffect } from 'react';
import { container } from '../config';
import { Post } from '../models';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await container.postController.getRecentPosts();
      setAllPosts(data);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Error loading posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Filter posts based on search and tags
  useEffect(() => {
    let filtered = [...allPosts];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(lowerQuery) ||
        post.author.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.some(tag => 
          post.tags.some(postTag => 
            postTag.toLowerCase() === tag.toLowerCase()
          )
        )
      );
    }

    setPosts(filtered);
  }, [searchQuery, selectedTags, allPosts]);

  const createPost = async (postData: {
    userId: string;
    author: string;
    authorAvatar: string;
    content: string;
    tags?: string[];
    image?: string;
  }) => {
    try {
      const newPost = await container.postController.createPost(postData);
      setAllPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  };

  const likePost = async (postId: string) => {
    try {
      await container.postController.likePost(postId);
      await loadPosts();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await container.postController.deletePost(postId);
      setAllPosts(prev => prev.filter(p => p.id !== postId));
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const updatePost = async (postId: string, updates: Partial<Post>) => {
    try {
      const updated = await container.postController.updatePost(postId, updates);
      if (updated) {
        await loadPosts();
      }
      return updated;
    } catch (err) {
      console.error('Error updating post:', err);
      return null;
    }
  };

  return {
    posts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    createPost,
    likePost,
    deletePost,
    updatePost,
    refresh: loadPosts,
  };
}
