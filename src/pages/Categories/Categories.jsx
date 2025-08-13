import React from 'react'
import useGetApis from '../../Hooks/useGetApis';
import Loader from '../../component/Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  var {data, isLoading, isFetching, isError, error, refetch} = useGetApis('categories');
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="min-h-52 flex justify-center items-center w-full">
        <Loader/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl text-red-500">Error loading categories</h3>
      </div>
    );
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
        Shop by category
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
        {data?.data?.data?.map((category) => (
          <div 
            key={category._id} 
            className="relative group cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <div className="bg-white h-70 rounded-lg shadow-lg overflow-hidden  transition-shadow duration-300 hover:shadow-xl hover:scale-105 transition-transform duration-300">
              {/* Category Image - Fixed Height */}
              <div className="relative h-50 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Out of Stock Banner */}
                {category.productsCount === 0 && (
                  <div className="absolute inset-0 bg-red-500 bg-opacity-90 flex items-center justify-center">
                    <span className="text-white font-bold text-lg px-2 py-1 bg-red-600 rounded">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>
              
              {/* Category Info - Fixed Height */}
              <div className="p-4 h-20 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-first mb-1 line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-sm text-first">
                  {category.productsCount} products
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
