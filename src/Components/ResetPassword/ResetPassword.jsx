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

export default function ResetPassword() {
    const { t } = useTranslation();
    const [step, setStep] = useState('reset');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        if (!canResend) return;

        let email = Cookies.get("resetEmail"); // ✅ محاولة جلب البريد من الكوكي

        // ✅ لو الكوكي غير موجود، جلب البريد من الفورميك
        if (!email) {
            email = formik.values.email;
            if (!email) {
                setMessage("Email expired, please try again.");
                setStep("reset"); // يرجع المستخدم لخطوة إدخال البريد
                return;
            }
            Cookies.set("resetEmail", email, { expires: 10 / 1440 }); // ✅ تخزين الإيميل مرة أخرى
        }

        try {
            await axios.post("https://fb-m90x.onrender.com/auth/forget-password", { email });
            setTimer(30);
            setCanResend(false);
            setMessage("OTP resent successfully.");
        } catch (error) {
            setMessage("Failed to resend OTP. Try again.");
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleVerifyOTP = async () => {
        const email = Cookies.get("resetEmail");

        if (!email) {
            setMessage("Email expired, please request a new code.");
            setStep("reset"); // فقط عند انتهاء صلاحية البريد
            return;
        }

        const otpCode = code.join(""); // تجميع أرقام OTP

        try {
            const response = await axios.post("https://fb-m90x.onrender.com/auth/verify", {
                email,
                otp: otpCode,
            });
            
            setMessage("OTP verified successfully.");
            setStep("create"); // ✅ إذا كان صحيحًا، ينتقل المستخدم لخطوة إنشاء كلمة مرور جديدة
        } catch (error) {
            setMessage("Invalid OTP. Please try again."); // ❌ يبقى في صفحة التحقق بدون إعادة توجيه
        }
    };


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
                                <form className="space-y-5">
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
                                    {message && <p className="text-center text-red-500 mt-3">{message}</p>}
                                    {/* رابط إعادة الإرسال */}
                                    <p className="text-sm text-center text-[#EBA4A4]">
                                        <span
                                            className={`underline ${canResend ? "cursor-pointer text-[#EBA4A4]" : "text-gray-500 cursor-not-allowed"}`}
                                            onClick={handleResend}
                                        >
                                            {t('Resend?')}
                                        </span>
                                        <span className="text-white no-underline"> {formatTime(timer)} min</span>
                                    </p>

                                    {/* زر التحقق */}
                                    <div className="flex justify-center items-center w-full">
                                        <button
                                            onClick={handleVerifyOTP}
                                            className="bg-[#650000] text-white text-md py-[8px] rounded-xl w-[85%] mt-4"
                                        >
                                            {t('Verify')}
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
                            <form className="space-y-5">
                                {/* Password Field */}
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 rtl:right-3 ltr:left-3 text-[#5D5D60]"></i>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t("Password")}
                                        className="rounded-xl p-3 rtl:pr-10 ltr:pl-10 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60] focus:placeholder-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 transform -translate-y-1/2 rtl:left-3 ltr:right-3 text-[#5D5D60] focus:outline-none focus:ring-0"
                                    >
                                        <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    </button>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="relative w-full">
                                    <i className="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 rtl:right-3 ltr:left-3 text-[#5D5D60]"></i>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder={t("Confirm Password")}
                                        className="rounded-xl p-3 rtl:pr-10 ltr:pl-10 text-sm w-full bg-[#232326] border-0 text-white placeholder:text-[#5D5D60] focus:placeholder-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute top-1/2 transform -translate-y-1/2 rtl:left-3 ltr:right-3 text-[#5D5D60] focus:outline-none focus:ring-0"
                                    >
                                        <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    </button>
                                </div>

                                {/* Password Requirements List */}
                                <ul className="text-sm text-gray-400 space-y-1 rtl:text-right ltr:text-left">
                                    <li className="flex items-center gap-1 rtl:flex-row">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full border border-white bg-[#232326]">
                                            <i className="fa-solid fa-check pt-[1px] text-white text-[8px]"></i>
                                        </div>
                                        {t("At least 6 characters")}
                                    </li>
                                    <li className="flex items-center gap-1 rtl:flex-row">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full border border-white bg-[#232326]">
                                            <i className="fa-solid fa-check pt-[1px] text-white text-[8px]"></i>
                                        </div>
                                        {t("At least one number and one symbol")}
                                    </li>
                                    <li className="flex items-center gap-1 rtl:flex-row">
                                        <div className="w-4 h-4 flex items-center justify-center rounded-full border border-white bg-[#232326]">
                                            <i className="fa-solid fa-check pt-[1px] text-white text-[8px]"></i>
                                        </div>
                                        {t("Must not match your old password")}
                                    </li>
                                </ul>

                                {/* Reset Password Button */}
                                <button className="bg-[#650000] text-white text-md py-[8px] rounded-xl w-full mt-4 focus:outline-none focus:ring-0">
                                    {t("Reset Password")}
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
