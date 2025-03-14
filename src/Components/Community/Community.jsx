import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';
import img1 from "../../assets/images/ProfilePhoto.png";
import img2 from "../../assets/images/ProfilePhoto2.png";
import img3 from "../../assets/images/Ellipse7.png";
import axios from 'axios'; // Make sure axios is installed
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
const CreatePostPopup = ({ onClose, t, onPostCreated }) => {
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

    //  Image Upload
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
                src={img1}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 rtl:mr-3">
              <div className="text-[#F8F8F8] font-medium">
                {t('Community.createPost.yourName')}
              </div>
              <div className="text-[#F8F8F8] text-sm">
                {t('Community.createPost.userName')}
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
            setHasMore(response.data.data.length > 0);
        } else {
            console.error("Unexpected response format:", response.data);
            setError("Invalid data format received from the server.");
        }
    } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
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
          [postId]: response.data.data.comments // ✅ Fix here
        }));
        
        console.log(`Comments for Post ${postId}:`, response.data.data.comments); // Debugging
      }
    } catch (err) {
      console.error("Error fetching comments:", err.response?.data || err);
    }
  };
  
  // Toggle like status for a post
  const toggleLike = async (postId) => {
    try {
      setLikedPosts(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));

      const response = await axios.post(`https://fb-m90x.onrender.com/user/LikePost/${postId}`, 
        { postId: postId },
        { headers }
      ).then((res) => res)
      .catch((err) => err);

      if (response.data) {
        fetchPosts();
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      setLikedPosts(prev => ({
        ...prev,
        [postId]: !prev[postId]
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
        [postId]: '' // Clear input field
      }));
  
      fetchComments(postId); // ✅ Fetch updated comments list
    } catch (err) {
      console.error("Error submitting comment:", err.response?.data || err);
    }
  };


  // Function to toggle comments visibility
  const toggleComments = (postId) => {
    if (!showComments[postId] && !comments[postId]) {
      fetchComments(postId);
    }
    
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
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

  // Add load more function
  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
        setCurrentPage(prev => prev + 1);
        fetchPosts(currentPage + 1);
    }
};

// Add intersection observer for infinite scroll
useEffect(() => {
    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                loadMore();
            }
        },
        { threshold: 1.0 }
    );

    const target = document.getElementById('load-more-trigger');
    if (target) observer.observe(target);

    return () => {
        if (target) observer.unobserve(target);
    };
}, [hasMore, isLoadingMore]);

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
              {/* Create Post Card - Modified to be clickable */}
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
                <div className="text-center py-10 text-red-500 bg-[#232326] p-5 rounded-xl">
                  <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                  <p className="mt-2">{error}</p>
                </div>
              )}

   
      {/* Dynamic Posts */}
      {!loading && !error && posts.map(post => {
  // Fetch user data based on userId (assumes you have a users state)
  const user = posts?.find(u => u.id === post.userId) || {}; 

  return (
    <div key={post.id} className="post text-white bg-[#232326] p-5 w-full mx-auto my-5 rounded-xl">
      <div className="profile flex">
        <div className="profile-pic w-16">
          <img src={user.profileImage || img1} alt="Profile" />
        </div>
        <div className="info mt-2 ml-2 ltr:ml-3 rtl:mr-3">
          <h3 className="text-lg">{user.firstName || 'Unknown User'}</h3>
          <span className="text-gray-500">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      
      <p className="mt-3">{post.postContent}</p>

      {post.images?.length > 0 && (
        <div className="mt-3">
          {post.images.map((image, index) => (
            <img key={index} src={image} alt="Post" className="rounded-lg w-full" />
          ))}
        </div>
      )}

      <div className="buttons mt-5 flex gap-4">
        <button 
          onClick={() => toggleLike(post.id)}
          className={`like px-3 py-2 text-lg transition-colors ${
            likedPosts[post.id] ? 'bg-blue-500 text-white' : 'bg-transparent border border-white text-white'
          }`}
        >
          <i className={`${likedPosts[post.id] ? 'fas' : 'far'} fa-thumbs-up px-1`}></i> 
          {(post.likes || []).length} {t('Community.post.likes')}
        </button>
        
        <button 
          onClick={() => toggleComments(post.id)}
          className="like border border-white bg-transparent px-3 py-2 text-lg"
        >
          <i className="fa-regular fa-comments px-1"></i> 
          {Number(post.comment) || 0} {t('Community.post.comments')}
        </button>
      </div>

      {showComments[post.id] && (
  <div className="comments mt-4">
    {comments[post.id]?.length > 0 ? (
      comments[post.id].map(comment => (
        <div key={comment.id} className="comment flex mt-3 border-b border-gray-700 pb-2">
          <img className="w-10 h-10 rounded-full mr-3" src={comment.user?.profileImage || img1} alt="User" />
          <div>
            <p className="text-sm font-semibold">{comment.user?.name || 'User'}</p>
            <p className="text-gray-400">{comment.commentContent}</p>  {/* ✅ Fix: Ensure correct field */}
            <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-400 text-center my-3">No comments yet. Be the first to comment!</p>
    )}
  

          <div className="add-comment relative mt-3">
            <span className="absolute top-1/2 transform -translate-y-1/2 ltr:left-3 rtl:right-3 text-black">
              <img src={img3} alt="User" className="w-8 h-8" />
            </span>
            <div className="flex">
              <input
                type="text"
                placeholder={t('Community.post.writeComment')}
                className="w-full border-2 rounded-l-full bg-transparent py-2 ltr:pl-14 rtl:pr-14 placeholder:text-[#C9C9CA] focus:placeholder-transparent"
                value={commentContent[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitComment(post.id)}
              />
              <button 
                className="bg-blue-600 text-white px-4 rounded-r-full"
                onClick={() => submitComment(post.id)}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
})}

              {/* Show message if no posts */}
              {!loading && !error && posts.length === 0 && (
                <div className="text-center py-10 text-white bg-[#232326] p-5 rounded-xl">
                  <p>No posts yet. Be the first to create a post!</p>
                </div>
              )}
            </div>

            {/* Side Panel (Hidden on Mobile) */}
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
      {showPopup && <CreatePostPopup onClose={handleClosePopup} t={t} onPostCreated={fetchPosts} />}
      <div id="load-more-trigger" className="h-1"></div>
    </>
  );
}



