import { requireAuthCookie } from "~/services/session.server";
import type { Route } from "../+types/root";
import { FavoritesService } from "~/api/api.favorites";
import type { CreateOrder } from "~/types/order";
import { OrderService } from "~/api/api.order";

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);

  const res: CreateOrder = await request.json();

  const order = await OrderService.createOrder(res, token).catch((err) =>
    console.log(err)
  );

  console.log(order);

  return { order };
}
