import React, { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import UnderLine from '../UnderLine/UnderLine';
import dfaultimg from '../../assets/images/defualtIMG.jpg'
// import Notification from '../Notification/Notification';
import Cookies from "js-cookie";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from 'js-cookie';


export default function Navbar() {
    const [language, setLanguage] = useState(cookie.get("i18next") || 'en');
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [token, setToken] = useState(Cookies.get("token") || null);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
        window.location.reload()
        document.documentElement.setAttribute('lang', newLang);
        document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
        document.body.classList.toggle('rtl', newLang === 'ar');
        document.body.classList.toggle('ltr', newLang === 'en');
    };

    const user = {
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };

    const navigation = [
        { name: t('home'), href: '/', current: true },
        { name: t('MarketPlace'), href: '/marketplace', current: false },
        { name: t('community'), href: '/community', current: false },
        { name: t('about'), href: '/about', current: false },
    ];

    const userNavigation = [
        { name: t('navbar.your profile'), action: () => handleOpen('Profile Details') },
        { name: t('navbar.Sign out'), action: handleLogout },
    ];

    const classNames = (...classes) => classes.filter(Boolean).join(' ');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'black',
        border: '2px solid #000',
        borderRadius: '30px',
        boxShadow: 24,
        p: 2,
    };

    const handleOpen = (content) => {
        setModalContent(content);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        function handleTokenUpdate() {
            setToken(Cookies.get("token") || null);
        }

        window.addEventListener("tokenUpdated", handleTokenUpdate);

        return () => {
            window.removeEventListener("tokenUpdated", handleTokenUpdate);
        };
    }, []);

    function handleLogout() {
        Cookies.remove("token");
        setToken(null);
        window.dispatchEvent(new Event("tokenUpdated"));
        window.location.href = "/login"; // This refreshes and navigates to /login
    }

    const [userData, setUserData] = useState({
        profilePhoto: "/default-avatar.png",
        firstName: "",
        lastName: "",
        email: "",
    }); // تخزين بيانات المستخدم
    const actions = [
        {
            name: t('navbar.your profile'),
            action: () => handleOpen('Profile Details')
        }
    ];
    const fetchUserData = async () => {
        try {
            const token = Cookies.get("token");

            if (!token) return;

            const response = await axios.get("https://fb-m90x.onrender.com/user/myprofile", {
                headers: { token: `${token}` }
            });
            // console.log(response.data.data);
            setUserData(response.data.data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);


    const [updateUser, setUpdateUser] = useState("")
    const [loading, setLoading] = useState(false);
    const [updateUserColor, setUpdateUserColor] = useState("");
    const handleUpdateProfile = async (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        setLoading(true);

        try {
            const token = Cookies.get("token"); // جلب التوكن

            // إنشاء FormData
            const formData = new FormData();
            formData.append("firstName", userData.firstName);
            formData.append("lastName", userData.lastName);
            formData.append("phone", userData.phone ? userData.phone : "phone");
            const response = await axios.put("https://fb-m90x.onrender.com/user/updateprofile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: `${token}`
                }
            });

            // console.log("Profile updated successfully:", response.data.data.user);
            setUserData(response.data.data.user);
            setUpdateUserColor("text-green-600");
            setUpdateUser("Profile updated successfully!")
            setTimeout(() => {
                setUpdateUser(""); // إخفاء الرسالة بعد 3 ثوانٍ
            }, 3000);
        } catch (error) {
            // console.error("Error updating profile:", error);
            setUpdateUserColor("text-red-600");
            setUpdateUser("Failed to update profile!")
        } finally {
            setLoading(false); // إيقاف التحميل سواء نجحت العملية أم فشلت
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);

        try {
            const token = Cookies.get("token");
            const formData = new FormData();
            formData.append("profilePhoto", file);

            const response = await axios.put("https://fb-m90x.onrender.com/user/updateprofile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: `${token}`
                }
            });

            setUserData((prev) => ({
                ...prev,
                profilePhoto: response.data.data.user.profilePhoto
            }));
            setUpdateUserColor("text-green-600");
            setUpdateUser("Profile picture updated successfully!");
            setTimeout(() => setUpdateUser(""), 3000);
        } catch (error) {
            setUpdateUserColor("text-red-600");
            setUpdateUser("Failed to update profile picture!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-full mb-20">
                <Disclosure as="nav" className="absolute top-0 left-0 right-0 z-50">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 bg-dark-900">
                                <div className="flex h-16 items-center justify-between bg-dark-900">
                                    {/* Left side - Logo */}
                                    <div className="flex items-center">
                                        <div className="shrink-0">
                                            <Link to="/" className="text-white"><span className='text-red-600'>Car</span>Mate</Link>
                                        </div>
                                    </div>
    
                                    {/* Centered Navigation */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2">
                                        <div className="hidden md:block">
                                            <div className="flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.href}
                                                        className={({ isActive }) => classNames(
                                                            isActive
                                                                ? 'bg-gray-700 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-xl px-1 py-1 mx-5 text-sm font-medium'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
    
                                    {/* Right side - Notifications and Profile */}
                                    <div className="hidden md:block">
                                        <div className="flex items-center md:ml-6">
                                            <button onClick={toggleLanguage} className='px-2 py-1 bg-zinc-900 my-3 text-gray-400 hover:text-white' aria-label='Toggle Language'>
                                                {language === 'en' ? 'AR' : 'EN'}
                                            </button>
    
                                            {token ? (
                                                <>
                                                    <Link to="/notification"
                                                        className="relative rounded-lg px-2 py-1 text-gray-400 hover:text-white mx-4 bg-zinc-900"
                                                    >
                                                        <span className="sr-only">View notifications</span>
                                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Link>
    
                                                    <Menu as="div" className="relative">
                                                        <div>
                                                            <MenuButton className="relative flex max-w-xs items-center text-sm mx-auto focus:outline-none">
                                                                <img
                                                                    className="h-8 w-8 rounded-full object-cover"
                                                                    src={userData.profilePhoto || dfaultimg}
                                                                    alt="Profile"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = dfaultimg;
                                                                    }}
                                                                />
                                                            </MenuButton>
                                                        </div>
                                                        <MenuItems className="absolute ltr:right-0 rtl:left-0 z-10 mt-2 w-48 rounded-md bg-gray-900 py-1 shadow-lg focus:outline-none">
                                                            {userNavigation.map((item) => (
                                                                <MenuItem key={item.name}>
                                                                    <Button onClick={item.action} className="block w-full px-4 py-2 text-start text-sm modalColors  hover:bg-gray-700 hover:text-white">
                                                                        {item.name}
                                                                    </Button>
                                                                </MenuItem>
                                                            ))}
                                                        </MenuItems>
                                                    </Menu>
                                                </>
                                            ) : (
                                                <>
                                                    <Link to="/login" className="px-2 py-1 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-lg mx-2">
                                                        {t('login')}
                                                    </Link>
                                                    <Link to="/register" className="px-2 py-1 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-lg">
                                                        {t('register')}
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
    
                                    {/* Mobile Menu Button */}
                                    <div className="md:hidden">
                                        <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </DisclosureButton>
                                    </div>
                                </div>
                            </div>
    
                            {/* Mobile Menu */}
                            <DisclosurePanel className="md:hidden bg-gray-800">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as={NavLink}
                                            to={item.href}
                                            className={({ isActive }) => classNames(
                                                isActive
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
    
                                {/* Login and Register buttons for mobile */}
                                {!token && (
                                    <div className="px-4 py-2 flex flex-col space-y-2">
                                        <Link to="/login" className="block text-center px-2 py-1 text-sm text-white bg-red-600 rounded-lg">
                                            {t('login')}
                                        </Link>
                                        <Link to="/register" className="block text-center px-2 py-1 text-sm text-white bg-gray-700 rounded-lg">
                                            {t('register')}
                                        </Link>
                                    </div>
                                )}
    
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center justify-center px-5">
                                        {token && (
                                            <>
                                                <div className="shrink-0">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={userData.profilePhoto || dfaultimg}
                                                        alt="Profile"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = dfaultimg;
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-base font-medium text-white">
                                                        {userData.firstName}  {userData.lastName}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-400">
                                                        {userData.email}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {token && (
                                        <div className="mt-3 space-y-1 px-2">
                                            {userNavigation.map((item) => (
                                                <DisclosureButton
                                                    key={item.name}
                                                    onClick={item.action}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-700 hover:text-white"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            ))}
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <button
                                            onClick={toggleLanguage}
                                            className="text-sm text-gray-300 hover:text-white px-2 py-1 rounded border border-gray-500"
                                        >
                                            {i18n.language === 'en' ? 'AR' : 'EN'}
                                        </button>
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
                
                {/* Modal with dark theme */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{ 
                        ...style, 
                        width: { xs: '80%', sm: '50%' },
                        bgcolor: '#111827', // Grey background (gray-600)
                        color: '#f3f4f6' // Light text 
                    }}>
                        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, color: '#ffffff' }}>
                            <i className="fa-solid fa-xmark text-white"></i>
                        </IconButton>
    
                        <Typography variant="h6" component="h2">
                            <p className='font-bold text-center'>{t('profilePage.title')}</p>
                            <div className="w-[35%] m-auto">
                                <UnderLine />
                            </div>
                            <p className='text-center text-sm'>{t('profilePage.subtitle1')}<br />{t('profilePage.subtitle2')}</p>
                        </Typography>
    
                        {userData ? (
                            <div className="flex p-2 sm:flex-row flex-col">
                                <div className="text-center relative">
                                    {/* Profile image container */}
                                    <div
                                        className="w-[75px] h-[75px] rounded-full mx-auto overflow-hidden bg-gray-800 relative cursor-pointer"
                                        onClick={() => setShowPopup(true)}
                                    >
                                        <img
                                            className="w-full h-full object-cover absolute top-0 left-0"
                                            src={userData.profilePhoto || dfaultimg}
                                            alt="Profile"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = dfaultimg;
                                            }}
                                        />
                                    </div>
    
                                    {/* File input for uploading */}
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.tif,.webp"
                                        className="hidden"
                                        id="profileUpload"
                                        onChange={(e) => handleImageUpload(e)}
                                    />
    
                                    {/* Edit button */}
                                    <label
                                        htmlFor="profileUpload"
                                        className="cursor-pointer absolute md:top-[34%] md:left-10 left-[35%] top-[40%] bg-gray-700 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                                    >
                                        <i className="fas fa-camera text-white text-[10px]"></i>
                                    </label>
    
                                    <p className="pt-2 font-medium">{userData.firstName} {userData.lastName}</p>
                                    <p className="text-xs text-gray-400">{userData.email}</p>
    
                                    {/* Image pop-up overlay */}
                                    {showPopup && (
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                                            onClick={() => setShowPopup(false)}
                                        >
                                            <div className="relative max-w-2xl max-h-[80vh]">
                                                <img
                                                    className="max-w-full max-h-[80vh] object-contain"
                                                    src={userData.profilePhoto || dfaultimg}
                                                    alt="Profile"
                                                />
                                                <button
                                                    className="absolute top-4 right-4 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                                    onClick={() => setShowPopup(false)}
                                                >
                                                    <span className="text-xl">&times;</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
    
                                <div className="w-full flex flex-col items-center">
                                    {updateUser !== "" && <div className={`${updateUserColor} text-md pb-4`}>{updateUser}</div>}
                                    <form onSubmit={handleUpdateProfile} className="flex flex-col gap-y-4 sm:mt-0 mt-4 w-full sm:w-auto">
                                        <div className="flex sm:flex-row gap-y-4 flex-col sm:items-start items-center">
                                            <input
                                                type="text"
                                                value={userData.firstName}
                                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                                className="bg-gray-900 w-[80%] rounded-2xl mx-2 border-2 text-white border-gray-500"
                                            />
                                            <input
                                                type="text"
                                                value={userData.lastName}
                                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                                className="bg-gray-900 w-[80%] rounded-2xl border-2 text-white border-gray-500"
                                            />
                                        </div>
                                        <div className="flex sm:flex-row gap-y-4 flex-col sm:items-start items-center">
                                            <input
                                                type="tel"
                                                value={userData.phone || ""}
                                                onChange={(e) => {
                                                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                                                    setUserData({ ...userData, phone: onlyNumbers });
                                                }}
                                                placeholder="Phone"
                                                className="bg-gray-900 w-[80%] mx-2 rounded-2xl border-2 text-white border-gray-500"
                                                pattern="[0-9]*"
                                                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                                            />
    
                                            <input
                                                type="email"
                                                value={userData.email}
                                                disabled
                                                className="bg-gray-900 w-[80%] rounded-2xl border-2 text-gray-500 border-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="m-auto">
                                            <button type="submit" className='bg-[#650000] px-14 py-2 rounded-xl text-white' disabled={loading}>
                                                {loading ? t('profilePage.saving') : t('profilePage.saveChanges')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center">Loading...</p>
                        )}
                    </Box>
                </Modal>
            </div>
        </>
    );
}
