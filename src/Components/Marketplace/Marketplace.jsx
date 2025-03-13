import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';




export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const handleChange = (event) => setSearchTerm(event.target.value);

  const [selectedOption, setSelectedOption] = useState('Categories');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Flexible number of products per page

  // Fetch categories from API
  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://fb-m90x.onrender.com/seller/getCategories`);
      console.log('API Response:', response.data); // Debug log
      
      if (response.data && response.data.data && response.data.data.categories) {
        const categoriesData = response.data.data.categories; // Correct path to categories
        console.log('Categories Data:', categoriesData); // Debug log
        setCategories(categoriesData);
      } else {
        console.error('Invalid API response structure:', response.data);
        setCategories([]); // Handle invalid structure gracefully
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]); // Handle errors gracefully
    } finally {
      setIsLoading(false);
    }
  };

  // Update the getProducts function
  const getProducts = async () => {
    setIsLoading(true);
    try {
      let url = "https://fb-m90x.onrender.com/seller/getProducts";
      if (selectedOption !== "Categories") {
        url = `https://fb-m90x.onrender.com/seller/getProducts/${selectedOption}`;
      }

      const response = await axios.get(url);
      console.log("Products Response:", response.data);

      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        console.error("Invalid response structure:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedOption]);

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    !searchTerm ||
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  // Ensure current page is within range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredProducts.length, totalPages]);

  // Get the products for the current page
  const getDisplayedProducts = () => {
    if (filteredProducts.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  const displayedProducts = getDisplayedProducts();

  // Pagination controls
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleOptionChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedOption(selectedCategoryId);
    setSearchTerm('');
    console.log('Selected category ID:', selectedCategoryId);
  };

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

        <div className="flex mb-7 flex-wrap lg:w-[90%] sm:w-full justify-center justify-items-center">
          <div className="search flex mt-3 mb-7 flex-wrap sm:w-full justify-center justify-items-center">
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
                disabled={isLoading}
              >
                <option value="Categories">{t('categories')}</option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name || category.categoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>{isLoading ? t('loading') : t('noCategories')}</option>
                )}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="embla_container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-2">
            {displayedProducts.map((product) => (
              <div key={product._id || product.id} className="product embla__slide overflow-hidden relative">
                <div className="card w-full lg:w-[85%] mx-auto">
                  <img className="w-full h-[300px] object-cover" src={product.mainImage} alt={product.title} />
                  <div className="absolute bottom-0 left-0 top-0 w-full bg-black bg-opacity-40 text-white text-center p-2 z-50 text-start pt-36 lg:pt-[100px]">
                    <h3>{product.title}</h3>
                    <p className="text-sm font-normal line-clamp-3">{product.description}</p>
                    <div className="flex justify-around">
                      <div>
                        <span className="bg-slate-100 rounded-lg text-[#086302] text-[20px] w-32 h-10 px-6 lg:px-3 text-center py-[6px] mt-2">
                          ${product.price}
                        </span>
                      </div>
                      <div>
                        <Link to={`/moredetails/${product._id || product.id}`}>
                          <button className="bg-slate-100 rounded-lg text-black text-[20px] ltr:px-11 rtl:px-5 py-1">
                            {t("moreDetailsbutton")}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">{t('noProductsFound')}</p>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="flex justify-center my-5">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 embla__button embla__button--prev"
              >
                <i className="fa-solid fa-chevron-left ltr:rotate-0 rtl:rotate-180"></i>
              </button>

              <div className="embla__controls flex justify-center mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`embla__dot mx-1 w-3 h-3 rounded-full ${
                      index + 1 === currentPage ? "is-selected" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  ></button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 embla__button embla__button--next"
              >
                <i className="fa-solid fa-chevron-right ltr:rotate-0 rtl:rotate-180"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



