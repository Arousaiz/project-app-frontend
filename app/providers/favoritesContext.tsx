import React, { createContext, useContext, useState } from "react";

type FavoritesContextType = {
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
  initialFavorites = [],
}: {
  children: React.ReactNode;
  initialFavorites?: string[];
}) => {
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);

  const addToFavorites = (id: string) =>
    setFavorites((prev) => [...new Set([...prev, id])]);

  const removeFromFavorites = (id: string) =>
    setFavorites((prev) => prev.filter((favId) => favId !== id));

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
};
