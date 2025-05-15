import { useEffect } from "react";
import { useLoaderData, useLocation, useParams } from "react-router";
import OrderForm from "~/components/Forms/OrderForm";
import { useCart, type CartMenuItem } from "~/providers/cartContext";
import { fetchUser, requireAuthCookie } from "~/services/session.server";
import type { Route } from "../+types/root";
import type {
  CreateOrder,
  CreateOrderItem,
  PaymentMethod,
} from "~/types/order";
import type { Address } from "~/types/address";
import { OrderService } from "~/api/api.order";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await fetchUser(request);
  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);

  const res: CreateOrder = await request.json();

  const response = OrderService.createOrder(res, token).catch((error) =>
    console.log(error.data)
  );

  return { response };
}

export default function PlaceOrderPage() {
  const location = useLocation();
  const restaurantId = location.state?.id ?? "";
  const { user } = useLoaderData<typeof loader>();
  const cart = useCart();
  useEffect(() => {}, [location, cart]);
  return <OrderForm userId={user?.id!} restaurantId={restaurantId}></OrderForm>;
}
