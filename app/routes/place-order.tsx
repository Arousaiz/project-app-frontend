import { useEffect } from "react";
import { useLoaderData, useLocation } from "react-router";
import OrderForm from "~/components/Forms/OrderForm";
import { useCart } from "~/providers/cartContext";
import type { Route } from "../+types/root";
import type { CreateOrder } from "~/types/order";
import { OrderService } from "~/api/api.order";
import { ProfileService } from "~/api/api.profile";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export async function clientAction({ request }: Route.ActionArgs) {
  const res: CreateOrder = await request.json();

  const response = OrderService.createOrder(res);

  return { response };
}

export default function PlaceOrderPage() {
  const location = useLocation();
  const restaurantId = location.state?.id ?? "";
  const { user } = useLoaderData<typeof clientLoader>();
  const cart = useCart();
  useEffect(() => {}, [location, cart]);
  return <OrderForm userId={user?.id!} restaurantId={restaurantId}></OrderForm>;
}
