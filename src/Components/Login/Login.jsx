import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import { Link } from 'react-router-dom'

export default function Login() {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="pb-20 lg:pt-0 pt-20">
      <div className="flex py-6 w-[90%] m-auto gap-x-7 text-white">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 lg:ml-4 flex flex-col justify-center">
          <img src={heroLogo} className="w-[20%] mt-4 mb-6 m-auto" alt="Logo" />
          <div className="text-center">
            {/* Welcome Message */}
            <p className="text-lg font-bold mb-1 text-start">
              {t('WelcomeBack')} <i className="fa-solid fa-hands-clapping text-xl text-yellow-400 ltr:ml-2 rtl:mr-2"></i>
            </p>
            <p className="text-base font-bold mb-6 text-start">{t('PleaseLogin')}</p>

            {/* Form */}
            <form className="space-y-5">
              {/* Email */}
              <div className="relative w-full">
                <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto text-[#5D5D60]"></i>
                <input
                  type="email"
                  placeholder={t('Email')}
                  className="rounded-xl p-3 pl-10 rtl:pr-10 rtl:pl-0 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60] focus:placeholder-transparent"
                />
              </div>

              {/* Password */}
              <div className="relative w-full">
                <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto text-[#5D5D60]"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t('Password')}
                  className="rounded-xl p-3 pl-10 rtl:pr-10 rtl:pl-0 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60] focus:placeholder-transparent focus:ring-0 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 rtl:left-3 text-[#5D5D60] focus:outline-none focus:ring-0"
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>


              <div className="flex justify-between items-center text-sm">
                {/* Rounded Checkbox */}
                <div className="flex items-center gap-2">
                  <div className="relative flex">
                    <input
                      type="checkbox"
                      id="remember"
                      className="peer w-4 h-4 rounded-full border border-white bg-[#232326] appearance-none checked:bg-[#8E0606] checked:border-[#8E0606]"
                    />
                    <i className="fa-solid mt-[0.5px] fa-check absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[9px] opacity-100 peer-checked:opacity-0 pointer-events-none"></i>
                  </div>
                  <label htmlFor="remember">{t('RememberMe')}</label>
                </div>

                <a href="#" className="underline">
                  {t('ForgotPassword')}
                </a>
              </div>

              {/* Login Button */}
              <button className="bg-[#650000] text-white text-sm py-3 rounded-xl w-full font-bold mt-4">
                {t('Login')}
              </button>
            </form>
            <p className="text-center text-sm mt-4 text-[#5D5D60] font-bold">
              {t('NeedAccount')} <Link to={'/register'} className="text-[#EBA4A4] underline">{t('SignUp')}</Link>
            </p>
          </div>
        </div>

        {/* Right Section (hidden on tablet and smaller screens) */}
        <div className="hidden lg:flex w-[90%] justify-center items-center">
          <img
            src={registerImage}
            className="w-[85%] h-[600px] ms-auto rounded-lg object-cover"
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  )
}
