import React from 'react';
import img1 from '../../assets/images/porsche-model1.png';
import img2 from '../../assets/images/Values.png';
import youssef from '../../assets/images/youssef.png';
import omerr from '../../assets/images/omerrr.jpg';
import ezzat from '../../assets/images/ezzat.jpg';
import walid from '../../assets/images/walid.jpg';
import fawzy from '../../assets/images/fawzy.jpg';
import dina from '../../assets/images/dina.jpg';
import { useTranslation } from 'react-i18next';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function AboutUs() {
  const { t } = useTranslation();
  const team = {
    yousef: {
      name: "Yousef Mohamed",
      role: "Team leader / Backend developer",
      linkedin: "https://www.linkedin.com/in/yousef-fadel-716244270/",
      github: "https://github.com/YousefMohamed19",
      image: youssef
    },
    omer: {
      name: "Omer mustafa",
      role: "Technical lead / Fullstack developer / Software tester",
      linkedin: "https://www.linkedin.com/in/omer-bag-a20562287/",
      github: "https://github.com/omerbag-9",
      image: omerr
    },
    mohamed: {
      name: "Mohamed Ezzat",
      role: "Technical lead/MobileApp developer",
      linkedin: "https://github.com/Ezoooooo1235",
      github: "https://github.com/Ezoooooo1235",
      image: ezzat
    },
    abdulrahman: {
      name: "Abdulrahman Walid",
      role: "Technical lead/Backend developer",
      linkedin: "https://www.linkedin.com/in/abdelrahman-walid-16449a218",
      github: "https://github.com/wello88",
      image: walid
    },
    abdulrahmanf: {
      name: "Abdulrahman Fawzy",
      role: "Technical lead/ UX / UI",
      linkedin: "https://www.linkedin.com/in/abddulrhman-fawzy-97582231a/",
      github: "https://www.behance.net/abdulrhmanfawzy",
      image: fawzy
    },
    dina: {
      name: "Dina Mohsen",
      role: "Fullstack developer",
      linkedin: "https://www.linkedin.com/in/dina-mohsen-608880278",
      github: "https://github.com/dina0a",
      image: dina
    }
  };

  return (
    <>
      <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8 flex flex-wrap sm:justify-center sm:justify-items-center sm:text-center">
        {/* first section of about us */}
        <div className="aboutUs flex justify-items-center lg:justify-around mt-10 flex-wrap sm:justify-center">
          <div className="aboutcontent sm:text-start bg-white relative lg:w-1/2 sm:w-full border rounded-2xl pl-9 py-10 text-xl font-semibold my-2">
            <h2 className="text-4xl font-semibold mr-4 text-black">
              {t('aboutUs.title')}
              <div className="my-2 w-40">
                <div className="bg-gradient-to-r from-gray-300 via-black to-gray-300 h-[2.5px] my-2"></div>
              </div>
            </h2>
            <p className="about-text text-black relative top-4 w-[90%] mr-4">
              {t('aboutUs.description')}
            </p>
          </div>

          <div className="aboutimg bg-white relative lg:w-[45%] md:w-[100%] border rounded-2xl pl-9 py-10 sm:text-start my-2">
            <img src={img1} className="w-full" alt="borsche car" />
          </div>
        </div>

        {/* why us section */}
        <div className="whyUs py-20">
          <h2 className="text-center text-4xl font-bold">
            {t('whyUs.title')}
            <div className="my-2 w-40 mx-auto">
              <div className="bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[2.5px] my-2"></div>
            </div>
            <div className="my-2 w-32 mx-auto">
              <div className="bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[2.5px] my-2"></div>
            </div>
          </h2>

          {/* 2cards */}
          <div className="container py-10">
            <div className="cards mb-6 flex flex-wrap justify-center justify-items-center">
              <div className="card bg-[#232326] rounded-2xl lg:w-2/5 md:w-[49%] text-start text-white lg:mx-2 md:mx-1 sm:w-full sm:my-2 p-5">
                <h3 className="text-2xl font-semibold pb-2">{t('whyUs.card1.title')}</h3>
                <p className="text-lg py-4">{t('whyUs.card1.description')}</p>
              </div>

              <div className="card bg-[#232326] rounded-2xl lg:w-2/5 md:w-[49%] text-start text-white lg:mx-2 sm:w-full my-2 p-5">
                <h3 className="text-2xl font-semibold pb-2">{t('whyUs.card2.title')}</h3>
                <p className="text-lg py-4">{t('whyUs.card2.description')}</p>
              </div>
            </div>

            {/* values */}
            <div className="values text-start text-white rounded-2xl lg:w-[82%] lg:mx-auto sm:w-full mx-2
  ltr:bg-gradient-to-r ltr:from-[#29292c] ltr:via-[#0e0e0e] ltr:to-[#0C0C0C]
  rtl:bg-gradient-to-l rtl:from-[#29292c] rtl:via-[#0e0e0e] rtl:to-[#0C0C0C]">

              <div className="flex flex-wrap justify-between justify-items-center">
                {/* Text Section */}
                <div className="card lg:w-1/2 md:w-1/2 sm:my-2 p-5">
                  <h3 className="text-3xl font-semibold pb-4">{t('values.title')}</h3>
                  <p className="text-lg leading-7">
                    {t('values.list1')}<br />
                    {t('values.list2')}<br />
                    {t('values.list3')}<br />
                    {t('values.list4')}<br />
                    {t('values.list5')}<br />
                    {t('values.list6')}
                  </p>
                </div>

                {/* Image Section */}
                <div className="valueimg hidden md:block lg:w-[26%] md:w-[26%] sm:w-full">
                  <img src={img2} className="w-full rounded-2xl" alt="borschecar" />
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full p-0">
          <div className="flex justify-between items-center px-12">
            <p className="text-3xl font-medium leading-relaxed">
              <span className="block">Meet the talented team</span>
              <span className="block">who make all this happen</span>
            </p>
            <p className="text-center">
              Our philosophy is simple; hire great<br />
              people and give them the resources<br />
              and support to do their best work
            </p>
          </div>
          <div className="py-12">
            <Splide
              options={{
                type: 'loop',
                perPage: 5.5,        // عرض 4 صور في كل مرة
                arrows: false,
                pagination: false,
                drag: 'free',      // تفعيل السحب بحرية
                direction: 'ltr',
                gap: '25px',
              }}
              aria-label="معرض الصور"
            >
              {Object.entries(team).map(([key, member]) => (
                <SplideSlide key={key}>
                  <img
                    src={member.image}
                    className="w-full h-[225px] rounded-2xl pb-2 object-cover"
                    alt={member.name}
                  />
                  <p className="text-left font-medium text-lg">{member.name}</p>
                  <p className="text-left text-sm pt-1 text-gray-400">{member.role}</p>
                  <div className="flex justify-start w-full space-x-3 mt-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin text-white text-xl"></i>
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-github text-white text-xl"></i>
                    </a>
                  </div>
                </SplideSlide>
              ))}
            </Splide>

          </div>
        </div>

      </div>
    </>
  );
}