import React from 'react'
import UnderLine from '../UnderLine/UnderLine'

export default function Footer() {
  return (
    <div className='bottom-0'>
      <div className=" bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[1px] my-2"></div>
      <div className="p-12 flex">
        <div className="text-start">
          <p className='font-bold'><span className='text-[#be0202]'>Car</span>Mate</p>
          <div className=" w-[70px] bg-gradient-to-l from-black to-red-500 h-[1px] my-2"></div>
          <span className=''>Social Media</span>
          <div className="mt-3">
            <i class="fa-brands fa-facebook text-white"></i>
            <i class="fa-brands fa-youtube text-white ml-3 "></i>
            <i class="fa-brands fa-linkedin text-white ml-3 "></i>
            <i class="fa-brands fa-tiktok text-white ml-3 "></i>
            <i class="fa-brands fa-instagram text-white ml-3 "></i>
          </div>
        </div>
        <div className="m-auto text-start">
          <p className='font-bold'>Contact</p>
          <div className=" w-[70px] bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[1px] my-2"></div>
          <p>WhatsApp</p>
          <p>carMate@Gmail.com</p>
          <p>(20) 20870-445</p>
          <div className="mt-3">
            <i class="fa-brands fa-facebook text-white"></i>
            <i class="fa-brands fa-youtube text-white ml-3 "></i>
            <i class="fa-brands fa-linkedin text-white ml-3 "></i>
            <i class="fa-brands fa-tiktok text-white ml-3 "></i>
            <i class="fa-brands fa-instagram text-white ml-3 "></i>
          </div>
        </div>
        <div className="text-start">
          <p className='font-bold'>Comment Section</p>
          <div className=" w-[150px] bg-gradient-to-r from-[#454545] via-[#FFFFFF] to-[#454545] h-[1px] my-2"></div>
          <span className=''>Add Your Opinion Or Any idea </span>
          <div className="mt-3">
            <textarea name="" id="" className='bg-black rounded-xl h-20' placeholder="message"></textarea>
          </div>
          <div className="text-end me-6">
            <button>
            <i class="fa-solid fa-arrow-right bg-[#5d5d60] text-black py-1 px-3 rounded-md border-[1px]"></i>
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
