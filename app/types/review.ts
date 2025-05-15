import type { MenuItem } from "./menuItem";
import type { User } from "./user";

export type Review = {
  id: string;
  text: string;
  rating: number;
  menuItem: MenuItem;
  user: User;
  createdAt: Date;
};
