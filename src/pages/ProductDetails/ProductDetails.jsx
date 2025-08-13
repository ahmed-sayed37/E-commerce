import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import ProductCard from "../../component/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import useGetApis from "../../Hooks/useGetApis";
import { cartContext } from "../../Context/CartContext";
import { FavoritesContext } from "../../Context/FavoritesContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addProductToCart } = useContext(cartContext);
  const { addToFavorites, isFavorite, removeFromFavorites } = useContext(FavoritesContext);

  const { data, isLoading, isError, error } = useGetApis(`products/${id}`);

  useEffect(() => {
    if (data?.data?.data?.images && data.data.data.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          (prev + 1) % data.data.data.images.length
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [data?.data?.data?.images]);

  const { data: allProducts, isLoading: allProductsLoading } = useGetApis('products');

  useEffect(() => {
    if (data?.data?.data && allProducts?.data?.data) {
      const currentProduct = data.data.data;
      const categoryId = currentProduct.category._id;
      
      let relatedProducts = allProducts.data.data.filter(product => 
        product.category._id === categoryId && product._id !== currentProduct._id
      );
      
      relatedProducts = relatedProducts.sort((a, b) => {
        if (b.ratingsAverage !== a.ratingsAverage) {
          return b.ratingsAverage - a.ratingsAverage;
        }
        return a.price - b.price;
      });
      
      setRelated(relatedProducts.slice(0, 8)); 
      setRelatedLoading(false);
    }
  }, [data, allProducts]);

  const handleBuyNow = async () => {
    if (data?.data?.data) {
      try {
        await addProductToCart(data.data.data._id);
        setTimeout(() => {
          navigate("/Cart");
        }, 1000);
      } catch (error) {
        toast.error("حدث خطأ في إضافة المنتج للكارت");
      }
    }
  };

  const handleAddToCart = () => {
    if (data?.data?.data) {
      addProductToCart(data.data.data._id);
    }
  };

  const handleFavoriteToggle = () => {
    if (data?.data?.data) {
      if (isFavorite(data.data.data._id)) {
        removeFromFavorites(data.data.data._id);
        toast("تم إزالة المنتج من المفضلة", { icon: "🗑️" });
      } else {
        addToFavorites(data.data.data);
        toast.success("تم إضافة المنتج للمنتجات المفضلة بنجاح");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container pt-6 mx-auto bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/3 p-4 relative">
            <div className="h-80 bg-gray-200"></div>
            <div className="absolute top-2 right-2 h-6 w-6"></div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="h-16 bg-gray-200"></div>
              <div className="h-16 bg-gray-200"></div>
              <div className="h-16 bg-gray-200"></div>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="h-6 bg-gray-200 w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 w-full mb-4"></div>
            <div className="h-4 bg-gray-200 w-1/4 mb-4"></div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="h-8 bg-gray-200 w-1/4 mr-2 inline-block"></div>
                <div className="h-4 bg-gray-200 w-1/4 inline-block"></div>
              </div>
              <div className="h-4 bg-gray-200 w-1/6"></div>
            </div>
            <div className="h-4 bg-gray-200 w-1/4 mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-10 bg-gray-200 w-full"></div>
              <div className="h-10 bg-gray-200 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container pt-6 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="w-full lg:w-1/3 p-4 relative">
            <div className=" ">
              <img
                className="max-h-60 sm:max-h-80 object-contain mx-auto transition-all duration-500"
                src={data?.data?.data?.images?.[currentImageIndex] || data?.data?.data?.imageCover}
                alt={data?.data?.data?.title}
              />
              <button 
                onClick={handleFavoriteToggle}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill={isFavorite(data?.data?.data?._id) ? "red" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <Swiper
                spaceBetween={10}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {data?.data?.data?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={image} 
                      alt="" 
                      className={`w-full h-16 sm:h-20 object-cover rounded cursor-pointer transition-all duration-300 ${
                        currentImageIndex === index ? 'ring-2 ring-green-500 scale-105' : 'hover:scale-105'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Image Indicators */}
              {data?.data?.data?.images && data.data.data.images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {data.data.data.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/3 p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {data?.data.data.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              {" "}
              {data?.data.data.description}
            </p>
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white text-xs sm:text-sm font-semibold px-2 py-0.5 rounded">
                {data?.data.data.ratingsAverage} ★
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-2">
                {data?.data.data.ratingsQuantity}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${data?.data.data.price}
                </span>
                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-500 line-through">
                  ${data?.data.data.price + 300}
                </span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
                {data?.data.data.discount}
              </span>
            </div>
            <p className="text-green-600 text-xs sm:text-sm font-semibold mb-4">
              free shipping
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-mainColor hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 text-sm sm:text-base"
              >
                Buy Now
              </button>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 text-sm sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="w-full my-4 sm:my-6">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">Related Products</h3>
        <div className="w-1/4 h-1 bg-mainColor mb-2"></div>
        {relatedLoading || allProductsLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : related && related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {related.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-red-600 text-2xl sm:text-4xl text-center">
            No related products found.
          </p>
        )}
      </div>
    </>
  );
}
