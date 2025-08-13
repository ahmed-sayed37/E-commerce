import React, { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoritesContext";
import ProductCard from "../../component/ProductCard/ProductCard";

export default function Favorites() {
  const { favorites, clearFavorites } = useContext(FavoritesContext);

  return (
    <div className="container p-8 relative">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-3xl text-center font-bold mb-6">Your Favorites Products</h2>
        
      </div>
      {favorites.length > 0 && (
          <button onClick={clearFavorites} className="bg-red-200 text-red-700 px-4 py-2 rounded hover:bg-red-400 hover:text-white font-bold absolute top-20 right-8">
            Delete All
          </button>
        )}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No Favorites Products yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10 mt-10">
          {favorites.map((item) => (
            <ProductCard item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
} 