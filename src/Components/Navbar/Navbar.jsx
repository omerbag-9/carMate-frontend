import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import UnderLine from '../UnderLine/UnderLine';
import profileImg1 from '../../assets/images/profileImg1.jpg'

export default function Navbar() {
    const [language, setLanguage] = useState('en');
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
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
        { name: t('navbar.Sign out') },
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

    return (
        <>
            <div className="min-h-full mb-20">
                <Disclosure as="nav" className="absolute top-0 left-0 right-0 z-50">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
                                <div className="flex h-16 items-center justify-between">
                                    {/* Left side - Logo */}
                                    <div className="flex items-center">
                                        <div className="shrink-0">
                                            <Link to="/"><span className='text-red-600'>Car</span>Mate</Link>
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
                                                                ? 'bg-slate-100 text-black'
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
                                            <button
                                                type="button"
                                                className="relative px-2 py-1 text-gray-400 hover:text-white mx-4 bg-zinc-900"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative">
                                                <div>
                                                    <MenuButton className="relative flex max-w-xs items-center p text-sm mx-auto focus:outline-none">
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={user.imageUrl}
                                                            alt="Profile"
                                                        />
                                                    </MenuButton>
                                                </div>
                                                <MenuItems className="absolute ltr:right-0 rtl:left-0  z-10 mt-2 w-48  rounded-md bg-white py-1 shadow-lg focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <MenuItem key={item.name}>
                                                            <Button onClick={item.action} className="block  w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100">
                                                                <p className='text-black'>{item.name}</p>
                                                            </Button>
                                                        </MenuItem>
                                                    ))}
                                                </MenuItems>
                                            </Menu>
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
                                {/* Language Toggle Button for Mobile */}
                                <div className="px-4 py-2">
                                    <button onClick={toggleLanguage} className="px-2 py-1 bg-zinc-900 text-gray-400 hover:text-white w-full">
                                        {language === 'en' ? 'AR' : 'EN'}
                                    </button>
                                </div>

                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center justify-center px-5">
                                        <div className="shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user.imageUrl}
                                                alt="User Profile"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-white">
                                                {user.name}
                                            </div>
                                            <div className="text-sm font-medium text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                onClick={item.action}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
                {/* Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                        >
                            <i className="fa-solid fa-xmark text-white"></i>
                        </IconButton>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <p className='font-bold text-center'>{t('profilePage.title')}</p>
                            <div className="w-[35%] m-auto">
                                <UnderLine />
                            </div>
                            <p className='text-center text-sm'>{t('profilePage.subtitle1')}<br/>{t('profilePage.subtitle2')}</p>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className="flex p-2 sm:flex-row flex-col">
                                <div className="text-center">
                                    <img src={profileImg1} className='w-[60%] rounded-full m-auto' alt="" />
                                    <p className='pt-3'>Dina Mohsen</p>
                                    <p className='text-[12px]'>@dinamohsen</p>
                                </div>
                                <div className="">
                                    <form action="" className="flex flex-col gap-y-4 sm:mt-0 mt-4">
                                        <div className="flex sm:flex-row gap-y-4 flex-col">
                                            <input type="text" className="bg-black w-[80%] rounded-2xl border-2 border-gray-500 ltr:mr-3 rtl:ml-3" placeholder={t('profilePage.firstNamePlaceholder')} />
                                            <input type="text" className="bg-black w-[80%] rounded-2xl border-2 border-gray-500" placeholder={t('profilePage.lastNamePlaceholder')} />
                                        </div>
                                        <div className="flex sm:flex-row gap-y-4 flex-col">
                                            <input type="tel" className="bg-black w-[80%] rounded-2xl border-2 border-gray-500 ltr:mr-3 rtl:ml-3" placeholder={t('profilePage.phonePlaceholder')} />
                                            <input type="email" className="bg-black w-[80%] rounded-2xl border-2 border-gray-500" placeholder={t('profilePage.emailPlaceholder')} />
                                        </div>
                                        <div className="m-auto">
                                            <button className='bg-[#650000] px-14 py-2 rounded-xl'>{t('profilePage.saveChanges')}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

