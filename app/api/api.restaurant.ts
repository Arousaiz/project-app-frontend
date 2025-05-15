import { instance } from "./api.config";

export class RestaurantQuery {
  offset: string = "0";
  limit: string = "10";
  city: string = "Hrodna";
  constructor(params: { [k: string]: string }) {
    if (params?.offset) this.offset = params.offset;
    if (params?.limit) this.limit = params.limit;
  }
}

export const RestaurantService = {
  fetchRestaurants(query: RestaurantQuery) {
    return instance
      .get(
        `/restaurants/city?limit=${query.limit}&offset=${query.offset}&city=${query.city}`
      )
      .then((res) => res.data.data);
  },

  searchRestaurants(city: string, name: string) {
    return instance
      .get(`/restaurants/search?city=${city}&name=${name}`)
      .then((res) => res.data.data);
  },

  findPromotions(city: string) {
    return instance
      .get(`/promotions?city=${city}`)
      .then((res) => res.data.data);
  },

  findRestaurant(id: string) {
    return instance.get(`/restaurants/info/${id}`).then((res) => res.data.data);
  },
};
