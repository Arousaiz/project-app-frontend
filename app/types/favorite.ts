import type { MenuItem } from "./menuItem";
import type { Restaurant } from "./restaurant";

export type Favorites = {
  id: string;
  createdAt: Date;
  menuItem: MenuItem;
  restaurant: Restaurant;
};
