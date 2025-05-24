import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';
import img1 from "../../assets/images/ProfilePhoto.png";
import img2 from "../../assets/images/ProfilePhoto2.png";
import img3 from "../../assets/images/Ellipse7.png";
import axios from 'axios';
import Cookies from "js-cookie";

// Add headers configuration
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(row => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

const headers = {
  token: getCookie("token"),
  "Content-Type": "application/json"
};

// Create Post Popup Component
const CreatePostPopup = ({ onClose, t, onPostCreated, currentUser }) => {
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Create Post
  const handleSubmit = async () => {
    if (!postContent || !postContent.trim()) {
      console.warn("Content is empty!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("postContent", postContent.trim()); 

      // Image Upload
      if (selectedImage) {
        if (selectedImage instanceof File) {
          formData.append("images", selectedImage); 
        } else {
          console.warn("selectedImage is not a valid File object");
        }
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        "https://fb-m90x.onrender.com/community/createPost",
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(" Response:", response.data);

      if (response.data) {
        onPostCreated();
        onClose();
      }
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#232326] rounded-2xl w-[90%] max-w-lg relative">
        {/* Header */}
        <div className="p-4 relative flex justify-between items-center">
          <div className="w-full text-center"> 
            <h3 className="text-[#F8F8F8] text-xl">
              {t('Community.createPost.title')}
            </h3>
            <div className="w-full mx-auto mt-4">
              <UnderLine />
            </div>
          </div>
          <span 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 absolute ltr:right-4 rtl:left-4 mb-7">
            <i className="fa-solid fa-circle-xmark text-3xl"></i>
          </span>
        </div>
        
        {/* User Info */}
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={currentUser?.profilePhoto || img1} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 rtl:mr-3">
              <div className="text-[#F8F8F8] font-medium">
              {`${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`}
              </div>
              <div className="text-[#F8F8F8] text-sm">
               {`${currentUser?.firstName || ''}`}
              </div>
            </div>
          </div>

          {/* Post Input */}
          <textarea
            className="w-full mt-1 bg-transparent text-gray-200 resize-none text-lg border-none focus:ring-0 focus:outline-none min-h-[300px] placeholder-[#C9C9CA]"
            placeholder={t('Community.createPost.placeholder')}
            autoFocus
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          
          {/* Media Button */}
          <div className="absolute bottom-20 ltr:right-4 rtl:left-4">
            <label className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer">
              <input 
                type="file"
                accept="image/*"
                className="hidden"
                title={t('Community.createPost.mediaButton')}
                onChange={handleFileChange}
              />
              <i className="fa-solid fa-images text-[#BFBFBF] text-2xl"></i>
            </label>
            {selectedImage && (
              <div className="text-green-400 text-xs mt-1">
                Image selected
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <button 
            className={`w-full ${postContent.trim() ? 'bg-gray-300 text-black' : 'bg-gray-500 text-gray-200'} py-1 rounded-xl font-bold text-xl transition-colors`}
            onClick={handleSubmit}
            disabled={isSubmitting || !postContent.trim()}
          >
            {isSubmitting ? 'Posting...' : t('Community.createPost.postButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Community() {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});
  const [commentContent, setcommentContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Get current user ID
  const getCurrentUserId = () => {
    return currentUser?.id || currentUser?.user?.id;
  };

  // Fetch all posts
  const fetchPosts = async (page = 1) => {
    try {
        setLoading(page === 1);
        setIsLoadingMore(page > 1);
        
        const response = await axios.get(
            `https://fb-m90x.onrender.com/community/getAllPosts?page=${page}&size=10`, 
            { headers }
        );

        console.log('Fetched API Response:', response.data);

        if (Array.isArray(response.data.data)) {
            setPosts(prev => 
                page === 1 
                ? [...response.data.data] 
                : [...prev, ...response.data.data]
            );
            // More precise check for hasMore
            setHasMore(response.data.data.length === 10);
        } else {
            console.error("Unexpected response format:", response.data);
            setError("Invalid data format received from the server.");
        }
    } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Please Login First to access our Community');
    } finally {
        setLoading(false);
        setIsLoadingMore(false);
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
      // Optimistically update UI
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
        // Update posts with new likes array
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: response.data.data.likes, // This should be the updated array of user IDs
                }
              : post
          )
        );
        
        // Update the liked posts state based on the new likes array
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: response.data.data.likes.includes(currentUserId),
        }));
      } else {
        // Revert like state if request wasn't successful
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: !prev[postId],
        }));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      // Revert like state on error
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
  
      setcommentContent(prev => ({
        ...prev,
        [postId]: ''
      }));
  
      fetchComments(postId);
    } catch (err) {
      console.error("Error submitting comment:", err.response?.data || err);
    }
  };

  // Function to toggle comments visibility
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
    setcommentContent(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  // Function to handle popup visibility
  const handleShowPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto'; 
  };

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Load comments on component mount
  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => fetchComments(post.id));
    }
  }, [posts]);

  // Initialize likes state based on current user and posts
  useEffect(() => {
    if (posts.length > 0 && currentUser) {
      const currentUserId = getCurrentUserId();
      
      setLikedPosts((prev) => {
        const updatedLikedPosts = { ...prev };
        posts.forEach((post) => {
          // Check if current user's ID is in the likes array
          updatedLikedPosts[post.id] = post.likes?.includes(currentUserId) || false;
        });
        return updatedLikedPosts;
      });
    }
  }, [posts, currentUser]);

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

  // Fetch current user on component mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

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

  // Load more posts function
  const loadMore = React.useCallback(async () => {
    if (!isLoadingMore && hasMore && !loading) {
        try {
            setIsLoadingMore(true);
            const nextPage = currentPage + 1;
            
            const response = await axios.get(
                `https://fb-m90x.onrender.com/community/getAllPosts?page=${nextPage}&size=10`,
                { headers }
            );

            if (response.data.status === "success" && Array.isArray(response.data.data)) {
                const newPosts = response.data.data;
                
                if (newPosts.length > 0) {
                    setPosts(prev => [...prev, ...newPosts]);
                    setCurrentPage(nextPage);
                    // Only set hasMore to true if we got exactly 10 posts (indicating there might be more)
                    setHasMore(newPosts.length === 10);
                } else {
                    // No more posts available
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Error loading more posts:', err);
            setHasMore(false);
        } finally {
            setIsLoadingMore(false);
        }
    }
  }, [currentPage, hasMore, isLoadingMore, loading]);

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

    const loadMoreTrigger = document.getElementById('load-more-trigger');
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
    <>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${showPopup ? 'opacity-50' : ''}`}>
        <div className="flex-wrap justify-center jsutify-items-center">
          {/* Community Title and Description */}
          <div className="community-title lg:w-1/4 sm:w-1/2 text-center my-10 mt-20 mx-auto">
            <h1 className="mx-auto text-2xl">
              {t('Community.title')}
              <div className="w-1/2 mx-auto">
                <UnderLine />
              </div>
            </h1>
            <p className="mx-5">{t('Community.description')}</p>
          </div>

          {/* Posts and Side Panel Container */}
          <div className="flex flex-col lg:flex-row justify-center mx-auto">
            {/* Posts Section */}
            <div className="posts flex-1 lg:max-w-xl ">
              {/* Create Post Card */}
              <div className="creation-card relative text-white bg-[#232326] p-5 w-full mx-auto my-5 rounded-xl cursor-pointer" onClick={handleShowPopup}>
                <h3 className="mb-3 text-xl">{t('Community.createPost.title')}</h3>
                <p className="absolute top-[68px] ltr:left-8 rtl:right-8 text-white">
                  <i className="fa-solid fa-comment-dots text-xl"></i>
                </p>
                <input
                  className="w-full rounded-xl px-8 pb-3 text-white cursor-pointer bg-black placeholder:text-[#F8F8F8]"
                  type="text"
                  placeholder={t('Community.createPost.placeholder')}
                  readOnly
                />
                <div className="buttons flex justify-between mt-5">
                  <button className="bg-black text-[#F8F8F8] px-5 py-2 rounded-lg">
                    <i className="fa-solid fa-photo-film"></i> {t('Community.createPost.mediaButton')}
                  </button>
                  <button className="bg-black text-[#F8F8F8] px-5 py-2 rounded-lg">
                    <i className="fa-solid fa-paper-plane"></i> {t('Community.createPost.publishButton')}
                  </button>
                </div>
              </div>

              {/* Loading and Error States */}
              {loading && (
                <div className="text-center py-10 text-white">
                  <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
                  <p className="mt-2">Loading posts...</p>
                </div>
              )}
              
              {error && (
                <div className="text-center py-10  bg-[#232326] p-5 rounded-xl">
                  <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                  <p className="mt-2">{error}</p>
                </div>
              )}

              {/* Dynamic Posts */}
              {!loading && !error && posts.map(post => (
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

              {/* Show message if no posts */}
              {!loading && !error && posts.length === 0 && (
                <div className="text-center py-10 text-white bg-[#232326] p-5 rounded-xl">
                  <p>No posts yet. Be the first to create a post!</p>
                </div>
              )}

              {/* Load more trigger - only show if there are more posts */}
              {hasMore && (
                <div id="load-more-trigger" className="h-10 w-full" />
              )}
              
              {/* Loading more indicator */}
              {isLoadingMore && (
                <div className="text-center py-5 text-white">
                    <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
                    <p className="mt-2">Loading more posts...</p>
                </div>
              )}

              {/* No more posts message */}
              {!hasMore && posts.length > 0 && !loading && (
                <div className="text-center py-8 text-gray-400">
                  <i className="fa-solid fa-check-circle text-2xl mb-2"></i>
                  <p className="text-lg">You've reached the end!</p>
                  <p className="text-sm">No more posts to load.</p>
                </div>
              )}
            </div>

            {/* Side Panel */}
            <div className="community-info bg-[#232326] p-5 w-full lg:w-[400px]  lg:mx-20 mt-5 text-center rounded-xl text-white lg:h-fit">
              <h2 className="text-white text-3xl">
                <span className="text-red-700">Car</span>Mate
                <div className="my-2 w-32 mx-auto">
                  <div className="bg-gradient-to-r from-red-700 via-red-950 to-black h-[2.5px] my-2 mx-auto"></div>
                </div>
              </h2>
              <p className="my-5">{t('Community.sidePanel.welcome')}</p>

              <div className="community">
                <h3 className="text-2xl mt-12">
                  {t('Community.sidePanel.communityTitle')}
                  <div className="w-1/3 mx-auto">
                    <UnderLine />
                  </div>
                </h3>
                <p className="text-center">{t('Community.sidePanel.communityDescription')}</p>
              </div>

              <div className="community-rules mt-12 hidden md:block">
                <h3 className="text-2xl mt-20">
                  {t('Community.sidePanel.rules.title')}
                  <div className="w-1/2 mx-auto">
                    <UnderLine />
                  </div>
                </h3>
                <ul className="text-start list-disc pl-3 pr-2">
                  {[...Array(10)].map((_, index) => (
                    <li key={index} className='my-2'>{t(`Community.sidePanel.rules.rule${index + 1}`)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && <CreatePostPopup onClose={handleClosePopup} t={t} onPostCreated={fetchPosts} currentUser={currentUser} />}
    </>
  );
}