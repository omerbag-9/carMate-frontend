import React from 'react';
import img1 from '../../assets/images/porsche-model1.png';
import img2 from '../../assets/images/values.png';
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto pt-10 flex flex-wrap sm:justify-center sm:justify-items-center sm:text-center">
        {/* first section of about us */}
        <div className="aboutUs flex justify-items-center lg:justify-around mt-10 flex-wrap sm:justify-center">
          <div className="aboutcontent sm:text-start bg-white relative lg:w-1/2 sm:w-full border rounded-2xl pl-9 py-10 text-xl font-semibold my-2">
            <h2 className="text-4xl font-semibold mr-4 text-black">
              {t('aboutUs.title')}
              <div className="my-2 w-40">
                <div className="bg-gradient-to-r from-gray-300 via-black to-gray-300 h-[2.5px] my-2"></div>
              </div>
            </h2>
            <p className="lg:text-2xl text-black sm:text-md relative top-4 w-[90%] mr-4">
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
            <div className="cards flex flex-wrap justify-center justify-items-center">
              <div className="card bg-[#232326] rounded-2xl lg:w-2/5 md:w-[49%] text-start text-white lg:mx-2 md:mx-1 sm:w-full sm:my-2 p-5">
                <h3 className="text-2xl font-semibold pb-4">{t('whyUs.card1.title')}</h3>
                <p className="text-lg py-4">{t('whyUs.card1.description')}</p>
              </div>

              <div className="card bg-[#232326] rounded-2xl lg:w-2/5 md:w-[49%] text-start text-white lg:mx-2 sm:w-full my-2 p-5">
                <h3 className="text-2xl font-semibold pb-4">{t('whyUs.card2.title')}</h3>
                <p className="text-lg py-4">{t('whyUs.card2.description')}</p>
              </div>
            </div>

            {/* values */}
            <div className="values text-start bg-gradient-to-r from-[#29292c] via-[#0e0e0e] to-[#0C0C0C] text-white rounded-2xl lg:w-[82%] lg:mx-auto sm:w-full mx-2">
              <div className="flex flex-wrap justify-between justify-items-center">
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

                

<div className="valueimg hidden md:block lg:w-[26%] md:w-[26%] sm:w-full">
  <img src={img2} className="w-full rounded-2xl" alt="borschecar"/>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}