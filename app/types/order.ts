import type { Address } from "./address";
import type { MenuItem } from "./menuItem";
import type { Restaurant } from "./restaurant";
import type { User } from "./user";

export type Order = {
  id: string;
  price: number;
  discount: number;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  orderTime: Date;
  deliveryDetails: DeliveryDetails;
  orderItems: OrderItem[];
  user: User;
  restaurant: Restaurant;
};

export type CreateOrder = {
  userId: string;
  restaurantId: string;
  paymentMethod: PaymentMethod;
  deliveryDetails: CreateDeliveryDetails;
  orderItems: CreateOrderItem[];
};

export type CreateOrderItem = {
  menuItemId: string;
  price: number;
  count: number;
};

export type CreateDeliveryDetails = {
  deliveryTime: Date;
  address: Address;
};

export type DeliveryDetails = {
  id: string;
  deliveryStatus: DeliveryStatus;
  deliveryTime: Date;
  address: Address;
  order: Order;
};

export type OrderItem = {
  id: string;
  menuItemId: string;
  price: number;
  count: number;
  order: Order;
  menuItem: MenuItem;
};

export declare enum DeliveryStatus {
  AWAITING_CONFIRMATION = "awaiting confirmation",
  IN_TRANSIT = "in transit",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  RETURNED = "returned",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  ONLINE = "online",
}

export declare enum OrderStatus {
  PLACED = "placed",
  ACCEPTED = "accepted",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  RETURNED = "returned",
}
