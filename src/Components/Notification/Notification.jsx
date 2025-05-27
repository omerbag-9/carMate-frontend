import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UnderLine from "../UnderLine/UnderLine";
import img1 from "../../assets/images/ProfilePhoto.png";
import img2 from "../../assets/images/ProfilePhoto2.png";
import img3 from "../../assets/images/Ellipse7.png";
import Cookies from "js-cookie";
import axios from "axios";

// API functions
const fetchNotifications = async () => {
  const { data } = await axios.get(`https://fb-m90x.onrender.com/notification`, {
    headers: {
      token: Cookies.get("token")
    }
  });  
  
  return data?.data?.notifications || [];
};

const deleteNotification = async (notificationId) => {
  const { data } = await axios.delete(`https://fb-m90x.onrender.com/notification/${notificationId}`, {
    headers: {
      token: Cookies.get("token")
    }
  });
  return data;
};

const deleteAllNotifications = async () => {
  const { data } = await axios.delete(`https://fb-m90x.onrender.com/notification`, {
    headers: {
      token: Cookies.get("token")
    }
  });
  return data;
};

export default function Notifications() {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const isArabic = i18n.language === 'ar';

  // Fetch notifications with React Query
  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true, // Continue refetching when tab is not active
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    staleTime: 0, // Always consider data stale to ensure fresh notifications
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  // Delete single notification mutation
  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      // Invalidate and refetch notifications after successful deletion
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to delete notification:', error);
      // You can add toast notification here
    }
  });

  // Delete all notifications mutation
  const deleteAllMutation = useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: () => {
      // Invalidate and refetch notifications after successful deletion
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to delete all notifications:', error);
      // You can add toast notification here
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (isArabic) {
      if (diffInSeconds < 60) return `منذ ${diffInSeconds} ثانية`;
      if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
      if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
      return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;
    } else {
      if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  const handleDeleteNotification = (notificationId) => {
    deleteMutation.mutate(notificationId);
  };

  const handleDeleteAllNotifications = () => {
    if (window.confirm(isArabic ? 'هل أنت متأكد من حذف جميع الإشعارات؟' : 'Are you sure you want to delete all notifications?')) {
      deleteAllMutation.mutate();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="relative overflow-x-auto mx-auto">
          <div className="lg:w-[40%] rounded-xl sm:w-full text-white bg-[#232326] mx-auto my-20 p-6">
            <div className="flex justify-center items-center h-32">
              <div className="text-white">
                {isArabic ? 'جاري تحميل الإشعارات...' : 'Loading notifications...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto">
        <div className="relative overflow-x-auto mx-auto">
          <div className="lg:w-[40%] rounded-xl sm:w-full text-white bg-[#232326] mx-auto my-20 p-6">
            <div className="flex flex-col justify-center items-center h-32 space-y-4">
              <div className="text-red-400">
                {isArabic ? 'فشل في تحميل الإشعارات' : 'Failed to load notifications'}
              </div>
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isArabic ? 'حاول مرة أخرى' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="relative overflow-x-auto mx-auto">
        <div className="lg:w-[40%] rounded-xl sm:w-full text-white bg-[#232326] mx-auto my-20 p-6">
          <div className="notify">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl px-3 mt-4">
                {t("notification")}
                <div className="w-1/4">
                  <UnderLine />
                </div>
              </h2>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <button 
                    onClick={handleDeleteAllNotifications}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    disabled={deleteAllMutation.isPending}
                  >
                    {deleteAllMutation.isPending 
                      ? (isArabic ? 'جاري الحذف...' : 'Deleting...')
                      : (isArabic ? 'حذف الكل' : 'Delete All')
                    }
                  </button>
                )}
                <button 
                  onClick={handleRefresh}
                  className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  {isArabic ? 'تحديث' : 'Refresh'}
                </button>
              </div>
            </div>
          </div>

          {notifications.length !== 0 ? (
            notifications.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`py-4 flex ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`image w-20 flex-shrink-0 ${isArabic ? 'ml-2' : 'mx-2'}`}>
                      <img 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600" 
                        src={item.profilePicture} 
                        alt={'user'} 
                      />
                    </div>
                    <div className={`info font-light ${isArabic ? 'mr-2 text-right' : 'ml-2'}`}>
                      <h3 className="text-base font-medium">
                        {item.firstName + ' ' + item.lastName}
                      </h3>
                      <p className="text-sm pb-1 mt-1">
                        {isArabic ? item.arabicMessage : item.message}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-4 text-red-600 text-xl flex items-start ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <button
                      onClick={() => handleDeleteNotification(item.id)}
                      disabled={deleteMutation.isPending}
                      className="hover:text-red-400 transition-colors disabled:opacity-50"
                      title={isArabic ? 'حذف الإشعار' : 'Delete notification'}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <UnderLine />
                </div>
              </React.Fragment>
            ))
          ) : (
            <h2 className='my-4 text-center'>
              {isArabic ? 'لا توجد إشعارات' : 'You don\'t have notifications'}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}