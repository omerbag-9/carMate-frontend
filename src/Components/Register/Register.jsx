import React from 'react'
import { useTranslation } from 'react-i18next'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import { Link } from 'react-router-dom'

export default function Register() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl' // Check if the language direction is RTL (Right-to-Left)

  return <>
    <div className="flex py-6 w-[90%] m-auto gap-x-7 text-white min-h-screen pb-20 flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 lg:ml-4 flex flex-col justify-center">
        <img src={heroLogo} className='w-[20%] m-auto mb-6' alt="" />
        <div className="text-center">
          {/* Welcome Message */}
          <p className="text-lg font-bold mb-1 text-start">
            {t('Welcome To')} <span className="text-[#8E0606]">Car</span> Mate
            <i className="fa-solid fa-hands-clapping text-xl text-yellow-400 ltr:ml-2 rtl:mr-2"></i>
          </p>
          <p className="text-base font-bold mb-6 text-start">{t('Please Create Your Account')}</p>

          {/* Form */}
          <form className="space-y-5">
            <div className="flex flex-col lg:flex-row justify-between">
              {/* First Name */}
              <div className="relative w-full lg:w-[45%] mb-4 lg:mb-0">
                <i className={`fa-solid fa-user absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-500`}></i>
                <input
                  type="text"
                  placeholder={t('First Name')}
                  className={`rounded-xl p-3 ${isRtl ? 'pr-10' : 'pl-10'} text-sm w-full bg-[#232326] border-0 text-white`}
                />
              </div>
              {/* Last Name */}
              <div className="relative w-full lg:w-[45%]">
                <i className={`fa-solid fa-user absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-500`}></i>
                <input
                  type="text"
                  placeholder={t('Last Name')}
                  className={`rounded-xl p-3 ${isRtl ? 'pr-10' : 'pl-10'} text-sm w-full bg-[#232326] border-0 text-white`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative w-full">
              <i className={`fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-500`}></i>
              <input
                type="email"
                placeholder={t('Email')}
                className={`rounded-xl p-3 ${isRtl ? 'pr-10' : 'pl-10'} text-sm w-full bg-[#232326] border-0 text-white`}
              />
            </div>

            {/* Password */}
            <div className="relative w-full">
              <i className={`fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-500`}></i>
              <input
                type="password"
                placeholder={t('Password')}
                className={`rounded-xl p-3 ${isRtl ? 'pr-10' : 'pl-10'} text-sm w-full bg-[#232326] border-0 text-white`}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative w-full">
              <i className={`fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-500`}></i>
              <input
                type="password"
                placeholder={t('Confirm Password')}
                className={`rounded-xl p-3 ${isRtl ? 'pr-10' : 'pl-10'} text-sm w-full bg-[#232326] border-0 text-white`}
              />
            </div>

            {/* Role Selection */}
            <div className="relative w-full">
              <i className={`fa-solid fa-user-check absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-500`}></i>
              <select className={`rounded-xl p-3 ${isRtl ? 'pr-10' : 'pl-10'} text-sm w-full bg-[#232326] border-0 text-white`}>
                <option>{t('Choose Your Role')}</option>
                <option>{t('Customer')}</option>
                <option>{t('Seller')}</option>
              </select>
            </div>

            {/* Register Button */}
            <button className="bg-[#8E0606] text-white text-sm py-3 rounded-xl w-full font-bold mt-4">
              {t('Register')}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            {t('Already have an account?')} <Link to={'/login'} className="text-[#8E0606]">{t('Log in')}</Link>
          </p>
        </div>
      </div>

      {/* Right Section (hidden on tablet and smaller screens) */}
      <div className="hidden lg:flex w-[90%] justify-center items-center">
        <img src={registerImage} className="w-[85%] h-[600px] ms-auto rounded-lg object-cover" alt="Register Illustration" />
      </div>
    </div>
  </>
}
