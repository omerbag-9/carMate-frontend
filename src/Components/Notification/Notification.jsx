import React from "react";
import { useTranslation } from "react-i18next";
import UnderLine from "../UnderLine/UnderLine";
import img1 from "../../assets/images/ProfilePhoto.png";
import img2 from "../../assets/images/ProfilePhoto2.png";
import img3 from "../../assets/images/Ellipse7.png";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Notifications() {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  async function getNotifications() {
    let { data } = await axios.get(`https://fb-m90x.onrender.com/notification`, {
      headers: {
        token: Cookies.get("token")
      }
    })
    console.log(data?.data?.notifications);
    
    setNotifications(data?.data?.notifications)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="container mx-auto">
      <div className="relative overflow-x-auto mx-auto">
        <div className="lg:w-[40%] rounded-xl sm:w-full text-white bg-[#232326] mx-auto my-20 p-6">
          <div className="notify">
            <h2 className="text-2xl px-3 mt-4">
              {t("notification")}
              <div className="w-1/4">
                <UnderLine />
              </div>
            </h2>
          </div>


          {notifications.length !== 0 ? notifications.map((item, index) => <>
              <div className="flex justify-between">
                <div className=" py-4 flex">
                  <div className="image w-10 mx-2">
                    <img src={img1} alt={'omer'} />
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
                  <i className="fa-solid fa-trash-can"></i>
                </div>
              </div>
              <div className="w-full">
                <UnderLine />
              </div>
            </>) : <>
            <h2 className='my-4'>you don't have notifications</h2>
            </>}


        </div>
      </div>
    </div>
  );
}
