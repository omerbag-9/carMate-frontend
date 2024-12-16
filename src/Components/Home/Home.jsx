import React from 'react'
import homeImage from '../../assets/images/homeImg.png'
import icon1 from '../../assets/images/icon1.png'
import icon2 from '../../assets/images/icon2.png'
import icon3 from '../../assets/images/icon3.png'
import icon4 from '../../assets/images/icon4.png'
import carImg from '../../assets/images/carImg.png'
import { useTranslation } from 'react-i18next'
import UnderLine from '../UnderLine/UnderLine'
import { Link } from 'react-router-dom'
export default function Home() {
  const { t } = useTranslation()
  return (
    <div className='mt-3'>
      {/* first part of home */}
      <div className="relative bg-cover bg-center bg-no-repeat sm:w-full h-[85vh] sm:rounded-3xl rounded-xl" style={{ backgroundImage: `url(${homeImage})` }}>
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <p className='sm:text-md text-sm whitespace-nowrap'>{t('firstTitle')}</p>
          <p className='sm:text-4xl text-md font-bold whitespace-nowrap my-2'> {t('CarMate is Your Partner in Every')}{' '}
            <span className="text-[#8E0606]">{t('Journey')}</span>.</p>
        </div>
        <div className="absolute sm:top-[90%] top-[83%] left-[50%] -translate-x-1/2">
          <Link to={'about'}><p className='sm:text-lg text-sm bg-[#232326] sm:px-3 px-3 py-1 rounded-xl whitespace-nowrap'>{t('More About CarMate')} <i className="fa-solid fa-arrow-up rotate-45"></i> </p></Link>
        </div>
      </div>
      {/* second part of home */}
      <div className="mt-20 sm:mb-0 mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 sm:gap-y-6 md:gap-y-10">
        <div className="text-center">
          <img src={icon1} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('AI-Powered Car Solutions')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Our AI quickly diagnoses issues and')} <br /> {t('offers easy, step-by-step solutions')} <br /> {t('for your car problems.')}</p>
        </div>
        <div className="text-center">
          <img src={icon2} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('Top Mechanics, Top Service')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Our network of skilled mechanics')} <br /> {t('ensures top-quality service and')} <br /> {t('expert care for every car.')}</p>
        </div>
        <div className="text-center">
          <img src={icon3} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('Smart Car Management')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Easily manage your car\'s details, track')} <br /> {t('maintenance, and get timely reminders')} <br /> {t('for important tasks.')}</p>
        </div>
        <div className="text-center">
          <img src={icon4} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('Boost Your Career')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Unlock opportunities to connect')} <br /> {t('with car owners and grow your')} <br /> {t('mechanic career.')}</p>
        </div>
      </div>
      {/* third part of home */}
      <div className="mb-20 grid sm:grid-cols-2 grid-cols-1 items-center justify-start">
        <div className="ms-3">
          <p className='text-2xl font-bold text-center sm:text-start'>{t('My Car')}</p>
          <div className="w-[15%] sm:ms-0 m-auto">
            <UnderLine/>
          </div>
          <p className='text-center sm:text-start'>{t('Track, maintain, and never forget your car’s needs!')}<br />{t('Stay ahead with smart reminders and effortless')} <br/> {t('updates for every ride.')}</p>
          <div className="ms-0 text-center sm:text-start">
          <button className='bg-[#5D5D60] mt-5 p-1'> {t('Download App Now')}</button>
          </div>
          
        </div>
        <div className="transform">
          <img src={carImg} className='rotate-x' alt="" />
        </div>
      </div>
    </div>)
}
