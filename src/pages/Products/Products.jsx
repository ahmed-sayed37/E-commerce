import React, { use, useEffect, useState } from "react";
import ProductCard from "../../component/ProductCard/ProductCard";
import Loader from "../../component/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useGetApis from "../../Hooks/useGetApis";

export default function Products({}) {
let [searchTerm, setSearchTerm] = useState("");
let [filteredProducts, setFilteredProducts] = useState([]);
let [selectedFilter, setSelectedFilter] = useState("all");
let [showFilterDropdown, setShowFilterDropdown] = useState(false);
let [currentPage, setCurrentPage] = useState(1);

const navigate = useNavigate();
const { categoryId, brandId } = useParams();

// Get products with category or brand filter and pagination
const getEndpoint = () => {
  let endpoint = 'products';
  const params = new URLSearchParams();
  
  if (categoryId) {
    params.append('category[in]', categoryId);
  }
  if (brandId) {
    params.append('brand[in]', brandId);
  }
  
  params.append('page', currentPage);
  params.append('limit', 40); 

  const queryString = params.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

const { data, isLoading, isError, error, refetch } = useGetApis(getEndpoint());

useEffect(() => {
  refetch();
}, [currentPage, categoryId, brandId]);

const { data: categoryData } = useGetApis('categories');
const { data: brandData } = useGetApis('brands');

useEffect(() => {
  if (data?.data?.data) {
    setFilteredProducts(data.data.data);
    filterProducts(searchTerm, selectedFilter, data.data.data);
  }
}, [data]);

const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  
  if (value.length > 0) {

    filterProducts(value, selectedFilter, data?.data?.data || []);
  } else {

    filterProducts("", selectedFilter, data?.data?.data || []);
  }
};

const handleFilterChange = (filter) => {
  setSelectedFilter(filter);
  setShowFilterDropdown(false);
  filterProducts(searchTerm, filter, data?.data?.data || []);
};

const filterProducts = (search, filter, products) => {
  let filtered = products;

  if (search) {
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter !== "all" && !categoryId && !brandId) {
    filtered = filtered.filter(item => item.category.name === filter);
  }

  setFilteredProducts(filtered);
};

const getCategories = () => {
  if (categoryId || brandId) return [];
  const products = data?.data?.data || [];
  const categories = [...new Set(products.map(item => item.category.name))];
  return categories;
};

const getFilterName = () => {
  if (categoryId && categoryData?.data?.data) {
    const category = categoryData.data.data.find(cat => cat._id === categoryId);
    return category?.name || '';
  }
  if (brandId && brandData?.data?.data) {
    const brand = brandData.data.data.find(brand => brand._id === brandId);
    return brand?.name || '';
  }
  return '';
};

const getFilterType = () => {
  if (categoryId) return 'category';
  if (brandId) return 'brand';
  return '';
};

const handleBackClick = () => {
  navigate(-1);
};

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

return (
  <div>
    <div className="container p-4 sm:p-8">
      {/* Category/Brand Header */}
      {(categoryId || brandId) && (
        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {getFilterName()}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Browse all products in this {getFilterType()}
          </p>
        </div>
      )}

      {/* Search and Filter Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={handleBackClick}
            className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="flex-1 relative w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 sm:py-3 bg-white rounded-4xl pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Dropdown */}
          {!categoryId && !brandId && (
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                  <div className="py-1">
                    <div
                      onClick={() => handleFilterChange("all")}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedFilter === "all" ? "bg-green-50 text-green-600" : ""}`}
                    >
                      All Categories
                    </div>
                    {getCategories().map((category, index) => (
                      <div
                        key={index}
                        onClick={() => handleFilterChange(category)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedFilter === category ? "bg-green-50 text-green-600" : ""}`}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="min-h-52 flex justify-center items-center w-full">
          <Loader/>
        </div>
      ) : isError ? (
        <h3 className="text-2xl sm:text-4xl lg:text-6xl text-red-500 text-center p-4 sm:p-8">
          there are no products
        </h3>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="mb-4 sm:mb-6">
            <svg className="mx-auto h-16 w-16 sm:h-24 sm:w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            {(categoryId || brandId) ? `No products found in ${getFilterName()}` : 'No products found'}
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            {(categoryId || brandId) 
              ? `This ${getFilterType()} is currently empty. Check back later for new products!`
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
          {(categoryId || brandId) && (
            <button
              onClick={() => navigate(categoryId ? '/Categories' : '/Brands')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              Browse Other {categoryId ? 'Categories' : 'Brands'}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} item={item}/>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && data?.data?.metadata && (
        <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8 flex-wrap">
          {[...Array(data.data.metadata.numberOfPages)]
          .map((item, index)=>(
            <button 
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn cursor-pointer p-2 sm:p-3 rounded-2xl text-white text-sm sm:text-base transition-all duration-300 ${
                currentPage === index + 1 
                  ? 'bg-mainColor shadow-lg scale-105' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
