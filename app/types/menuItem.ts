import type { Category } from "./category";
import type { Restaurant } from "./restaurant";
import type { Review } from "./review";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
};

export type MenuItemInfo = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  reviews: Review[];
};

export type MenuItemPromo = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  restaurant?: Restaurant;
};
