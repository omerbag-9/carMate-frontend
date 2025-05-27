import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine'; // Assuming UnderLine is in the same relative path
import img1 from "../../assets/images/ProfilePhoto.png"; // Default image
import axios from 'axios';
import Cookies from "js-cookie";

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(row => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

const headers = {
  token: getCookie("token"),
  "Content-Type": "application/json"
};

export default function OwnPosts() {
  const { t } = useTranslation();
  const [ownPosts, setOwnPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});
  const [commentContent, setCommentContent] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get current user ID (adjust based on your actual user object structure)
  const getCurrentUserId = () => {
    return currentUser?.id || currentUser?.user?.id;
  };

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return;

      const response = await axios.get("https://fb-m90x.onrender.com/user/myprofile", {
        headers: { token: `${token}` }
      });
      setCurrentUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch comments for a specific post
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `https://fb-m90x.onrender.com/comment/comments/${postId}`,
        { headers }
      );
      if (response.data.status === "success") {
        setComments(prev => ({
          ...prev,
          [postId]: {
            comments: response.data.data.comments,
            totalComments: response.data.data.totalComments
          }
        }));
      }
    } catch (err) {
      console.error("Error fetching comments:", err.response?.data || err);
    }
  };

  // Toggle like status for a post
  const toggleLike = async (postId) => {
    const currentUserId = getCurrentUserId();
    try {
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));

      const response = await axios.patch(
        `https://fb-m90x.onrender.com/user/LikePost/${postId}`,
        {},
        {
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setOwnPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: response.data.data.likes,
                }
              : post
          )
        );
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: response.data.data.likes.includes(currentUserId),
        }));
      } else {
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: !prev[postId],
        }));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
    }
  };

  // Submit a new comment
  const submitComment = async (postId) => {
    const commentText = commentContent[postId]?.trim();
    if (!commentText) return;

    try {
      await axios.post(
        `https://fb-m90x.onrender.com/comment/comments/${postId}`,
        { commentContent: commentText },
        { headers }
      );
      setCommentContent(prev => ({
        ...prev,
        [postId]: ''
      }));
      fetchComments(postId);
    } catch (err) {
      console.error("Error submitting comment:", err.response?.data || err);
    }
  };

  // Toggle comments visibility
  const toggleComments = (postId) => {
    if (!showComments[postId] && !comments[postId]) {
      fetchComments(postId);
    }
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Handle comment input change
  const handleCommentChange = (postId, value) => {
    setCommentContent(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Fetch own posts
  const fetchOwnPosts = async (page = 1) => {
    try {
      setLoading(page === 1);
      setIsLoadingMore(page > 1);

      const response = await axios.get(
        `https://fb-m90x.onrender.com/community/getOwnPosts?page=${page}&size=10`,
        { headers }
      );

      if (response.data.status === "success" && Array.isArray(response.data.data.Posts)) {
        setOwnPosts(prev =>
          page === 1
            ? [...response.data.data.Posts]
            : [...prev, ...response.data.data.Posts]
        );
        setHasMore(response.data.data.Posts.length === 10);
      } else {
        console.error("Unexpected response format for own posts:", response.data);
        setError("Invalid data format received for your posts.");
      }
    } catch (err) {
      console.error('Error fetching own posts:', err);
      setError('Failed to load your posts. Please ensure you are logged in.');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Load more own posts function
  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !loading) {
      try {
        setIsLoadingMore(true);
        const nextPage = currentPage + 1;

        const response = await axios.get(
          `https://fb-m90x.onrender.com/community/getOwnPosts?page=${nextPage}&size=10`,
          { headers }
        );

        if (response.data.status === "success" && Array.isArray(response.data.data.Posts)) {
          const newPosts = response.data.data.Posts;
          if (newPosts.length > 0) {
            setOwnPosts(prev => [...prev, ...newPosts]);
            setCurrentPage(nextPage);
            setHasMore(newPosts.length === 10);
          } else {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error('Error loading more own posts:', err);
        setHasMore(false);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [currentPage, hasMore, isLoadingMore, loading]);

  // Initial fetch for current user and own posts
  useEffect(() => {
    fetchCurrentUser();
    fetchOwnPosts();
  }, []);

  // Initialize likes state and fetch comments for fetched posts
  useEffect(() => {
    if (ownPosts.length > 0 && currentUser) {
      const currentUserId = getCurrentUserId();
      setLikedPosts((prev) => {
        const updatedLikedPosts = { ...prev };
        ownPosts.forEach((post) => {
          updatedLikedPosts[post.id] = post.likes?.includes(currentUserId) || false;
        });
        return updatedLikedPosts;
      });
      ownPosts.forEach((post) => fetchComments(post.id));
    }
  }, [ownPosts, currentUser]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoadingMore && !loading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    const loadMoreTrigger = document.getElementById('load-more-own-posts-trigger');
    if (loadMoreTrigger && hasMore) {
      observer.observe(loadMoreTrigger);
    }

    return () => {
      if (loadMoreTrigger) {
        observer.unobserve(loadMoreTrigger);
      }
    };
  }, [hasMore, isLoadingMore, loading, loadMore]);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex-wrap justify-center jsutify-items-center">
        {/* Title for Own Posts */}
        <div className="community-title lg:w-1/4 sm:w-1/2 text-center my-10 mt-20 mx-auto">
                  </div>

        {/* Own Posts Section */}
        <div className="posts flex-1 lg:max-w-xl mx-auto">
          {loading && (
            <div className="text-center py-10 text-white">
              <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
              <p className="mt-2">Loading your posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-10 bg-[#232326] p-5 rounded-xl">
              <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
              <p className="mt-2">{error}</p>
            </div>
          )}

          {!loading && !error && ownPosts.length === 0 && (
            <div className="text-center py-10 text-white bg-[#232326] p-5 rounded-xl">
              <p>You haven't created any posts yet.</p>
            </div>
          )}

          {!loading && !error && ownPosts.map(post => (
            <div key={post.id} className="post text-white bg-[#232326] p-5 w-full mx-auto my-5 rounded-xl">
              {/* User Profile Section */}
              <div className="profile flex items-center">
                <div className="profile-pic w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={post.user?.profilePhoto?.[0] || img1}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="info ml-4">
                  <h3 className="text-lg font-semibold">
                    {`${post.user?.firstName || ''} ${post.user?.lastName || ''}`}
                  </h3>
                  <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
                </div>
              </div>

              {/* Post Content */}
              <p className="mt-4">{post.postContent}</p>

              {/* Post Images */}
              {post.images?.length > 0 && (
                <div className="mt-4">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Post"
                      className="rounded-lg w-full object-cover max-h-96"
                    />
                  ))}
                </div>
              )}

              {/* Like and Comment Buttons */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`px-3 py-2 text-lg transition-colors rounded-lg ${
                    likedPosts[post.id]
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "flex items-center space-x-2 px-4 py-2 rounded-lg bg-transparent border border-white text-white hover:bg-blue-500/10 transition-colors"
                  }`}
                >
                  <i className={`${likedPosts[post.id] ? "fas" : "far"} fa-thumbs-up px-1`}></i>
                  {(post.likes || []).length} {t("Community.post.likes")}
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-transparent border border-white text-white hover:bg-blue-500/10 transition-colors"
                >
                  <i className="fa-regular fa-comments mx-1"></i>
                  <span>{comments[post.id]?.totalComments || 0} {t('Community.post.comments')}</span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4 space-y-4">
                  <div className="text-sm text-gray-400 mb-2">
                    {comments[post.id]?.totalComments || 0} {t('Community.post.comments')}
                  </div>
                  {comments[post.id]?.comments?.length > 0 ? (
                    comments[post.id].comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3 bg-black/20 p-3 rounded-lg">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={comment.user?.profilePhoto?.[0] || img1}
                            alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {`${comment.user?.firstName || ''} ${comment.user?.lastName || ''}`}
                          </p>
                          <p className="text-gray-300 mt-1">{comment.commentContent}</p>
                          <p className="text-gray-500 text-xs mt-1">{formatDate(comment.createdAt)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}

                  {/* Comment Input */}
                  <div className="flex items-center space-x-2 bg-black/20 rounded-full p-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={currentUser?.user?.profilePhoto?.[0] || img1}
                        alt={`${currentUser?.user?.firstName || 'User'}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={t('Community.post.writeComment')}
                      className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0"
                      value={commentContent[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && submitComment(post.id)}
                    />
                    <button
                      onClick={() => submitComment(post.id)}
                      className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                    >
                      <i className="fa-solid fa-paper-plane text-sm"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {hasMore && (
            <div id="load-more-own-posts-trigger" className="h-10 w-full" />
          )}

          {isLoadingMore && (
            <div className="text-center py-5 text-white">
              <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
              <p className="mt-2">Loading more of your posts...</p>
            </div>
          )}

          {!hasMore && ownPosts.length > 0 && !loading && (
            <div className="text-center py-8 text-gray-400">
              <i className="fa-solid fa-check-circle text-2xl mb-2"></i>
              <p className="text-lg">You've reached the end of your posts!</p>
              <p className="text-sm">No more posts to load.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}