import type { Address } from "./address";
import type { MenuItem, MenuItemInfo } from "./menuItem";

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  phone: string;
  rating: string;
  operatingHours: string;
  address: Address;
};

export type RestaurantInfo = {
  id: string;
  name: string;
  cuisine: string;
  phone: string;
  rating: string;
  operatingHours: string;
  address: Address;
  menuItems: MenuItemInfo[];
};
