import React from 'react'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="pb-20">
      <div className="flex py-6 w-[90%] m-auto gap-x-7 text-white min-h-screen">
        {/* Left Section */}
        <div className="w-1/2 ml-4 flex flex-col mt-20">
          <img src={heroLogo} className="w-[20%] mt-4 mb-6 m-auto" alt="Logo" />
          <div className="text-center">
            {/* Welcome Message */}
            <p className="text-lg font-bold mb-1 text-start">
              Welcome Back <i className="fa-solid fa-hands-clapping text-xl text-yellow-400 ml-2"></i>
            </p>
            <p className="text-base font-bold mb-6 text-start">Please Log Into Your Account</p>

            {/* Form */}
            <form className="space-y-5">
              {/* Email */}
              <div className="relative w-full">
                <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                <input
                  type="email"
                  placeholder="User@Gmail.com"
                  className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                />
              </div>

              {/* Password */}
              <div className="relative w-full">
                <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                {/* Rounded Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded-full border border-gray-400 bg-[#232326] checked:bg-[#8E0606] checked:border-[#8E0606]"
                  />
                  <label htmlFor="remember" className="">
                    Remember me
                  </label>
                </div>
                <a href="#" className="">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button className="bg-[#8E0606] text-white text-sm py-3 rounded-xl w-full font-bold mt-4">
                Login
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Need an account? <Link to={'/register'} className="text-[#8E0606]">Sign up</Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[90%] flex justify-center items-center">
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
