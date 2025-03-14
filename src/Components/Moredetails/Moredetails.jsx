import React from 'react';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';
import img1 from '../../assets/images/image5.png';
import img2 from '../../assets/images/image56.png';
import img3 from '../../assets/images/image55.png';
import person from '../../assets/images/Ellipse25.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import  { useEffect, useState } from 'react'




export default function Moredetails() {

let {  id } = useParams();


  const { t } = useTranslation()

  const [SpecificProduct, setSpecificProduct] = useState({
    mainImage: '',
    subImages: [],  // Initialize subImages as an empty array
    title: '',
    description: '',
    price: '',
    productLink: ''
  });
  const [seller, setseller] = useState([]);


  function getSpecificProducts(id) {
  
      axios.get(`https://fb-m90x.onrender.com/seller/getSpecificProduct/${id}`)
      .then((res)=>{
        setSpecificProduct(res.data.data.product)
        setseller(res.data.data.seller)

      })
      .catch((res)=>{})
  
  
  }
  
  useEffect(() => {
    getSpecificProducts(id)

  }, [])

  return (
    <div className="container mx-auto px-4">
      <div className="title text-center mx-auto pt-11">
        <h1 className="text-3xl font-bold">
          {t('moreDetails')}
          <div className="w-48 mx-auto">
            <UnderLine />
          </div>
        </h1>
        <p className="lg:w-[32%] sm:w-full mx-auto">{t('moredetailsTitle')}</p>
      </div>

      <div className="moredetails flex flex-col lg:flex-row my-14 lg:justify-between" dir='ltr'>
        <div className="images mb-6 lg:mb-0 lg:w-[50%] w-full flex flex-col md:items-center md:justify-center justify-center items-center">
          <div className="relative w-[72%] lg:ml-[75px]">
            <img
              src={SpecificProduct.mainImage}
              alt="Main product"
              className="w-full object-cover rounded-md"
            />

            <div className="flex mt-3 justify-center gap-2">
              {SpecificProduct.subImages && 
                SpecificProduct.subImages.slice(0, 2).map((image, index) => (
                  <img
                    key={index}
                    className="w-[48%] rounded-md"
                    src={image}
                    alt={`Product view ${index + 1}`}
                  />
                ))
              }
            </div>
          </div>
        </div>
        <div className="info text-center ltr:lg:text-left rtl:lg:text-right lg:w-[50%] w-full" dir='ltr'>
          <h2 className="text-3xl font-bold mb-3">{SpecificProduct.title}</h2>
          <span className="font-bold block lg:inline-block mb-2">{t('category')}</span>
          <p className="mt-3 lg:text-[19px] sm:text-[15px] lg:font-semibold sm:font-normal">{SpecificProduct.description}</p>
          <div className="buttons mt-16 flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:mx-20 sm:mx-0 mb-3">
            <span className="bg-slate-50 border-2 border-black rounded-lg text-[#086302] text-[16px] font-bold w-32 py-2 flex items-center justify-center mb-4 lg:mb-0 lg:mr-4">
             $ {SpecificProduct.price}
            </span>
            <Link to={SpecificProduct.productLink}>
              <button className="bg-slate-50 border-2 border-black rounded-lg text-black text-[16px] font-bold px-12 py-2 mx-3">
                <i className="fa-solid fa-link"></i> {t('productLink')}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <UnderLine />

      <div className="sellerInfo flex flex-col lg:flex-row lg:justify-center mt-14 mb-10 px-4">
        <div className="seller text-center mt-10 lg:mx-20">
          <h2 className="text-3xl font-bold mb-3">{t('sellerInfo')}</h2>
          <div className="w-4/5 mx-auto">
            <UnderLine />
          </div>
          <p className="text-lg lg:text-[20px] w-4/5 mx-auto">{t('contactSeller')}</p>
        </div>

        <div className="hidden lg:block bg-gradient-to-b from-[#454545] via-[#FFFFFF] to-[#454545] h-[200px] w-[1px] my-2"></div>

        <div className="sellerContact flex flex-col lg:flex-row items-center lg:items-start mt-20 lg:mt-0">
          <div className="sellerImg ltr:lg:ml-14 rtl:lg:mr-14 mb-5 lg:mb-0 mt-3">
            <img src={seller.profilePhoto} alt="seller" className="w-36 h-32 lg:w-40 lg:h-40 object-cover rounded-full mx-auto" />
          </div>
          <div className="socialmedia text-center ltr:lg:text-left rtl:lg:text-start lg:mx-5">
            <p className="pt-5 text-lg lg:text-xl">
              <i className="px-3 fa-regular fa-user"></i>
              <span className="text-zinc-500 px-3">|</span> {seller.firstName} {seller.lastName}
            </p>
            <p className="pt-5 text-lg lg:text-xl flex items-center">
              <i className="px-3 fa-solid fa-m"></i>
              <span className="text-zinc-500 px-3">|</span>
              {seller.email}
            </p>

            <p className="pt-5 text-lg lg:text-xl">
              <i className="px-[10px] fa-solid fa-phone text-green-800"></i>
              <span className="text-zinc-500 px-3">|</span> {seller.phone}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
