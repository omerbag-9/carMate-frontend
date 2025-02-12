import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';

import img1 from '../../assets/images/image60.png';
import img2 from '../../assets/images/image58.png';
import img3 from '../../assets/images/image55.png';
import img4 from '../../assets/images/img22.png';
import img5 from '../../assets/images/image.png';
import img6 from '../../assets/images/img44.png';

const images = [img1, img2, img3, img4, img5, img6];

export default function Marketplace() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: 'start',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const handleChange = (event) => setSearchTerm(event.target.value);

  const [selectedOption, setSelectedOption] = useState('Categories');
  const categories = [t('carParts'), t('liquids'), t('carCare'), t('lighting'), t('accessories')];
  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const slides = images;

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const onSelect = () => emblaApi && setSelectedIndex(emblaApi.selectedScrollSnap());

  useEffect(() => {
    if (emblaApi) emblaApi.on('select', onSelect);
  }, [emblaApi]);

  return (
    <div className="container mx-auto">
      <div className="flex-wrap justify-center justify-items-center">
        <div className="market-title lg:w-1/4 sm:w-1/2 text-center my-10 mt-28">
          <h1 className="mx-auto font-bold text-2xl">
            {t('marketplaceTitle')}
            <div className="w-1/2 mx-auto">
              <UnderLine />
            </div>
          </h1>
          <p className="mx-5">{t('marketplaceDescription')}</p>
        </div>

  
        <div className="flex mt-28 mb-7 flex-wrap lg:w-[90%] sm:w-full justify-center justify-items-center">
      

        <div className="flex mt-20 mb-7 flex-wrap lg:w-[90%] sm:w-full justify-center justify-items-center">
          <div className="w-[80%] relative my-2" dir={isArabic ? 'rtl' : 'ltr'}>
            <p className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-2 text-black`}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </p>
            <input
              className={`w-full rounded-xl px-8 text-black ${isArabic ? 'text-right' : 'text-left'}`}
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={handleChange}
              dir={isArabic ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="list mx-2 my-2">
            <select
              className="rounded-xl px-11 font-semibold text-black"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="category">{t('categories')}</option>
              {categories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="embla overflow-hidden mb-20" ref={emblaRef}>
          <div className="embla_container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-2">
            {Array.from({ length: 9 }).map((_, index) => {
              const image = slides[index % slides.length]; // تكرار الصور عند الحاجة
              return (
                <div key={index} className="card embla__slide overflow-hidden relative">
                  <img className="w-full" src={image} alt="Product" />
                  <div className="absolute bottom-0 left-0 top-0 w-full bg-black bg-opacity-40 text-white text-center p-2 z-50 text-start pt-32">
                    <h3>{t('usedCarBodyTitle')}</h3>
                    <p className="text-sm font-normal line-clamp-3">{t('usedCarBodyDescription')}</p>
                    <div className="flex justify-around">
                      <span className="bg-slate-100 rounded-lg text-[#086302] text-[20px] w-28 h-10 text-center py-1 mt-2">
                        {t('price')}
                      </span>
                      <Link to="/Moredetails">
                        <button className="bg-slate-100 rounded-lg text-black text-[20px] ltr:px-11 rtl:px-5 py-1">
                          {t('moreDetailsbutton')}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="embla__controls py-10">
            <button className="embla__button embla__button--prev" onClick={scrollPrev}>
              <i className="fa-solid fa-chevron-left ltr:rotate-0 rtl:rotate-180"></i>
            </button>
            <div className="embla__dots">
              {slides.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot ${index === selectedIndex ? 'is-selected' : ''}`}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                ></button>
              ))}
            </div>
            <button className="embla__button embla__button--next" onClick={scrollNext}>
              <i className="fa-solid fa-chevron-right ltr:rotate-0 rtl:rotate-180"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
