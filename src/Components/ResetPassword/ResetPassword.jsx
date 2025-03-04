import React, { useEffect } from 'react'
import registerImage from '../../assets/images/registerImage.jpg'
import heroLogo from '../../assets/images/heroLogo.png'
import emailImage from '../../assets/images/emailImage.png'
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const { t } = useTranslation();
    const nvg = useNavigate()
    const [step, setStep] = useState('reset');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/[^0-9]/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (index < 5 && value !== '') { // تحديث التركيز تلقائيًا للخانة التالية
            document.getElementById(`code-input-${index + 1}`).focus();
        }
    };
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setMessage(""); // Reset message
            try {
                const response = await axios.post(
                    "https://fb-m90x.onrender.com/auth/forget-password",
                    values
                );

                Cookies.set("resetEmail", values.email, { expires: 10 / 1440 }); // ✅ تخزين الإيميل في الكوكي
                setMessage(response.data.message || "Check your email for reset instructions.");
                setStep("verify"); // ✅ الانتقال لخطوة التحقق من OTP
            } catch (error) {
                setMessage(error.response?.data?.message || "Something went wrong.");
            }
            setSubmitting(false);
        },
    });

    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    useEffect(() => {
        if (step === "verify") {
            setCanResend(false); // ممنوع إعادة الإرسال في البداية
            const countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        setCanResend(true); // بعد انتهاء العداد يمكن إعادة الإرسال
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(countdown); // تنظيف عند تغيير الصفحة
        }
    }, [step]);

    const handleResend = async () => {
        if (!canResend || isResending) return;
        setIsResending(true);
        const email = Cookies.get("resetEmail");

        if (!email) {
            setMessage("Session expired, please enter your email again.");
            setMessageType("error"); // ❌ لون الرسالة أحمر للأخطاء
            setStep("reset");
            return;
        }

        try {
            await axios.post("https://fb-m90x.onrender.com/auth/forget-password", { email });

            setMessage("OTP resent successfully.");
            setMessageType("success"); // ✅ لون الرسالة أخضر للنجاح
            setCanResend(false);
            clearInterval(window.resendTimer);

            setTimer(30);
            window.resendTimer = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(window.resendTimer);
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            setMessage("Failed to resend OTP. Try again.");
            setMessageType("error"); // ❌ لون الرسالة أحمر للأخطاء
        } finally {
            setIsResending(false);
        }
    };


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleVerifyOTP = async (event) => {
        event.preventDefault();
        setIsVerifying(true);

        const email = Cookies.get("resetEmail");
        if (!email) {
            setMessage("Session expired, please request a new code.");
            setMessageType("error"); // ❌ تحديد اللون الأحمر
            setStep("reset");
            return;
        }

        const otpCode = code.join("");
        if (otpCode.length < 6) {
            setMessage("Please enter the complete OTP.");
            setMessageType("error"); // ❌ تحديد اللون الأحمر
            setIsVerifying(false);
            return;
        }

        try {
            const response = await axios.post("https://fb-m90x.onrender.com/auth/verify", {
                email,
                otp: otpCode,
            });

            if (response.data.success) {
                setMessage("✅ OTP verified successfully.");
                setMessageType("success"); // ✅ تحديد اللون الأخضر
                setStep("create");
            } else {
                setMessage("Invalid OTP. Please try again.");
                setMessageType("error"); // ❌ تحديد اللون الأحمر
            }
        } catch (error) {
            setMessage(error.response?.data.message || "Invalid OTP. Please try again.");
            if (error.response?.data.message == 'Maximum OTP attempts exceeded. Please request a new OTP after 30 seconds.') {
                setStep("reset");
            }
            setMessageType("error"); // ❌ تحديد اللون الأحمر
        } finally {
            setIsVerifying(false);
        }
    };


    const createPasswordFormik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%?&#]{6,100}$/,
                    "Password must be at least 6 characters, contain an uppercase letter, a lowercase letter, a number, and a special character (@$!%?&#)."
                )
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
        }),

        onSubmit: async (values, { setSubmitting }) => {
            const email = Cookies.get("resetEmail"); // جلب الإيميل من الكوكي

            if (!email) {
                setMessage("Session expired, please start over.");
                setStep("reset");
                return;
            }

            try {
                const response = await axios.put("https://fb-m90x.onrender.com/auth/change-password", {
                    email,
                    newPassword: values.password,
                });

                setMessage(response.data.message || "Password reset successful.");
                Cookies.remove("resetEmail"); // حذف الإيميل من الكوكي بعد النجاح
                setTimeout(() => {
                    nvg('/login') // توجيه المستخدم لصفحة تسجيل الدخول
                }, 2000);
            } catch (error) {
                setMessage(error.response?.data?.message || "Something went wrong.");
            }

            setSubmitting(false);
        },
    });


    return (
        <div className="flex py-6 w-[90%] m-auto gap-x-7 text-white pb-20 lg:pt-0 pt-10">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 lg:ml-4 flex flex-col justify-center">
                <div className="text-start">
                    {step === 'reset' && (
                        <>
                            <img src={heroLogo} className="w-[20%] m-auto mb-6" alt="Logo" />
                            <div className="mt-0">
                                <p className="text-2xl mb-2">Reset Password</p>
                                <p className="text-base mb-6">
                                    Enter the email associated with your account and we'll send an email
                                    with instructions to reset your password.
                                </p>

                                <form onSubmit={formik.handleSubmit} className="space-y-5">
                                    {/* Email Input */}
                                    <div className="relative w-full">
                                        <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 rtl:right-3 ltr:left-3 text-[#5D5D60]"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="User@Gmail.com"
                                            className="rounded-xl p-3 rtl:pr-10 ltr:pl-10 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60] focus:placeholder-transparent"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                    </div>
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-red-500 text-sm text-center">{formik.errors.email}</p>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="bg-[#650000] text-white text-md py-[8px] rounded-xl w-full mt-4"
                                        disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? "Sending..." : "Send Code"}
                                    </button>
                                </form>

                                {/* Response Message */}
                                {message && <p className="text-center text-red-500 mt-3">{message}</p>}
                            </div>
                        </>
                    )}
                    {step === 'verify' && (
                        <>
                            <div className="mt-0">
                                <img src={emailImage} className="w-[25%] m-auto mb-6" alt="Logo" />
                                <p className="text-2xl font-semibold mb-1 text-center">{t('Verify Your Email Number')}</p>
                                <p className="mb-6 font-thin mt-6 text-sm text-center">
                                    {t('Verify with the code just Now we have send')}
                                </p>

                                {/* إدخال الكود */}
                                <form className="space-y-5" onSubmit={handleVerifyOTP}>
                                    <div className="flex gap-2 justify-center rtl:flex-row-reverse">
                                        {code.map((digit, i) => (
                                            <input
                                                key={i}
                                                id={`code-input-${i}`}
                                                type="text"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handleChange(e, i)}
                                                className="w-11 h-11 text-center text-lg font-bold bg-[#232326] border-0 text-white rounded-xl rtl:text-right"
                                            />
                                        ))}
                                    </div>
                                    {message && (
                                        <p className={`text-center mt-3 ${messageType === "success" ? "text-green-500" : "text-red-500"}`}>
                                            {message}
                                        </p>
                                    )}
                                    {/* رابط إعادة الإرسال */}
                                    <p className="text-sm text-center text-[#EBA4A4]">
                                        <span
                                            className={`underline ${canResend ? "cursor-pointer text-[#EBA4A4]" : "text-gray-500 cursor-not-allowed"}`}
                                            onClick={!isResending ? handleResend : null}
                                        >
                                            {isResending ? "Sending..." : t('Resend?')}
                                        </span>
                                        <span className="text-white no-underline"> {formatTime(timer)} min</span>
                                    </p>

                                    {/* زر التحقق */}
                                    <div className="flex justify-center items-center w-full">
                                        <button
                                            type="submit"
                                            className="bg-[#650000] text-white text-md py-[8px] rounded-xl w-[85%] mt-4"
                                            disabled={isVerifying}
                                        >
                                            {isVerifying ? "Verifying..." : t('Verify')}
                                        </button>


                                    </div>
                                </form>
                            </div>
                        </>
                    )}


                    {step === 'create' && (
                        <>
                            <img src={heroLogo} className="w-[20%] m-auto mb-6" alt="Logo" />
                            <p className="text-2xl font-semibold mb-1">{t('Create New Password')}</p>
                            <p className="text-base mb-6">
                                {t('Please enter a new password. Ensure that your new password is different from the previous one for better security.')}
                            </p>
                            <form onSubmit={createPasswordFormik.handleSubmit} className="space-y-5">
                                {/* Password Field */}
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 rtl:right-3 ltr:left-3 text-[#5D5D60]"></i>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder={t("Password")}
                                        className="rounded-xl p-3 rtl:pr-10 ltr:pl-10 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60]"
                                        onChange={createPasswordFormik.handleChange}
                                        onBlur={createPasswordFormik.handleBlur}
                                        value={createPasswordFormik.values.password}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 transform -translate-y-1/2 rtl:left-3 ltr:right-3 text-[#5D5D60]">
                                        <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    </button>
                                </div>
                                {createPasswordFormik.touched.password && createPasswordFormik.errors.password && (
                                    <p className="text-red-500 text-sm text-center">{createPasswordFormik.errors.password}</p>
                                )}

                                {/* Confirm Password Field */}
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 rtl:right-3 ltr:left-3 text-[#5D5D60]"></i>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder={t("Confirm Password")}
                                        className="rounded-xl p-3 rtl:pr-10 ltr:pl-10 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60]"
                                        onChange={createPasswordFormik.handleChange}
                                        onBlur={createPasswordFormik.handleBlur}
                                        value={createPasswordFormik.values.confirmPassword}
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 transform -translate-y-1/2 rtl:left-3 ltr:right-3 text-[#5D5D60]">
                                        <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    </button>
                                </div>
                                {createPasswordFormik.touched.confirmPassword && createPasswordFormik.errors.confirmPassword && (
                                    <p className="text-red-500 text-sm text-center">{createPasswordFormik.errors.confirmPassword}</p>
                                )}

                                {/* Reset Password Button */}
                                <button
                                    type="submit"
                                    className="bg-[#650000] text-white text-md py-[8px] rounded-xl w-full mt-4"
                                    disabled={createPasswordFormik.isSubmitting}
                                >
                                    {createPasswordFormik.isSubmitting ? "Resetting..." : t("Reset Password")}
                                </button>
                            </form>

                        </>
                    )}
                </div>
            </div>

            {/* Right Section (hidden on tablets & smaller screens) */}
            <div className="hidden md:hidden lg:flex w-[90%] justify-center items-center">
                <img src={registerImage} className="w-[85%] h-[600px] ms-auto rounded-lg object-cover" alt="Illustration" />
            </div>
        </div>

    );
}
