import React from 'react';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';
import img1 from '../../assets/images/image5.png';
import img2 from '../../assets/images/image56.png';
import img3 from '../../assets/images/image55.png';
import person from '../../assets/images/Ellipse25.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'

export default function Moredetails() {

  let { id } = useParams();

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
  const [isLoading, setIsLoading] = useState(true);
  const URL = window.location.href;
  
  function getSpecificProducts(id) {
    setIsLoading(true); // Set loading to true before fetch
    axios.get(`https://fb-m90x.onrender.com/seller/getSpecificProduct/${id}`)
      .then((res) => {
        setSpecificProduct(res.data.data.product);
        setseller(res.data.data.seller);
      })
      .catch((res) => {
        // Handle error
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after fetch
      });
  }

  useEffect(() => {
    getSpecificProducts(id)

  }, [id])

  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div className="text-center py-10 text-white w-full">
          <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
          <p className="mt-2">Loading Details...</p>
        </div>
      ) : (
        <>
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
                  className="w-full object-cover rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
  
                <div className="flex mt-3 justify-center gap-2">
                  {SpecificProduct.subImages &&
                    SpecificProduct.subImages.slice(0, 2).map((image, index) => (
                      <img
                        key={index}
                        className="w-[48%] rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                        src={image}
                        alt={`Product view ${index + 1}`}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
            
            <div className="info lg:w-[50%] w-full lg:pl-8 lg:pr-4" dir='ltr'>
              {/* Enhanced Product Header Section */}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-gray-700 text-xs uppercase tracking-wide rounded-full text-gray-300 font-semibold">
                    {t('category')}
                  </span>
                  <div className="h-1 w-1 bg-gray-500 rounded-full mx-3"></div>
                  <span className="text-gray-400 text-sm">ID: {SpecificProduct.id || 'N/A'}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">{SpecificProduct.title}</h2>
                
                <div className="relative mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-300 leading-relaxed lg:text-lg sm:text-base">
                    {SpecificProduct.description}
                  </p>
                </div>
              </div>
  
              {/* Social Media Sharing */}
              <div className="social-share mt-6  bg-opacity-50 rounded-lg p-4 flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg font-medium text-gray-300">{t('share')}:</span>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${URL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${URL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                    aria-label="Share on X (Twitter)"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${URL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a
                    href={`https://plus.google.com/share?url=${URL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    aria-label="Share on Google+"
                  >
                    <i className="fa-brands fa-google-plus-g"></i>
                  </a>
                </div>
              </div>
  
              {/* Price and Buy Button */}
              <div className="buttons mt-6 flex flex-col lg:flex-row items-center justify-center lg:justify-start mb-3">
                <div className="price-tag bg-gray-800 border-l-2  rounded-lg p-4 flex items-center mb-4 lg:mb-0 lg:mr-4 w-full lg:w-auto">
                  <span className="text-green-700 text-2xl font-bold">
                    ${SpecificProduct.price}
                  </span>
                </div>
                
                <Link to={SpecificProduct.productLink} className="w-full lg:w-auto">
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg w-full lg:w-auto transition-colors duration-300 flex items-center justify-center">
                    <i className="fa-solid fa-link mr-2"></i> {t('productLink')}
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
        </>
      )}
    </div>
  );
}
