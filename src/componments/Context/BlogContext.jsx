import React, { createContext, useState, useContext } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);

  const toggleSavePost = (post) => {
    setSavedPosts((prev) =>
      prev.some((p) => p.id === post.id)
        ? prev.filter((p) => p.id !== post.id)
        : [...prev, post]
    );
  };

  const toggleLikePost = (post) => {
    setLikedPosts((prev) =>
      prev.some((p) => p.id === post.id)
        ? prev.filter((p) => p.id !== post.id)
        : [...prev, post]
    );
  };

  const addCommentedPost = (post) => {
    setCommentedPosts((prev) =>
      prev.some((p) => p.id === post.id) ? prev : [...prev, post]
    );
  };

  return (
    <BlogContext.Provider
      value={{
        savedPosts,
        likedPosts,
        commentedPosts,
        toggleSavePost,
        toggleLikePost,
        addCommentedPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);


/*
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data from MongoDB
  useEffect(() => {
    const fetchUserBlogData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/user/blog-interactions');
        const { savedPosts, likedPosts, commentedPosts } = response.data;
        
        setSavedPosts(savedPosts || []);
        setLikedPosts(likedPosts || []);
        setCommentedPosts(commentedPosts || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch blog data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogData();
  }, []);

  const toggleSavePost = async (post) => {
    try {
      const isSaved = savedPosts.some(p => p.id === post.id);
      const newSavedPosts = isSaved
        ? savedPosts.filter(p => p.id !== post.id)
        : [...savedPosts, post];

      setSavedPosts(newSavedPosts);
      
      // Update in MongoDB
      await axios.post('/api/user/save-post', { 
        postId: post.id,
        action: isSaved ? 'unsave' : 'save'
      });
    } catch (err) {
      setError('Failed to update saved posts');
      // Revert local state on error
      setSavedPosts(savedPosts);
    }
  };

  const toggleLikePost = async (post) => {
    try {
      const isLiked = likedPosts.some(p => p.id === post.id);
      const newLikedPosts = isLiked
        ? likedPosts.filter(p => p.id !== post.id)
        : [...likedPosts, post];

      setLikedPosts(newLikedPosts);
      
      // Update in MongoDB
      await axios.post('/api/user/like-post', {
        postId: post.id,
        action: isLiked ? 'unlike' : 'like'
      });
    } catch (err) {
      setError('Failed to update liked posts');
      // Revert local state on error
      setLikedPosts(likedPosts);
    }
  };

  const addCommentedPost = async (post) => {
    try {
      if (!commentedPosts.some(p => p.id === post.id)) {
        const newCommentedPosts = [...commentedPosts, post];
        setCommentedPosts(newCommentedPosts);
        
        // Update in MongoDB
        await axios.post('/api/user/add-comment', {
          postId: post.id
        });
      }
    } catch (err) {
      setError('Failed to update commented posts');
    }
  };

  return (
    <BlogContext.Provider
      value={{
        savedPosts,
        likedPosts,
        commentedPosts,
        loading,
        error,
        toggleSavePost,
        toggleLikePost,
        addCommentedPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};

*/