import React from 'react'
import useGetApis from '../../Hooks/useGetApis';
import Loader from '../../component/Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function Brands() {
  const {data, isLoading, isFetching, isError, error, refetch} = useGetApis('brands');
  const navigate = useNavigate();
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center w-full">
        <Loader/>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl text-red-500">Error loading brands</h3>
        <button 
          onClick={() => refetch()}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 text-center mb-6 sm:mb-8">
        Shop by Brand
      </h1>
      
      {data?.data?.data && data.data.data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {data.data.data.map((brand) => (
            <div 
              key={brand._id} 
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleBrandClick(brand._id)}
            >
              {/* Circular Brand Logo */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-105 transition-transform duration-300 border-2 border-gray-100 hover:border-green-300">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-30 lg:h-30 object-contain"
                />
              </div>
              <h3 className="mt-2 sm:mt-3 text-center font-semibold text-first group-hover:text-green-600 transition-colors duration-300 text-xs sm:text-sm lg:text-base">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm sm:text-base">No brands available at the moment.</p>
        </div>
      )}
      
      {/* Fetching indicator */}
      {isFetching && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg text-sm">
          Updating...
        </div>
      )}
    </div>
  );
}
