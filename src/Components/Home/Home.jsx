import React, { useCallback, useEffect, useState } from 'react'
import homeImage from '../../assets/images/homeImg.png'
import icon1 from '../../assets/images/icon1.png'
import icon2 from '../../assets/images/icon2.png'
import icon3 from '../../assets/images/icon3.png'
import icon4 from '../../assets/images/icon4.png'
import icon5 from '../../assets/images/icon5.png'
import icon6 from '../../assets/images/icon6.png'
import icon7 from '../../assets/images/icon7.png'
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import comma from '../../assets/images/comma.png'
import carImg from '../../assets/images/carImg.png'
import profileImg1 from '../../assets/images/profileImg1.jpg'
import profileImg2 from '../../assets/images/profileImg2.jpg'
import myCar from '../../assets/images/myCar.jpg'
import { useTranslation } from 'react-i18next'
import UnderLine from '../UnderLine/UnderLine'
import { Link } from 'react-router-dom'
import useEmblaCarousel from "embla-carousel-react";
import axios from 'axios'

// import "./EmblaCarousel.css";
export default function Home() {
  const { t } = useTranslation()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start",
  });

  const [reviews, setReviews] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://fb-m90x.onrender.com/user/reviews");
        setReviews(response.data.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
    }
  }, [emblaApi]);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fb-m90x.onrender.com/seller/getProducts");

        if (response?.data?.status === "success") {
          setProducts(response.data.data.slice(0, 3)); // عرض أول 3 منتجات فقط
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='mt-3'>
      {/* first part of home */}
      <div className="relative bg-cover bg-center bg-no-repeat sm:w-full h-[85vh] sm:rounded-3xl rounded-xl" style={{ backgroundImage: `url(${homeImage})` }}>
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <p className='sm:text-md text-center text-sm whitespace-nowrap'>{t('firstTitle')}</p>
          <p className='sm:text-4xl text-md font-bold whitespace-nowrap my-2'> {t('CarMate is Your Partner in Every')}{' '}
            <span className="text-[#8E0606]">{t('Journey')}</span>.</p>
        </div>
        <div className="absolute sm:top-[90%] top-[83%] left-[50%] -translate-x-1/2">
          <Link to={'about'}><p className='sm:text-lg text-sm bg-[#232326] sm:px-3 px-3 py-1 rounded-xl whitespace-nowrap'>{t('More About CarMate')} <i className="fa-solid fa-arrow-up rotate-45"></i> </p></Link>
        </div>
      </div>

      {/* second part of home */}
      <div className="mt-20 sm:mb-0 mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 sm:gap-y-6 md:gap-y-10">
        <div className="text-center">
          <img src={icon1} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('AI-Powered Car Solutions')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Our AI quickly diagnoses issues and')} <br /> {t('offers easy, step-by-step solutions')} <br /> {t('for your car problems.')}</p>
        </div>
        <div className="text-center">
          <img src={icon2} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('Top Mechanics, Top Service')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Our network of skilled mechanics')} <br /> {t('ensures top-quality service and')} <br /> {t('expert care for every car.')}</p>
        </div>
        <div className="text-center">
          <img src={icon3} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('Smart Car Management')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Easily manage your car\'s details, track')} <br /> {t('maintenance, and get timely reminders')} <br /> {t('for important tasks.')}</p>
        </div>
        <div className="text-center">
          <img src={icon4} className="w-10 m-auto" alt="" />
          <p className="text-xl">{t('Boost Your Career')}</p>
          <div className="w-[40%] m-auto">
            <UnderLine />
          </div>
          <p>{t('Unlock opportunities to connect')} <br /> {t('with car owners and grow your')} <br /> {t('mechanic career.')}</p>
        </div>
      </div>

      {/* third part of home */}
      <div className="grid sm:grid-cols-2 grid-cols-1 items-center justify-start">
        <div className="ms-3">
          <p className='text-2xl font-bold text-center sm:text-start'>{t('My Car')}</p>
          <div className="w-[15%] sm:ms-0 m-auto">
            <UnderLine />
          </div>
          <p className='text-center sm:text-start'>{t('Track, maintain, and never forget your car’s needs!')}<br />{t('Stay ahead with smart reminders and effortless')} <br /> {t('updates for every ride.')}</p>
          <div className="ms-0 text-center sm:text-start">
            <a href="#download-section"> <button className='bg-[#5D5D60] mt-5 p-1'> {t('Download App Now')}</button></a>
          </div>

        </div>
        <div className="transform">
          <img
            src={carImg}
            className="rtl:scale-x-100 ltr:scale-x-[-1]"
            alt=""
          />
        </div>
      </div>
      {/* fourth part of home */}
      <div className="mb-20 sm:gap-y-0 gap-y-16 grid sm:grid-cols-2 grid-cols-1 items-center justify-center">
        <div className="ms-3 sm:border-dashed sm:border-white sm:ltr:border-r-2 sm:rtl:border-l-2 text-center sm:text-start">
          <img src={icon5} className="w-10 mb-2 mx-auto sm:mx-0" alt="" />
          <p className='text-2xl font-bold'>{t('Save Your Car Data')}</p>
          <div className="w-[38%] mx-auto sm:mx-0">
            <UnderLine />
          </div>
          <p className='text-center sm:text-start'>
            {t('You Can Save Your Car Information')} <br />
            {t('to Easy Access.')}
          </p>
        </div>
        <div className="sm:ms-32 ms-3 text-center sm:text-start">
          <img src={icon6} className="w-10 mb-2 mx-auto sm:mx-0" alt="" />
          <p className='text-2xl font-bold'>{t('Reminder For Your Tasks')}</p>
          <div className="w-[45%] mx-auto sm:mx-0">
            <UnderLine />
          </div>
          <p className='text-center sm:text-start'>
            {t('You Can Set a Reminder To remember')} <br />
            {t('important Things.')}
          </p>
        </div>
      </div>
      {/* fifth part of home */}
      <div className="mb-20 grid sm:gap-y-0 gap-y-16 sm:grid-cols-2 grid-cols-1 items-center justify-start">
        <div className="ms-3">
          <p className="text-2xl font-bold text-center sm:text-start">{t('Car Alerts & Signs')}</p>
          <div className="w-[35%] ltr:sm:ml-0 rtl:sm:mr-0 m-auto">
            <UnderLine />
          </div>
          <p className="text-center sm:text-start">
            {t('Monitor, Respond, and Stay on Top of Your Car’s')} <br />
            {t('Alerts!')}
          </p>
          <div className="ms-0 text-center sm:text-start">
            <a href="#download-section"><button className="bg-[#5D5D60] mt-5 p-1">{t('Download App Now')}</button></a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img src={icon7} className="w-1/2" alt="" />
        </div>
      </div>
      {/* sixth part of home */}
      <div className="pt-10 mb-20">
        <div className="flex mb-4 px-4">
          <p className="font-bold text-xl">{t("Some of Product Market Place")}</p>
          <Link to="/marketplace" className="ltr:ml-auto rtl:mr-auto text-start text-xl">
            {t("View All")} <i className="fa-solid fa-angle-right ms-2"></i>
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Link to={`/moredetails/${product.id}`}>
                <div key={product.id} className="relative group overflow-hidden w-[100%]">
                  {/* الصورة بنفس الحجم المحدد */}
                  <img src={product.mainImage} className="w-[90%] h-[350px] object-cover rounded-2xl mx-auto" alt={product.title} />

                  {/* Gradient Overlay */}
                  <div className="absolute w-[90%] mx-auto rounded-2xl top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/100 to-transparent opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                      <p className="font-bold text-2xl text-start">{product.title}</p> {/* عرض العنوان بدون ترجمة */}
                      <p className="text-start">{product.description}</p> {/* عرض الوصف بدون ترجمة */}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available</p>
          )}
        </div>
      </div>
      {/* seventh part of home */}
      <div className="pt-10 mb-20">
        <div className="flex mb-4">
          <p className="font-bold text-xl">{t('What our Users say About us')}</p>
        </div>
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container mb-4">
              {reviews.map((review, index) => (
                <div key={review.id} className="embla__slide p-6 relative h-[280px] flex flex-col">
                  {/* Header with title and comma */}
                  <div className="flex">
                    <div>
                      <p className="text-2xl">{index % 2 === 0 ? "Great Work" : "Good Job"}</p>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                      <img src={comma} className="w-10 h-10" alt="Comma Icon" />
                    </div>
                  </div>

                  {/* Review content */}
                  <div className="flex-grow px-2 overflow-hidden mb-2">
                    <p className="text-[16px] mt-5 font-medium line-clamp-5 overflow-y-auto scrollbar-custom max-h-[120px]">
                      {review.reviewContent}
                    </p>
                  </div>

                  {/* User info fixed at bottom - reduced spacing */}
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={review.author.profilePhoto[0]}
                        className="w-full h-full object-cover"
                        alt={`${review.author.firstName} ${review.author.lastName}`}
                      />
                    </div>
                    <div className="ms-5">
                      <p className="text-[16px]">
                        {review.author.firstName} {review.author.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls">
            <button className="embla__button embla__button--prev" onClick={scrollPrev}>
              <i className="fa-solid fa-arrow-left ltr:rotate-0 rtl:rotate-180"></i>
            </button>
            <div className="embla__dots">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot ${index === selectedIndex ? "is-selected" : ""}`}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                ></button>
              ))}
            </div>
            <button className="embla__button embla__button--next" onClick={scrollNext}>
              <i className="fa-solid fa-arrow-right ltr:rotate-0 rtl:rotate-180"></i>
            </button>
          </div>
        </div>
      </div>
      {/* 8th part of home */}
      <div id="download-section" className="mb-32 bg-[#d5d5d7] text-black sm:flex px-6 py-8 relative rounded-xl overflow-hidden">
        <div className="flex-1 text-start">
          <p className='font-bold text-2xl'>
            {t('Take care of your Own car, anywhere, anytime.')}
          </p>
          <p className='rtl:sm:text-sm'>
            {t('Download CarMate to diagnose issues, get maintenance reminders, store car')}<br />
            {t('details, and shop products—all in one app. Connect with expert mechanics')}<br />
            {t(' whenever you need!')}
          </p>
          <div className="sm:block flex justify-center">
            <div className="sm:flex mx-4 sm:pb-0 pb-64">
              <button className='bg-black text-sm text-white py-2 sm:px-4 px-6 rtl:pl-12 rounded-2xl my-4 flex items-center mr-4'>
                <i className="fa-brands fa-apple ltr:pr-3 rtl:pl-3 ltr:border-r-2 rtl:border-l-2 border-gray-500 text-3xl rtl:ml-3 ltr:mr-3"></i>
                <div>
                  <span className='font-medium'>{t('Download on the')}</span><br />
                  <span className='font-bold'>{t('Apple Store')}</span>
                </div>
              </button>
              <button className='bg-black text-sm text-white rtl:mx-4 py-2 pl-4 rtl:pr-2 ltr:sm:pr-11 ltr:pr-14 ltr:pl-6 rtl:pl-7 rounded-2xl my-4 flex items-center'>
                <i className="fa-brands fa-google-play ltr:pr-3 rtl:pl-3 ltr:border-r-2 rtl:border-l-2 border-gray-500 text-2xl rtl:ml-3 ltr:mr-3"></i>
                <div>
                  <span className='font-medium'>{t('Get it on')}</span><br />
                  <span className='font-bold'>{t('Google Play')}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* hidden md:block */}
        <div className="absolute left-0 ltr:lg:mr-16 ltr:sm:mr-6 rtl:lg:ml-16 rtl:sm:ml-4 sm:top-8 top-96 ltr:mr-1">
          <img src={myCar} className='sm:w-[20%] w-[60%] ltr:ml-auto rtl:mr-auto sm:m-0 m-auto rounded-3xl' alt="" />
        </div>
      </div>
    </div>)
}
