import React, { use, useEffect, useState } from "react";
import ProductCard from "../../component/ProductCard/ProductCard";
import Products from "../Products/Products";
import Loader from "../../component/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useGetApis from "../../Hooks/useGetApis";
import Brands from "../Brands/Brands";
import sliderImage1 from '../../assets/images/slider-image-1.jpeg'
import sliderImage2 from '../../assets/images/slider-image-2.jpeg'
import sliderImage3 from '../../assets/images/slider-image-3.jpeg'

export default function Home({ }) {
  var { data, isLoading, isFetching, isError, error, refetch } = useGetApis('products');

  var { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useGetApis('categories');

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);

  const heroSlides = [
    {
      image: sliderImage1,
      title: "FreshCart",
      description: "Whether you're looking for the freshest produce, pantry staples, or specialty items, FreshCart brings the supermarket to you, redefining the way you shop for groceries.",
      buttonText: "Get Started"
    },
    {
      image: sliderImage2,
      title: "Beauty & Health",
      description: "Discover premium beauty and health products that enhance your lifestyle and well-being.",
      buttonText: "Shop Now"
    },
    {
      image: sliderImage3,
      title: "BLACK FRIDAY",
      description: "Special offers and amazing deals on all your favorite products. Don't miss out!",
      buttonText: "View Deals"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const getCurrentCategories = () => {
    if (categoriesData?.data?.data) {
      const categories = categoriesData.data.data;
      const startIndex = currentCategorySlide;
      return categories.slice(startIndex, startIndex + 5);
    }
    return [];
  };

  const getTotalCategorySlides = () => {
    if (categoriesData?.data?.data) {
      return Math.max(0, categoriesData.data.data.length - 4); 
    }
    return 0;
  };

  const nextCategories = () => {
    const totalSlides = getTotalCategorySlides();
    if (totalSlides > 0 && currentCategorySlide < totalSlides) {
      setCurrentCategorySlide((prev) => prev + 1);
    }
  };

  const prevCategories = () => {
    if (currentCategorySlide > 0) {
      setCurrentCategorySlide((prev) => prev - 1);
    }
  };

  if (isLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center w-full">
        <Loader />
      </div>
    );
  }

  if (isError || categoriesError) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl text-red-500">Error loading home page</h3>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Panel - Large Image with Text Overlay */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl shadow-2xl h-64 sm:h-96 lg:h-128 transition-shadow duration-300 hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src={heroSlides[currentHeroSlide].image}
              alt="Fashion Collection"
              className="w-full h-full object-cover transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-opacity-40">
              <div className="text-black p-4 sm:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{heroSlides[currentHeroSlide].title}</h1>
                <p className="text-sm sm:text-lg mb-4 sm:mb-6 max-w-md hidden sm:block">
                  {heroSlides[currentHeroSlide].description}
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-lg transition-colors duration-300 text-sm sm:text-base">
                  {heroSlides[currentHeroSlide].buttonText}
                </button>
              </div>
            </div>
            
            {/* Hero Slider Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentHeroSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Right Panels */}
          <div className="space-y-4">
            {/* Top Right Panel - Beauty Products */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-32 sm:h-48 lg:h-62 cursor-pointer"
              onClick={() => setCurrentHeroSlide(1)}>
              <img
                src={sliderImage2}
                alt="Beauty & Health"
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Bottom Right Panel - Black Friday */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-32 sm:h-48 lg:h-62 cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:scale-105 transition-transform duration-300"
              onClick={() => setCurrentHeroSlide(2)}>
              <img
                src={sliderImage3}
                alt="Black Friday Deals"
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center p-3 sm:p-5 mb-4 sm:mb-8 text-first">Shop now by popular categories</h2>
        
        {/* Categories Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          {categoriesData?.data?.data && categoriesData.data.data.length > 5 && (
            <>
              <button
                onClick={prevCategories}
                disabled={currentCategorySlide === 0}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-1 sm:p-2 shadow-lg transition-all duration-300 ${
                  currentCategorySlide === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-white hover:bg-gray-100 text-gray-800'
                }`}
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextCategories}
                disabled={currentCategorySlide >= getTotalCategorySlides()}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-1 sm:p-2 shadow-lg transition-all duration-300 ${
                  currentCategorySlide >= getTotalCategorySlides()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-white hover:bg-gray-100 text-gray-800'
                }`}
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 px-4 sm:px-8">
            {getCurrentCategories().map((category) => (
              <div key={category._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="h-32 sm:h-48 lg:h-70 bg-gray-100 overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-2 sm:p-3 text-center">
                  <h3 className="font-semibold text-first text-xs sm:text-sm">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Categories Slider Dots - Removed as it's not suitable for single category navigation */}
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center p-3 sm:p-5 mb-4 sm:mb-8 text-first">Shop now by popular products</h2>
        
        {data?.data?.data && data.data.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {data.data.data.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-500">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
