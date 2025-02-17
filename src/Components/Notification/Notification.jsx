import React from "react";
import { useTranslation } from "react-i18next";
import UnderLine from "../UnderLine/UnderLine";
import img1 from "../../assets/images/Profilephoto.png";
import img2 from "../../assets/images/profilephoto2.png";
import img3 from "../../assets/images/Ellipse7.png";

export default function Notifications() {
  const { t, i18n } = useTranslation();

  const notifications = [
    { img: img1, name: "Ahmed Ali", type: "comment", time: "1 day" },
    { img: img2, name: "Salama Mohamed", type: "like", time: "4 days" },
    { img: img3, name: "Mohamed Elsaid", type: "comment", time: "1 week" },
    { img: img1, name: "Noor Mohamed", type: "like", time: "last month" }
  ];

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

          {notifications.map((notif, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-between">
                <div className=" py-4 flex">
                  <div className="image w-10 mx-2">
                    <img src={notif.img} alt={notif.name} />
                  </div>
                  <div className="info font-light">
                    <h3>{notif.name}</h3>
                    <p className="text-sm pb-0">
                      {t(notif.type, { name: notif.name })}
                    </p>
                    <span className="text-xs">{t("time_ago", { time: notif.time })}</span>
                  </div>
                </div>
                <div className="px-3 py-4 text-red-600 text-xl">
                  <i className="fa-solid fa-trash-can"></i>
                </div>
              </div>
              <div className="w-full">
                <UnderLine />
              </div>
            </React.Fragment>
          ))}

         
        </div>
      </div>
    </div>
  );
}
