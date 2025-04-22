import React from 'react';
import img1 from '../../assets/images/porsche-model1.png';
import img2 from '../../assets/images/Values.png';
import youssef from '/youssef.png';
import omerr from '/omerrr.jpg';
import ezzat from '/ezzat.jpg';
import walid from '/walid.jpg';
import fawzy from '/Fawzy.jpg';
import dina from '/dina.jpg';
import rawan from '/rawan.jpg';
import elhawy from '/elhawy.jpg';
import loaa from '/loaa.jpg';
import mamdoh from '/mamdoh.jpeg';
import shefoo from '/shefoo.jpeg';
import { useTranslation } from 'react-i18next';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import cookie from 'js-cookie'
export default function AboutUs() {
  const { t, i18n } = useTranslation()
  const isRtl = cookie.get('i18next') === 'ar';
  const currentLang = i18n.language;
  const team = {
    yousef: {
      name: "Yousef Mohamed",
      role: "Team leader / ai developer / Backend developer",
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
      role: "Technical lead / MobileApp developer",
      linkedin: "https://github.com/Ezoooooo1235",
      github: "https://github.com/Ezoooooo1235",
      image: ezzat
    },
    abdulrahman: {
      name: "Abdulrahman Walid",
      role: "Technical lead / Backend developer",
      linkedin: "https://www.linkedin.com/in/abdelrahman-walid-16449a218",
      github: "https://github.com/wello88",
      image: walid
    },
    abdulrahmanf: {
      name: "Abdulrahman Fawzy",
      role: "Technical lead/ UX-UI / logo designer / video editor",
      linkedin: "https://www.linkedin.com/in/abddulrhman-fawzy-97582231a/",
      behance: "https://www.behance.net/abdulrhmanfawzy",
      image: fawzy
    },
    dina: {
      name: "Dina Mohsen",
      role: "Frontend developer",
      linkedin: "https://www.linkedin.com/in/dina-mohsen-608880278",
      github: "https://github.com/dina0a",
      image: dina
    },
    loaa: {
      name: "Loaa Abdelmonem",
      role: "Frontend developer",
      linkedin: "https://www.linkedin.com/in/loaa-abdelmonem/",
      github: "https://github.com/Loaa17",
      image: loaa
    },
    rawan: {
      name: "Rawan Ayman",
      role: "MobileApp developer",
      linkedin: "https://www.linkedin.com/in/rawan-ayman-a4a86630b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/rawan118",
      image: rawan
    },
    elhawy: {
      name: "Abdulrahman Elhawy",
      role: "MobileApp developer",
      linkedin: "https://www.linkedin.com/in/abdelrahman-mohamed-567964276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://www.linkedin.com/in/abdelrahman-mohamed-567964276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      image: elhawy
    },
    mamdoh: {
      name: "Mohamed Mammdoh",
      role: "MobileApp developer",
      linkedin: "https://www.linkedin.com/in/mohamedmammdoh/",
      github: "https://github.com/mohamedmammdoh",
      image: mamdoh
    },
    shefoo: {
      name: "Abdulrahman Sherif",
      role: "Backend developer",
      linkedin: "https://www.linkedin.com/in/abdelrahman-sherif-38870530a/",
      github: "https://github.com/Shefoo74",
      image: shefoo
    }
  };

  return (
    <>
      <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8 flex flex-wrap sm:justify-center sm:justify-items-center sm:text-center w-full overflow-hidden">
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
            <div className="values text-start text-white rounded-2xl lg:w-[82%] lg:mx-auto sm:w-full mx-0 sm:mx-2
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
       <div className="w-full p-0 mb-10">
  <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 lg:px-12 gap-4 mb-6">
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl sm:text-3xl font-medium leading-relaxed text-center md:text-left">
        <span className="block">{t('team_title_line1')}</span>
        <span className="block">{t('team_title_line2')}</span>
      </h2>
    </div>
    <div className="w-full md:w-1/2">
      <p className="text-center md:text-right whitespace-pre-line text-sm sm:text-base">{t('team_description')}</p>
    </div>
  </div>

  <div className="py-6 sm:py-8 lg:py-12 px-0 sm:px-4 lg:px-6 w-full">
    <Splide
      options={{
        type: 'loop',
        perPage: 4,
        perMove: 1,
        arrows: false,
        pagination: false,
        drag: true,
        direction: isRtl ? 'rtl' : 'ltr',
        gap: '1rem',
        autoplay: true,
        interval: 3000,
        speed: 800,
        pauseOnHover: true,
        resetProgress: false,
        focus: 'center',
        trimSpace: true,
        breakpoints: {
          480: { perPage: 1, gap: '0.5rem', arrows: false, pagination: false, width: '100%' },
          640: { perPage: 2, gap: '0.75rem', arrows: false, pagination: false, width: '100%' },
          768: { perPage: 2, gap: '1rem', width: '100%' },
          1024: { perPage: 3, gap: '1.25rem', width: '100%' },
          1280: { perPage: 4, width: '100%' }
        }
      }}
      aria-label={isRtl ? "معرض الصور" : "Team Gallery"}
      className="team-splide"
    >
      {Object.entries(team).map(([key, member]) => (
        <SplideSlide key={key} className="py-2">
          <div className="h-full flex flex-col justify-around bg-[#1a1a1a] bg-opacity-30 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="p-3">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src={member.image}
                  className="w-full h-[350px] sm:h-[300px] md:h-[250px] rounded-xl object-cover transition-transform duration-500 hover:scale-110"
                  alt={member.name}
                />
              </div>
              <p className={`font-medium text-base sm:text-lg ${isRtl ? 'text-right' : 'text-left'}`}>{member.name}</p>
              <p className={`text-xs sm:text-sm text-gray-400 ${isRtl ? 'text-right' : 'text-left'}`}>{member.role}</p>
            </div>
            <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'} w-full p-1 gap-2`}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-700 transition-colors duration-300"
              >
                <i className="fa-brands fa-linkedin text-xl"></i>
              </a>

              {member.name === 'Abdulrahman Fawzy' ? (
                <a
                  href={member.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-700 transition-colors duration-300"
                >
                  <i className="fa-brands fa-behance text-xl"></i>
                </a>
              ) : (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-700 transition-colors duration-300"
                >
                  <i className="fa-brands fa-github text-xl"></i>
                </a>
              )}
            </div>
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