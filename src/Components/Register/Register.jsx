import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import { Link } from 'react-router-dom'

export default function Register() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return <>
    <div className="flex py-6 w-[90%] m-auto gap-x-7 text-white pb-20 lg:pt-0 pt-10">
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
              <div className="relative w-full lg:w-[48%] mb-4 lg:mb-0">
                <i className={`fa-solid fa-user absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
                <input
                  type="text"
                  placeholder={t('First Name')}
                  className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'} text-indent-8`}
                />
              </div>

              {/* Last Name */}
              <div className="relative w-full lg:w-[48%]">
                <i className={`fa-solid fa-user absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
                <input
                  type="text"
                  placeholder={t('Last Name')}
                  className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'} text-indent-8`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative w-full">
              <i className={`fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
              <input
                type="email"
                placeholder={t('Email')}
                className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'} text-indent-8`}
              />
            </div>

{/* Password */}
<div className="relative w-full">
  <i className={`fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
  <input
    type={showPassword ? "text" : "password"}
    placeholder={t('Password')}
    className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent focus:ring-0 focus:outline-none ${isRtl ? 'pr-9' : 'pl-9'} text-indent-8`}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'left-3' : 'right-3'} text-[#5D5D60] focus:outline-none focus:ring-0`}
  >
    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
  </button>
</div>

{/* Confirm Password */}
<div className="relative w-full">
  <i className={`fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder={t('Confirm Password')}
    className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent focus:ring-0 focus:outline-none ${isRtl ? 'pr-9' : 'pl-9'} text-indent-8`}
  />
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'left-3' : 'right-3'} text-[#5D5D60] focus:outline-none focus:ring-0`}
  >
    <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
  </button>
</div>



            {/* Role Selection */}
            <div className="relative w-full">
              <select className={`rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm ${isRtl ? 'pr-3' : 'pl-3'}`}>
                <option>{t('Choose Your Role')}</option>
                <option>{t('Customer')}</option>
                <option>{t('Seller')}</option>
              </select>
            </div>

            {/* Register Button */}
            <button className="bg-[#650000] text-white text-sm py-3 rounded-xl w-full font-bold mt-4">
              {t('Register')}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-[#5D5D60] font-bold">
            {t('Already have an account?')} <Link to={'/login'} className="text-[#EBA4A4] underline">{t('Log in')}</Link>
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
