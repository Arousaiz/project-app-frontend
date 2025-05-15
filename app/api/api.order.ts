import type { CreateOrder, Order } from "~/types/order";
import { instance } from "./api.config";

export const OrderService = {
  fetchOrders(token: string) {
    return instance
      .get("/profile/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  createOrder(order: CreateOrder, token: string) {
    return instance
      .post(`/orders`, order, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  cancelOrder(id: string, token: string) {
    return instance
      .post(`/profile/${id}/cancel`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};
