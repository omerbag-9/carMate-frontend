import React from 'react'
import NotFound404 from "../../assets/images/404.png";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <img
        src={NotFound404}
        alt="404 background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold sm:text-6xl">404</h1>
        <p className="mt-4 text-lg sm:text-xl">
          {t('sorry')}
        </p>
        <nav className="mt-8 space-x-11 rtl:space-x-reverse">
          <Link to="/" className="text-lg hover:underline">
            {t('home')}
          </Link>
          <Link to="/marketplace" className="text-lg hover:underline">
            {t('MarketPlace')}
          </Link>
          <Link to="/community" className="text-lg hover:underline">
            {t('community')}
          </Link>
          <Link to="/about" className="text-lg hover:underline">
            {t('about')}
          </Link>
          <Link to="/contact" className="text-lg hover:underline">
            {t('Contact_US')}
          </Link>
        </nav>
      </div>
    </div>
  )
}