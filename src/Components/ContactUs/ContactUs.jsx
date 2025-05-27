import React from 'react'
import contact from '../../assets/images/contactimage.png';
import phone from '../../assets/images/phonelogo.png';
import email from '../../assets/images/emaillogo.png';
import follow from '../../assets/images/followlogo.png';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation()
  return (
    <div className="text-white min-h-screen px-4 py-10" dir={t('dir')}>
    <div className="max-w-6xl mx-auto">
      <div className="rounded-lg overflow-hidden mb-10">
        <img
          src={contact}
          alt={t('contactUsHeaderAlt')}
          className="w-full object-cover cursor-pointer"
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-16">
        <div className="xl:col-span-2 space-y-4">
          <div className="grid xl:grid-cols-2 gap-6">
            <div>
              <p className="text-sm mb-1 text-left rtl:text-right">{t('name')}</p>
              <input
                type="text"
                placeholder={t('inputPlaceholder')}
                className="bg-transparent border border-white placeholder:text-[#c2a8a8] placeholder:text-[15px] placeholder:font-normal rounded-md px-2 py-2 outline-none w-full"
              />
            </div>
            <div>
              <p className="text-sm mb-1 text-left rtl:text-right">{t('email')}</p>
              <input
                type="text"
                placeholder={t('inputPlaceholder')}
                className="bg-transparent placeholder:text-[#c2a8a8] placeholder:text-[15px] placeholder:font-normal rounded-md border border-white px-2 py-2 outline-none w-full"
              />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1 text-left rtl:text-right">{t('phone')}</p>
            <input
              type="text"
              placeholder={t('inputPlaceholder')}
              className="bg-transparent placeholder:text-[#c2a8a8] placeholder:text-[15px] placeholder:font-normal rounded-md border border-white px-2 py-2 outline-none w-full"
            />
          </div>

          <div>
            <p className="text-sm mb-1 text-left rtl:text-right">{t('commentt')}</p>
            <textarea
              placeholder={t('inputPlaceholder')}
              className="bg-transparent placeholder:text-[#c2a8a8] placeholder:text-[15px] placeholder:font-normal border rounded-md border-white px-2 py-2 outline-none w-full h-32"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button className="bg-[#650000] text-white font-normal px-24 py-2 mt-2">
              {t('sendMessage')}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-white rounded-xl p-4">
            <div className="flex items-center mb-1 space-x-2 rtl:space-x-reverse">
              <img src={phone} alt={t('phoneIconAlt')} className="w-10 h-10" />
              <p className="font-semibold">{t('phoneNumber')}</p>
            </div>
            <div className="ltr:pl-12 rtl:pr-12">
              <p className="text-left rtl:text-right">01223688709 - 01070515818</p>
              <p className="text-left rtl:text-right">01200141454 - 01080944073</p>
            </div>
          </div>

          <div className="border border-white rounded-xl p-4">
            <div className="flex items-center mb-1 space-x-2 rtl:space-x-reverse">
              <img src={email} alt={t('emailIconAlt')} className="w-10 h-10" />
              <p className="font-semibold">{t('emailAddress')}</p>
            </div>
            <div className="pl-12 rtl:pr-12 pr-0">
              <p className="text-left rtl:text-right">ecommerce@Wavenile.com</p>
              <p className="text-left rtl:text-right">Emergency@Wavenile.com</p>
            </div>
          </div>

          <div className="border border-white rounded-xl p-4">
            <div className="flex items-center mb-1 space-x-4 rtl:space-x-reverse">
              <img src={follow} alt={t('followIconAlt')} className="w-10 h-10" />
              <p className="font-semibold">{t('followUs')}</p>
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse text-2xl pl-12 rtl:pr-12 pr-0">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-tiktok"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
