import React from 'react'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import { useState } from "react";

export default function ResetPassword() {
    const [step, setStep] = useState("reset"); // 'reset' or 'create'
    return (
        <div className="flex py-6 w-[90%] m-auto gap-x-7 text-white min-h-screen pb-20">
            {/* Left Section */}
            <div className="w-1/2 ml-4 mt-32">
                <img src={heroLogo} className="w-[20%] m-auto mb-6" alt="Logo" />
                <div className="text-start">
                    {step === "reset" ? (
                        <>
                            <div className="mt-0">
                                {/* Reset Password */}
                                <p className="text-lg font-bold mb-1">Reset Password</p>
                                <p className="text-base mb-6">
                                    Enter the email associated with your account and we'll send an email with instructions to reset your password.
                                </p>
                                <form className="space-y-5">
                                    {/* Email Input */}
                                    <div className="relative w-full">
                                        <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                                        <input
                                            type="email"
                                            placeholder="User@Gmail.com"
                                            className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                                        />
                                    </div>
                                    {/* Send Code Button */}
                                    <button
                                        onClick={() => setStep("create")}
                                        className="bg-[#8E0606] text-white text-sm py-3 rounded-xl w-full font-bold mt-4"
                                    >
                                        Send Code
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Create New Password */}
                            <p className="text-lg font-bold mb-1">Create New Password</p>
                            <p className="text-base mb-6">
                                Please enter a new password. Ensure that your new password is different from the previous one for better security.
                            </p>
                            <form className="space-y-5">
                                {/* Password Input */}
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                                    />
                                </div>
                                {/* Confirm Password Input */}
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                                    />
                                </div>
                                {/* Password Guidelines */}
                                <ul className="text-left text-sm text-gray-400 space-y-1">
                                    <li>• At least 6 characters</li>
                                    <li>• At least one number and one symbol</li>
                                    <li>• Must not match your old password</li>
                                </ul>
                                {/* Reset Password Button */}
                                <button className="bg-[#8E0606] text-white text-sm py-3 rounded-xl w-full font-bold mt-4">
                                    Reset Password
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* Right Section */}
            <div className="w-[90%] flex justify-center items-center">
                <img
                    src={registerImage}
                    className="w-[85%] h-[600px] ms-auto rounded-lg object-cover"
                    alt="Illustration"
                />
            </div>
        </div>

    )
}
