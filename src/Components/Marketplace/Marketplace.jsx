import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UnderLine from '../UnderLine/UnderLine';
import img1 from '../../assets/images/image60.png';
import img2 from '../../assets/images/image58.png';
import img3 from '../../assets/images/image55.png';
import img4 from '../../assets/images/img22.png';
import img5 from '../../assets/images/Image.png';
import img6 from '../../assets/images/img44.png';
import cookies from 'js-cookie'
const images = [img1, img2, img3, img4, img5, img6];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterProducts(value);
  };

  const [selectedOption, setSelectedOption] = useState('Categories');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Flexible number of products per page

  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const language = cookies.get('i18next') || 'en';
  
  // Fetch categories from API
  const getCategories = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.get('https://fb-m90x.onrender.com/seller/getCategories');
      console.log(data.data.catrgory_with_subCat);
      setCategories(data?.data?.catrgory_with_subCat);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]); // Handle errors gracefully
    } finally {
      setIsLoading(false);
    }
  };

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedOption && selectedOption !== 'Categories') {
      const category = categories.find(cat => cat.name === selectedOption);
      if (category && category.subcategories && category.subcategories.length > 0) {
        setSubcategories(category.subcategories);
      } else {
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
    setSelectedSubcategory('All');
    // Reset to page 1 when changing category
    setCurrentPage(1);
  }, [selectedOption, categories]);

  // Fetch products from API
  const getProducts = async () => {
    setIsLoading(true);
    try {
      let url = 'https://fb-m90x.onrender.com/seller/getProducts';
      const params = new URLSearchParams();

      // Add pagination parameters
      params.append('page', currentPage);
      params.append('size', pageSize);

      // Add category filter if selected
      if (selectedOption && selectedOption !== 'Categories') {
        const selectedCategory = categories.find(
          category => category.name === selectedOption
        );
        if (selectedCategory) {
          params.append('categoryId', selectedCategory.id);
          
          // Add subcategory filter if selected
          if (selectedSubcategory && selectedSubcategory !== 'All') {
            const selectedSubcat = selectedCategory.subcategories.find(
              subcat => subcat.name === selectedSubcategory
            );
            if (selectedSubcat) {
              params.append('subcategoryId', selectedSubcat.id);
            }
          }
        }
      }

      url += `?${params.toString()}`;
      console.log('Fetching products from URL:', url);

      const response = await axios.get(url);
      console.log('Products Response:', response.data);

      if (response.data) {
        setProducts(response.data.data || []);
        setTotalCount(response.data.count || 0);
        setTotalPages(Math.ceil((response.data.count || 0) / pageSize) || 1);
        setFilteredProducts(response.data.data || []);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [currentPage, selectedOption, selectedSubcategory]);

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedOption(e.target.value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Handle subcategory change
  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    setCurrentPage(1); // Reset to first page when changing subcategory
  };

  // Add a new function to handle filtering
  const filterProducts = (searchValue) => {
    if (!searchValue.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      (product.title || '').toLowerCase().includes(searchValue.toLowerCase()) ||
      (product.description || '').toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Reset search when products change
  useEffect(() => {
    if (searchTerm) {
      filterProducts(searchTerm);
    } else {
      setFilteredProducts(products);
    }
  }, [products]);

  // Update pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Custom dropdown styles for RTL support
  const getSelectStyles = () => {
    return {
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")',
      backgroundPosition: isArabic ? 'left 0.5rem center' : 'right 0.5rem center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1.5em 1.5em',
      paddingRight: isArabic ? '0.75rem' : '2rem',
      paddingLeft: isArabic ? '2rem' : '0.75rem',
      textAlign: isArabic ? 'right' : 'left'
    };
  };

  return (
    <div className="marketplace">
      <div className="container mx-auto">
        <div className="flex-wrap justify-center justify-items-center">
          {/* Title Section */}
          <div className="market-title lg:w-1/4 sm:w-1/2 text-center my-10 mt-28">
            <h1 className="mx-auto font-bold text-2xl ">
              {t('marketplaceTitle')}
              <div className="w-1/2 mx-auto">
                <UnderLine />
              </div>
            </h1>
            <p className="mx-5 ">{t('marketplaceDescription')}</p>
          </div>

          {/* Search and Filter Section - All in one line */}
          <div className="flex mb-7 flex-wrap lg:w-[90%] sm:w-full justify-center justify-items-center">
            <div className="search flex mt-3 mb-7 w-full justify-center items-center">
              {/* All three components in one row */}
              <div className="flex flex-row w-full max-w-4xl justify-center items-center space-x-2">
                {/* Search Bar - LARGER */}
                <div className="w-[60%] relative" dir={isArabic ? 'rtl' : 'ltr'}>
                  <p className={`absolute ${isArabic ? 'right-2' : 'left-2'} top-2 text-black`}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </p>
                  <input
                    className={`w-full h-10 rounded-xl ${isArabic ? 'pr-8 pl-2 text-right' : 'pl-8 pr-2 text-left'} text-black`}
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={handleChange}
                    dir={isArabic ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Category Dropdown - SMALLER with custom styling for arrow */}
                <div className="w-[20%] relative">
                  <select
                    className="w-full h-10 rounded-xl text-sm font-semibold text-black"
                    value={selectedOption}
                    onChange={handleCategoryChange}
                    disabled={isLoading}
                    dir={isArabic ? 'rtl' : 'ltr'}
                    style={getSelectStyles()}
                  >
                    <option value="Categories">{t('categories')}</option>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.name}
                        >
                          {language === 'en'
                            ? (category.name)
                            : (category.arabicName || category.name)}
                        </option>
                      ))
                    ) : (
                      <option disabled>{isLoading ? t('loading') : t('noCategories')}</option>
                    )}
                  </select>
                </div>
                
                {/* Subcategory Dropdown - SMALLER with custom styling for arrow */}
                <div className="w-[20%] relative">
                  <select
                    className="w-full h-10 rounded-xl text-sm font-semibold text-black"
                    value={selectedSubcategory}
                    onChange={handleSubcategoryChange}
                    disabled={isLoading || selectedOption === 'Categories' || subcategories.length === 0}
                    dir={isArabic ? 'rtl' : 'ltr'}
                    style={getSelectStyles()}
                  >
                    <option value="All">{t('allSubcategories') || 'All Subcategories'}</option>
                    {subcategories && subcategories.length > 0 ? (
                      subcategories.map((subcategory) => (
                        <option
                          key={subcategory.id}
                          value={subcategory.name}
                        >
                          {language === 'en'
                            ? (subcategory.name)
                            : (subcategory.arabicName || subcategory.name)}
                        </option>
                      ))
                    ) : null}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="text-center py-10 w-full">
                <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
                <p className="mt-2">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="embla_container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-2">
                  {filteredProducts.map((product) => (
                    <div key={product._id || product.id} className="product embla__slide overflow-hidden relative">
                      <div className="card w-full lg:w-[100%] mx-auto">
                        <img className="w-full h-[300px] object-cover" src={product.mainImage} alt={product.title} />
                        <div className="absolute bottom-0 left-0 top-0 w-full bg-black bg-opacity-40 text-white text-center p-2 z-50 text-start pt-36 lg:pt-[100px]">
                          <div className="absolute left-0 bottom-2.5 w-full px-2">
                            <h3>{language === 'en' ? product.title : product.arabicTitle || product.title}</h3>
                            <p className="text-sm font-normal line-clamp-3">{language === 'en' ? product.description : product.arabicDescription}</p>
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
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="flex items-center justify-center h-full mx-auto ml-7 ltr:ml-7 rtl:mx-[32rem] text-center">
                    <p className="text-xl">
                      {searchTerm ? t('noproductsavailable') : t('loading')}
                    </p>
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

                    <div className="embla__controls flex justify-center mt-4 mx-auto">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          className={`embla__dot mx-1 w-3 h-3 rounded-full ${index + 1 === currentPage ? "is-selected" : ""
                            }`}
                          onClick={() => goToPage(index + 1)}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}