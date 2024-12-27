import React from 'react'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import emailImage from '../../assets/images/emailImage.png'
import { useState } from "react";
export default function ResetPassword() {
    const [step, setStep] = useState('reset'); // 'reset', 'verify', 'create'
    const [code, setCode] = useState(['', '', '', '']); // Store individual digits of the code

    // Handle change for the code inputs
    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/[^0-9]/.test(value)) return; // Ensure only numbers are entered

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to the next input if a value is entered
        if (index < 3 && value !== '') {
            document.getElementById(`code-input-${index + 1}`).focus();
        }
    };

    return (
        <div className="flex py-6 w-[90%] m-auto gap-x-7 text-white min-h-screen pb-20">
            {/* Left Section */}
            <div className="w-1/2 ml-4 mt-32">
                <div className="text-start">
                    {step === 'reset' && (
                        <>
                            <img src={heroLogo} className="w-[20%] m-auto mb-6" alt="Logo" />
                            <div className="mt-0">
                                <p className="text-lg font-bold mb-1">Reset Password</p>
                                <p className="text-base mb-6">
                                    Enter the email associated with your account and we'll send an email with instructions to reset your password.
                                </p>
                                <form className="space-y-5">
                                    <div className="relative w-full">
                                        <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                                        <input
                                            type="email"
                                            placeholder="User@Gmail.com"
                                            className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setStep('verify')}
                                        className="bg-[#8E0606] text-white text-sm py-3 rounded-xl w-full font-bold mt-4"
                                    >
                                        Send Code
                                    </button>
                                </form>
                            </div>
                        </>
                    )}

                    {step === 'verify' && (
                        <>
                            <div className="mt-0">
                                <img src={emailImage} className="w-[25%] m-auto mb-6" alt="Logo" />
                                <p className="text-lg font-bold mb-1 text-center">Verify Your Email Number</p>
                                <p className="text-base mb-6 text-center">
                                    Verify with the code just Now we have send
                                </p>
                                <div className="flex justify-center mb-4">
                                </div>
                                <form className="space-y-5">
                                    <div className="flex gap-2 justify-center">
                                        {code.map((digit, i) => (
                                            <input
                                                key={i}
                                                id={`code-input-${i}`}
                                                type="text"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handleChange(e, i)}
                                                className="w-12 h-12 text-center text-lg font-bold bg-[#232326] border-0 text-white rounded-xl"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-center text-[#8E0606]">
                                        Resend? <span className="text-white">5:00 min</span>
                                    </p>
                                    <button
                                        onClick={() => setStep('create')}
                                        className="bg-[#8E0606] text-white text-sm py-3 rounded-xl w-full font-bold mt-4"
                                    >
                                        Verify
                                    </button>
                                </form>
                            </div>
                        </>
                    )}

                    {step === 'create' && (
                        <>
                            <img src={heroLogo} className="w-[20%] m-auto mb-6" alt="Logo" />
                            <p className="text-lg font-bold mb-1">Create New Password</p>
                            <p className="text-base mb-6">
                                Please enter a new password. Ensure that your new password is different from the previous one for better security.
                            </p>
                            <form className="space-y-5">
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                                    />
                                </div>
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500"></i>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="rounded-xl p-3 pl-10 text-sm w-full bg-[#232326] border-0 text-white"
                                    />
                                </div>
                                <ul className="text-left text-sm text-gray-400 space-y-1">
                                    <li>• At least 6 characters</li>
                                    <li>• At least one number and one symbol</li>
                                    <li>• Must not match your old password</li>
                                </ul>
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
    );
}




