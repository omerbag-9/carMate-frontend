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
  
  const [selectedOption, setSelectedOption] = useState('Categories');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [products, setProducts] = useState([]); // Products for current page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Products per page

  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const language = cookies.get('i18next') || 'en';
  
  // Fetch categories from API
  const getCategories = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.get('https://fb-m90x.onrender.com/seller/getCategories');
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

  // Fetch all products from API without filtering
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      let url = 'https://fb-m90x.onrender.com/seller/getProducts';
      
      // Only add pagination parameters
      const params = new URLSearchParams();
      params.append('page', 1);
      params.append('size', 1000); // Get a large number of products to filter client-side

      url += `?${params.toString()}`;
      
      const response = await axios.get(url);

      if (response.data) {
        setAllProducts(response.data.data || []);
        setTotalCount(response.data.count || 0);
        
        // Initially apply any filters
        applyFilters(response.data.data || [], selectedOption, selectedSubcategory, searchTerm);
      } else {
        setAllProducts([]);
        setFilteredProducts([]);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setAllProducts([]);
      setFilteredProducts([]);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  // Apply all filters and pagination
  const applyFilters = (productsList, category, subcategory, search) => {
    let filtered = [...productsList];
    
    // Filter by category
    if (category && category !== 'Categories') {
      const selectedCat = categories.find(cat => cat.name === category);
      if (selectedCat) {
        filtered = filtered.filter(product => {
          // Check if Subcategory exists and if its category matches our selected category
          return product.Subcategory && product.Subcategory.category && 
                 product.Subcategory.category.id === selectedCat.id;
        });
      }
    }
    
    // Filter by subcategory
    if (subcategory && subcategory !== 'All') {
      const selectedSub = subcategories.find(sub => sub.name === subcategory);
      if (selectedSub) {
        filtered = filtered.filter(product => {
          return product.Subcategory && product.Subcategory.id === selectedSub.id;
        });
      }
    }
    
    // Filter by search term - now supports both Arabic and English titles
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product =>
        (product.title || '').toLowerCase().includes(searchLower) ||
        (product.arabicTitle || '').toLowerCase().includes(searchLower) ||
        (product.description || '').toLowerCase().includes(searchLower) ||
        (product.arabicDescription || '').toLowerCase().includes(searchLower)
      );
    }
    
    // Update total count and pages
    setFilteredProducts(filtered);
    setTotalCount(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filtered.slice(startIndex, startIndex + itemsPerPage);
    setProducts(paginatedProducts);
  };

  // Handle when filters or pagination change
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters(allProducts, selectedOption, selectedSubcategory, searchTerm);
    }
  }, [selectedOption, selectedSubcategory, searchTerm, currentPage, categories]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

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
                  {products.map((product) => (
                    <div key={product.id} className="product embla__slide overflow-hidden relative">
                      <div className="card w-full mx-auto">
                        <img className="w-full h-[300px] object-cover" src={product.mainImage} alt={product.title} />
                        <div className="absolute bottom-0 left-0 top-0 w-full bg-black bg-opacity-40 text-white text-center p-2 z-50 text-start pt-36 sm:pt-28 md:pt-32 lg:pt-[100px]">
                          <div className="absolute left-0 bottom-2.5 w-full px-2">
                            <h3 className="text-lg md:text-xl">{language === 'en' ? product.title : product.arabicTitle || product.title}</h3>
                            <p className="text-sm font-normal line-clamp-3">{language === 'en' ? product.description : product.arabicDescription}</p>
                            <div className="flex justify-around items-center mt-2 gap-2">
                              <div className="flex-1">
                                <span className="bg-slate-100 rounded-lg text-[#086302] text-xl w-full h-10 px-2 text-center flex items-center justify-center truncate">
                                  ${product.price}
                                </span>
                              </div>
                              <div className="flex-1">
                                <Link to={`/moredetails/${product.id}`} className="block w-full">
                                  <button className="bg-slate-100 rounded-lg text-black text-sm h-10 w-full px-2 flex items-center justify-center truncate">
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

                {products.length === 0 && (
                  <div className="flex items-center justify-center h-full mx-auto ml-7 ltr:ml-7 rtl:mx-[32rem] text-center">
                    <p className="text-xl">
                      {searchTerm || selectedOption !== 'Categories' ? t('noproductsavailable') : t('loading')}
                    </p>
                  </div>
                )}

                {filteredProducts.length > 0 && (
                  <div className="w-full flex justify-center my-5">
                    <div className="pagination-container flex items-center justify-center gap-1 w-auto">
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="px-2 py-1 embla__button embla__button--prev"
                      >
                        <i className="fa-solid fa-chevron-left ltr:rotate-0 rtl:rotate-180"></i>
                      </button>

                      <div className="embla__controls flex justify-center items-center">
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
                        className="px-2 py-1 embla__button embla__button--next"
                      >
                        <i className="fa-solid fa-chevron-right ltr:rotate-0 rtl:rotate-180"></i>
                      </button>
                    </div>
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