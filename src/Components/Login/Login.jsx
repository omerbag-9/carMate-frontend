import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import Cookies from "js-cookie";

export default function Login() {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false);
  const navg = useNavigate();
  let [errMsg, setErrMsg] = useState("")
  let [loading, setLoading] = useState(false)
  let validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: loginSubmit
  });
  async function loginSubmit(val) {
    setLoading(true);
    setErrMsg("");

    try {
      let req = await axios.post('https://fb-m90x.onrender.com/auth/login', val);
      
      if (req.data.success == true) {
        Cookies.set("token", req.data.data.token, { expires: 10 });
        // navg('/');
        window.location.href = "/";
        window.dispatchEvent(new Event("tokenUpdated"));
      }
    } catch (err) {
      // console.log(err.response?.data?.message);
      setErrMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="pb-20 lg:pt-0 pt-5">
      <div className="flex py-6 w-[91%] m-auto gap-x-7 text-white">
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
            {errMsg != "" ? <div className="text-red-500 text-md mb-4">{errMsg}</div> : ""}
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div className="relative w-full">
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto text-[#5D5D60]"></i>
                  <input
                    type="email"
                    placeholder={t('Email')}
                    className="rounded-xl p-3 pl-10 rtl:pr-10 rtl:pl-0 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60] focus:placeholder-transparent"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-2">{formik.errors.email}</div>
                )}
              </div>
              {/* Password */}
              <div className="relative w-full">
                <div className="relative">
                  <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 rtl:right-3 rtl:left-auto text-[#5D5D60]"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('Password')}
                    className="rounded-xl p-3 pl-10 rtl:pr-10 rtl:pl-0 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60] focus:placeholder-transparent focus:ring-0 focus:outline-none"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 rtl:left-3 rtl:right-auto text-[#5D5D60] focus:outline-none focus:ring-0"
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-2">{formik.errors.password}</div>
                )}
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

                <Link to={'/resetpassword'} className="underline">
                  {t('ForgotPassword')}
                </Link>
              </div>

              {/* Login Button */}
              <button
                disabled={loading || !(formik.isValid && formik.dirty)}
                type="submit"
                className="bg-[#650000] disabled:bg-[#a33a3a] disabled:cursor-not-allowed text-white text-sm py-3 rounded-xl w-full font-bold mt-4 flex justify-center items-center gap-2"
              >
                {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : t('Login')}
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
