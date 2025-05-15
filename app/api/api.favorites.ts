import type { Favorites } from "~/types/favorite";
import { instance } from "./api.config";

export const FavoritesService = {
  fetchFavorites(token: string) {
    return instance
      .get("/user/favorites?limit=50&offset=0", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);
  },

  createFavorite({
    menuItemId,
    restaurantId,
    token,
  }: {
    menuItemId: string;
    restaurantId: string;
    token: string;
  }) {
    return instance
      .post(
        `/user/favorites`,
        {
          menuItemId,
          restaurantId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => res.data);
  },

  deleteFavorite(id: string, token: string) {
    return instance
      .delete(`/user/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};
