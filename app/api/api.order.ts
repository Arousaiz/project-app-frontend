import type { CreateOrder, Order } from "~/types/order";
import { instance } from "./api.config";

export const OrderService = {
  fetchOrders() {
    return instance.get("/profile/orders").then((res) => res.data);
  },

  createOrder(order: CreateOrder) {
    return instance.post(`/orders`, order).then((res) => res.data);
  },

  cancelOrder(id: string) {
    return instance.post(`/profile/${id}/cancel`).then((res) => res.data);
  },
};
