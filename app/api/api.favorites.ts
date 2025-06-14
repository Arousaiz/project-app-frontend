import type { Favorites } from "~/types/favorite";
import { instance } from "./api.config";
import axios from "axios";

export const FavoritesService = {
  fetchFavorites() {
    return axios
      .get("http://localhost:3000/user/favorites?limit=50&offset=0", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
        return [];
      });
  },

  createFavorite({
    menuItemId,
    restaurantId,
  }: {
    menuItemId: string;
    restaurantId?: string;
  }) {
    return instance
      .post(`/user/favorites`, {
        menuItemId,
        restaurantId,
      })
      .then((res) => res.data);
  },

  deleteFavorite(id: string) {
    return instance.delete(`/user/favorites/${id}`).then((res) => res.data);
  },
};
