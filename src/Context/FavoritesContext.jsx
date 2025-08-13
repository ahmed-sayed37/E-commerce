import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem("favorites");
    return favs ? JSON.parse(favs) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(product) {
    if (!favorites.find((item) => item._id === product._id)) {
      setFavorites([...favorites, product]);
    }
  }

  function removeFromFavorites(productId) {
    setFavorites(favorites.filter((item) => item._id !== productId));
  }

  function isFavorite(productId) {
    return favorites.some((item) => item._id === productId);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
} 