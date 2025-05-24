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

export default function Notifications() {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

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

  // Delete notification mutation
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const handleDeleteNotification = (notificationId) => {
    deleteMutation.mutate(notificationId);
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
              <div className="text-white">Loading notifications...</div>
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
              <div className="text-red-400">Failed to load notifications</div>
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
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
              <button 
                onClick={handleRefresh}
                className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                Refresh
              </button>
            </div>
          </div>

          {notifications.length !== 0 ? (
            notifications.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <div className="flex justify-between">
                  <div className="py-4 flex">
                    <div className="image w-10 mx-2">
                      <img src={img1} alt={'user'} />
                    </div>
                    <div className="info font-light">
                      <h3>{item.id}</h3>
                      <p className="text-sm pb-0">
                        {item.message}
                      </p>
                      <span className="text-xs">{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                  <div className="px-3 py-4 text-red-600 text-xl">
                    <button
                      onClick={() => handleDeleteNotification(item.id)}
                      disabled={deleteMutation.isPending}
                      className="hover:text-red-400 transition-colors disabled:opacity-50"
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
            <h2 className='my-4'>You don't have notifications</h2>
          )}
        </div>
      </div>
    </div>
  );
}