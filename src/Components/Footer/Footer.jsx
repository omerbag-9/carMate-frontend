import React from 'react'
import UnderLine from '../UnderLine/UnderLine'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <div className='bottom-0'>
      <div className=" bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[1px] my-2"></div>
      <div className="p-12 flex flex-col sm:flex-row gap-y-16">
        <div className="sm:text-start text-center">
          <p className='font-bold'><span className='text-[#be0202]'>Car</span>Mate</p>
          <div className="w-[70px] rtl:sm:mr-0 bg-gradient-to-l sm:ml-0 m-auto from-black to-red-500 h-[1px] my-2"></div>
          <span>{t('Social Media')}</span>
          <div className="mt-3">
            <i className="fa-brands fa-facebook text-white"></i>
            <i className="fa-brands fa-youtube text-white rtl:mr-3 ltr:ml-3"></i>
            <i className="fa-brands fa-linkedin text-white rtl:mr-3 ltr:ml-3"></i>
            <i className="fa-brands fa-tiktok text-white rtl:mr-3 ltr:ml-3"></i>
            <i className="fa-brands fa-instagram text-white rtl:mr-3 ltr:ml-3"></i>
          </div>
        </div>

        <div className="m-auto sm:text-start text-center sm:mb-16 mb-0">
          <p className="font-bold">{t('Contact')}</p>
          <div className="w-[70px] rtl:sm:mr-0 sm:ml-0 m-auto bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[1px] my-2"></div>
          <p>{t('WhatsApp')}</p>
          <p>{t('carMate@Gmail.com')}</p>
          <p>(20) 20870-445</p>
          <div className="mt-3">
            <i className="fa-brands fa-facebook text-white"></i>
            <i className="fa-brands fa-youtube text-white rtl:mr-3 ltr:ml-3"></i>
            <i className="fa-brands fa-linkedin text-white rtl:mr-3 ltr:ml-3"></i>
            <i className="fa-brands fa-tiktok text-white rtl:mr-3 ltr:ml-3"></i>
            <i className="fa-brands fa-instagram text-white rtl:mr-3 ltr:ml-3"></i>
          </div>
        </div>

        <div className="sm:text-start text-center">
          <p className="font-bold">{t('Comment Section')}</p>
            <div className="w-[150px] rtl:sm:mr-0 sm:ml-0 m-auto bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[1px] my-2"></div>
          <span>{t('Add Your Opinion Or Any idea')}</span>
          <div className="mt-3">
            <textarea
              name=""
              id=""
              className="bg-black rounded-xl w-56 h-24"
              placeholder={t('message')}
            ></textarea>
          </div>
          <div className="sm:text-end rtl:text-start text-center sm:me-6">
            <button>
              <i className="fa-solid fa-arrow-right bg-[#5d5d60] text-black py-1 px-3 rounded-md border-[1px]"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[50%] m-auto">
        <div className=" bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[1px] my-2"></div>
      </div>
      <p className='text-gray-400 font-thin my-4'>Copyright © 2024 CarMate , Inc.</p>
    </div>
  )
}
