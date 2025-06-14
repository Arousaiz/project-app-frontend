import { useEffect } from "react";
import {
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import OrderForm from "~/components/Forms/OrderForm";
import { useCart } from "~/providers/cartContext";
import type { Route } from "../+types/root";
import type { CreateOrder } from "~/types/order";
import { OrderService } from "~/api/api.order";
import { ProfileService } from "~/api/api.profile";
import CartItem from "~/components/Card/cartitem";
import { isNullOrUndefined } from "~/utils/utils";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export async function clientAction({ request }: Route.ActionArgs) {
  const res: CreateOrder = await request.json();

  const response = await OrderService.createOrder(res);

  if (!isNullOrUndefined(response)) {
    return redirect("/order/success");
  }

  return { response };
}

export default function PlaceOrderPage() {
  const { user } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  useEffect(() => {
    const isEmpty = Object.keys(cart.items).length === 0;
    if (isEmpty) {
      navigate("/restaurants");
    }
  }, [cart]);

  const itemsArray = Object.values(cart.items);
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1>Страница оформления заказа</h1>
      <h2 className="text-xl font-semibold">Ваш заказ</h2>
      <div className="grid gap-8 max-w-xl mx-auto my-4">
        {itemsArray.length > 0 ? (
          <div className="space-y-4">
            {itemsArray.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                count={item.count}
                minusClick={() => decreaseQuantity(item.id)}
                plusClick={() => increaseQuantity(item.id)}
                deleteFromCart={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Корзина пуста</p>
        )}
      </div>
      <div className="p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          Заполните данные для оформления заказа
        </h3>
        <OrderForm totalPrice={totalPrice} userId={user?.id!}></OrderForm>
      </div>
    </div>
  );
}
