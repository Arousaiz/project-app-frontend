import type { Favorites } from "~/types/favorite";
import { instance } from "./api.config";

export const FavoritesService = {
  fetchFavorites() {
    return instance
      .get("/user/favorites?limit=50&offset=0")
      .then((res) => res.data.data);
  },

  createFavorite({
    menuItemId,
    restaurantId,
  }: {
    menuItemId: string;
    restaurantId: string;
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
