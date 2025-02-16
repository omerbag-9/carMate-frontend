import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';
import img1 from "../../assets/images/profile photo.png";
import img2 from "../../assets/images/profilephoto2.png";
import img3 from "../../assets/images/Ellipse 7.png";
import img4 from "../../assets/images/image 62.png";

// Create Post Popup Component
const CreatePostPopup = ({ onClose, t }) => {
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
          />
          
          {/* Media Button */}
          <div className="absolute bottom-20 ltr:right-4 rtl:left-4">
            <label className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer">
              <input 
                type="file"
                accept="image/*"
                className="hidden"
                title={t('Community.createPost.mediaButton')}
              />
              <i className="fa-solid fa-images text-[#BFBFBF] text-2xl"></i>
            </label>
          </div>
        </div>

        <div className="p-4">
          <button className="w-full bg-gray-300  text-black  py-1  rounded-xl font-bold text-xl transition-colors">
            {t('Community.createPost.postButton')}
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

  // Function to toggle comments visibility
  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Function to toggle like state
  const toggleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Function to handle popup visibility
  const handleShowPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

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

              {/* Post 1 */}
              <div className="post text-white bg-[#232326] p-5 w-full mx-auto my-5 rounded-xl">
                <div className="profile flex">
                  <div className="profile-pic w-16">
                    <img src={img1} alt="" />
                  </div>
                  <div className="info mt-2 ml-2 ltr:ml-3 rtl:mr-3">
                    <h3 className="text-lg">{t('Community.posts.post1.author')}</h3>
                    <span className="text-gray-500">{t('Community.posts.post1.timeAgo')}</span>
                  </div>
                </div>
                <p className="text-lg px-2 pt-5 pb-1">
                  {t('Community.posts.post1.mainText')} <br />
                  <p className="px-1">
                    {t('Community.posts.post1.tips.1')} <br />
                    {t('Community.posts.post1.tips.2')} <br />
                    <p className="truncate">
                      {t('Community.posts.post1.tips.3')} <br />
                      {t('Community.posts.post1.tips.4')}
                    </p>
                  </p>
                </p>
                <div className="w-full mx-auto">
                  <UnderLine />
                </div>
                <div className="buttons mt-5 flex gap-4">
                  <button 
                    onClick={() => toggleLike('post1')}
                    className={`like px-3 py-2 text-lg mr-3 transition-colors ${
                      likedPosts['post1'] ? 'bg-blue-500 text-white' : 'bg-transparent border-1 border-white text-white'
                    }`}
                  >
                    <i className={`${likedPosts['post1'] ? 'fas' : 'far'} fa-thumbs-up px-1`}></i> 
                    521 {t('Community.post.likes')}
                  </button>
                  <button 
                    onClick={() => toggleComments('post1')}
                    className="like border-1 border-white bg-transparent px-3 py-2 text-lg ml-3"
                  >
                    <i className="fa-regular fa-comments px-1"></i> 
                    59 {t('Community.post.comments')}
                  </button>
                </div>
                {showComments['post1'] && (
                  <div className="comments mt-4">
                    <div className="add-comment relative">
                      <span className={`absolute top-[85px] ltr:left-3 rtl:right-3 text-black`}>
                        <img src={img3} alt="" />
                      </span>
                      <input
                        type="text"
                        placeholder={t('Community.post.writeComment')}
                        className="w-full border-2 rounded-full mt-20 bg-transparent py-3 ltr:pl-14 rtl:pr-14 placeholder:text-[#C9C9CA] focus:placeholder-transparent"
                        id="comment-post1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Post 2 */}
              <div className="post text-white bg-[#232326] p-5 w-full mx-auto my-5 rounded-xl">
                <div className="profile flex">
                  <div className="profile-pic w-16">
                    <img src={img1} alt="" />
                  </div>
                  <div className="info mt-2 ml-2 ltr:ml-3 rtl:mr-3">
                    <h3 className="text-lg">{t('Community.posts.post2.author')}</h3>
                    <span className="text-gray-500">{t('Community.posts.post2.timeAgo')}</span>
                  </div>
                </div>
                <p className="text-lg px-2 pt-5 pb-1">
                  {t('Community.posts.post2.mainText')} <br />
                  <p className="px-1">
                    {t('Community.posts.post2.content')}
                  </p>
                </p>
                <div className="w-full mx-auto">
                  <UnderLine />
                </div>
                <div className="buttons mt-5 flex gap-4">
                  <button 
                    onClick={() => toggleLike('post2')}
                    className={`like border-1 border-white px-3 py-2 text-lg mr-3 transition-colors ${
                      likedPosts['post2'] ? 'bg-blue-500 text-white' : 'bg-transparent border-1 border-white text-white'
                    }`}
                  >
                    <i className={`${likedPosts['post2'] ? 'fas' : 'far'} fa-thumbs-up px-1`}></i> 
                    521 {t('Community.post.likes')}
                  </button>
                  <button 
                    onClick={() => toggleComments('post2')}
                    className="like border-1 border-white bg-transparent px-3 py-2 text-lg ml-3"
                  >
                    <i className="fa-regular fa-comments px-1"></i> 
                    59 {t('Community.post.comments')}
                  </button>
                </div>
                {showComments['post2'] && (
                  <div className="comments mt-4">
                    {/* Existing comments */}
                    <div className="comment flex justify-items-center">
                      <img className="w-12 h-12 mt-3" src={img1} alt="" />
                      <div className="comment-info mt-2 ml-2 border-2 rounded-lg px-2 py-1">
                        <p className="name font-semibold text-sm">{t('Community.posts.post2.comments.comment1.author')}</p>
                        <p className="comment-discription text-sm">{t('Community.posts.post2.comments.comment1.text')}</p>
                      </div>
                    </div>
                    <div className="comment flex justify-items-center mt-3">
                      <img className="w-12 h-12 mt-3" src={img2} alt="" />
                      <div className="comment-info mt-2 ml-2 border-2 rounded-lg px-2 py-1 w-1/2">
                        <p className="name font-semibold text-sm">{t('Community.posts.post2.comments.comment2.author')}</p>
                        <p className="comment-discription text-sm">
                          {t('Community.posts.post2.comments.comment2.text')}
                        </p>
                      </div>
                    </div>
                    <div className="add-comment relative">
                      <span className={`absolute top-[85px] ltr:left-3 rtl:right-3 text-black`}>
                        <img src={img3} alt="" />
                      </span>
                      <input
                        type="text"
                        placeholder={t('Community.post.writeComment')}
                        className="w-full border-2 rounded-full mt-20 bg-transparent py-3 ltr:pl-14 rtl:pr-14 placeholder:text-[#C9C9CA] focus:placeholder-transparent"
                        id="comment-post2"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Post 3 */}
              <div className="post text-white bg-[#232326] p-5 w-full mx-auto my-5 rounded-xl">
                <div className="profile flex">
                  <div className="profile-pic w-16">
                    <img src={img1} alt="" />
                  </div>
                  <div className="info mt-2 ml-2 ltr:ml-3 rtl:mr-3">
                    <h3 className="text-lg">{t('Community.posts.post3.author')}</h3>
                    <span className="text-gray-500">{t('Community.posts.post3.timeAgo')}</span>
                  </div>
                </div>
                <p className="text-lg px-2 pt-5 pb-1">
                  {t('Community.posts.post3.mainText')}
                </p>
                <img className="mt-2 mb-4 w-full" src={img4} alt="" />
                <div className="w-full mx-auto">
                  <UnderLine />
                </div>
                <div className="buttons mt-5 flex gap-4">
                  <button 
                    onClick={() => toggleLike('post3')}
                    className={`like border-1 border-white px-3 py-2 text-lg mr-3 transition-colors ${
                      likedPosts['post3'] ? 'bg-blue-500 text-white' : 'bg-transparent border-1 border-white text-white'
                    }`}
                  >
                    <i className={`${likedPosts['post3'] ? 'fas' : 'far'} fa-thumbs-up px-1`}></i> 
                    521 {t('Community.post.likes')}
                  </button>
                  <button 
                    onClick={() => toggleComments('post3')}
                    className="like border-1 border-white bg-transparent px-3 py-2 text-lg ml-3"
                  >
                    <i className="fa-regular fa-comments px-1"></i> 
                    59 {t('Community.post.comments')}
                  </button>
                </div>
                {showComments['post3'] && (
                  <div className="comments mt-4">
                    <div className="add-comment relative">
                      <span className={`absolute top-[85px] ltr:left-3 rtl:right-3 text-black`}>
                        <img src={img3} alt="" />
                      </span>
                      <input
                        type="text"
                        placeholder={t('Community.post.writeComment')}
                        className="w-full border-2 rounded-full mt-20 bg-transparent py-3 ltr:pl-14 rtl:pr-14 placeholder:text-[#C9C9CA] focus:placeholder-transparent"
                        id="comment-post3"
                      />
                    </div>
                  </div>
                )}
              </div>
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

              <div className="community-rules mt-12  hidden md:block">
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
      {showPopup && <CreatePostPopup onClose={handleClosePopup} t={t} />}
    </>
  );
}