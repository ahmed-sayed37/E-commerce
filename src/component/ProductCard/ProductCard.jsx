import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { FavoritesContext } from "../../Context/FavoritesContext";
import toast from "react-hot-toast";

export default function ProductCard({item}) {
  const image = item?.imageCover || (item?.images && item.images[0]);
  if (!item || !image) {
    return null;
  }

  const {addProductToCart} = useContext(cartContext);
  const { addToFavorites, isFavorite, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <>

      <article
        data-aos="fade-up"
        data-aos-duration="500"
        className="productCard group flex flex-col gap-2 sm:gap-3 shadow-xl rounded-md overflow-hidden"
      >
        <header className="relative">
          <img
            src={image}
            className="w-full h-48 sm:h-56 lg:h-64 object-cover"
            alt={item.title}
          />

          <div className="layer -translate-y-1/2 flex justify-center items-center gap-2 sm:gap-4 absolute top-1/2 left-1/2 -translate-x-1/2">
            {/* أيقونة القلب */}
            <div
              onClick={() => {
                if (isFavorite(item._id)) {
                  removeFromFavorites(item._id);
                  toast("تم إزالة المنتج من المفضلة", { icon: "🗑️" });
                } else {
                  addToFavorites(item);
                  toast.success("تم إضافة المنتج للمنتجات المفضلة بنجاح");
                }
              }}
              className={`icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer flex justify-center items-center size-8 sm:size-10 lg:size-12 bg-opacity-70 rounded-full text-white ${isFavorite(item._id) ? 'bg-red-500' : 'bg-gray-400 hover:bg-gray-600'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorite(item._id) ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 sm:size-7 lg:size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>

            <div
              onClick={() => {
                addProductToCart(item._id)
              }}
              className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-gray-400 hover:bg-gray-600 duration-700 cursor-pointer bg-primary flex justify-center items-center size-8 sm:size-10 lg:size-12 bg-opacity-70 rounded-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 sm:size-7 lg:size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>

            <Link
              to={`/productDetails/${item._id}`}
              className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 bg-gray-400 hover:bg-gray-600 duration-1000 cursor-pointer bg-primary flex justify-center items-center size-8 sm:size-10 lg:size-12 bg-opacity-70 rounded-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 sm:size-7 lg:size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </Link>
          </div>
        </header>
        <footer className="py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-5">
          <header>
            <h2 className="line-clamp-1 text-primary text-first text-sm sm:text-base">
              <Link
                className="hover:text-orange-500 duration-300"
                to={`/product/`}
              >
                {item.title}
              </Link>
            </h2>

            <h2 className="line-clamp-1 font-semibold my-1 text-first text-xs sm:text-sm">
              {item.category.name}
            </h2>
            <div className="text-gray-500 text-xs sm:text-sm">
              <span>{item.brand.name}</span>
              <span className="mx-1">|</span>
              <span className="text-green-500">Available</span>
            </div>
          </header>
          <footer className="flex justify-between mt-2 items-center">
            <span className="text-primary flex items-center text-first text-sm sm:text-base">${item.price}</span>
            <div className="rating flex gap-1 sm:gap-2 items-center">
              <span>
                <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm"></i>
              </span>
              <span className="text-first text-xs sm:text-sm">{item.ratingsAverage}</span>
            </div>
          </footer>
        </footer>
      </article>
    </>
  );
}