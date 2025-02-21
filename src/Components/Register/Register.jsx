import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'

export default function Register() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let navg = useNavigate()
  let [errMsg, setErrMsg] = useState("")
  let [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");


  let validationSchema = Yup.object({
    firstName: Yup.string().min(3, 'First name minlength is 3').max(10, 'First name maxlength is 10').required('First name is required'),
    lastName: Yup.string().min(3, 'Last name minlength is 3').max(10, 'Last name maxlength is 10').required('Last name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password minlength is 6')
      .max(20, 'Password maxlength is 20')
      .required('Password is required'),
    role: Yup.string().oneOf(['customer', 'seller'], 'Role must be either customer or seller').required('Role is required')
  });

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "customer",
    },
    validationSchema,
    onSubmit: registerSubmit
  });

  async function registerSubmit(val) {
    setLoading(true);
    setErrMsg("");

    try {
      let req = await axios.post('https://fb-m90x.onrender.com/auth/signup', val);

      if (req.data.success) {
        navg('/login');
      }
    } catch (err) {
      console.log(err.response?.data?.message);
      setErrMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }


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
          {errMsg != "" ? <div className="text-red-500 text-md mb-4">{errMsg}</div> : ""}
          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col lg:flex-row justify-between">
              {/* First Name */}
              <div className="relative w-full lg:w-[48%] flex flex-col gap-1">
                <div className="relative">
                  <i className={`fa-solid fa-user absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
                  <input
                    type="text"
                    placeholder={t('First Name')}
                    className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'}`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    name="firstName"
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                )}
              </div>

              {/* Last Name */}
              <div className="relative w-full lg:w-[48%] flex flex-col gap-1">
                <div className="relative">
                  <i className={`fa-solid fa-user absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
                  <input
                    type="text"
                    placeholder={t('Last Name')}
                    className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'}`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    name="lastName"
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                )}
              </div>
            </div>



            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="relative w-full flex flex-col gap-1">
                <div className="relative">
                  <i className={`fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
                  <input
                    type="email"
                    placeholder={t('Email')}
                    className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'}`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="relative w-full flex flex-col gap-1">
                <div className="relative">
                  <i className={`fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60]`}></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('Password')}
                    className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'}`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'left-3' : 'right-3'} text-[#5D5D60]`}
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative w-full flex flex-col gap-1">
                <div className="relative">
                  <i className={`fa-solid fa-lock ${isRtl ? 'right-3' : 'left-3'} text-[#5D5D60] absolute top-1/2 transform -translate-y-1/2`}></i>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t('Confirm Password')}
                    className={`peer rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm placeholder:text-[#5D5D60] focus:placeholder-transparent ${isRtl ? 'pr-9' : 'pl-9'}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => {
                      if (confirmPassword && confirmPassword !== formik.values.password) {
                        setPasswordError('Passwords do not match');
                      } else {
                        setPasswordError('');
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? 'left-3' : 'right-3'} text-[#5D5D60]`}
                  >
                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
              </div>

              {/* Role Selection */}
              <div className="relative w-full flex flex-col gap-1">
                <select
                  className={`rounded-xl p-3 w-full bg-[#232326] border-0 text-white text-sm ${isRtl ? 'pr-3' : 'pl-3'}`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  name="role"
                >
                  <option value="">{t('Choose Your Role')}</option>
                  <option value="customer">{t('Customer')}</option>
                  <option value="seller">{t('Seller')}</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <div className="text-red-500 text-sm">{formik.errors.role}</div>
                )}
              </div>
            </div>


            {/* Register Button */}
            <button
              disabled={loading || !(formik.isValid && formik.dirty) || confirmPassword !== formik.values.password || !confirmPassword}
              type="submit"
              className="bg-[#650000] disabled:bg-[#a33a3a] disabled:cursor-not-allowed text-white text-sm py-3 rounded-xl w-full font-bold mt-4 flex justify-center items-center gap-2"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : t('Register')}
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
