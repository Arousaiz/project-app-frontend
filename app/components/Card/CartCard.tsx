import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import PrimaryButtonWithIcon from "../Buttons/PrimaryButtonWithIcon";
import CounterButton from "../Buttons/CounterButton";
import { useCart } from "~/providers/cartContext";
import CartItem from "./cartitem";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Cart({ open }: { open: boolean }) {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCart();
  const [sum, setSum] = useState<number>();
  const navigate = useNavigate();
  const params = useParams();
  const goToCheckout = () => {
    navigate(`/order`, { state: { id: params.id } });
  };
  useEffect(() => {
    setSum(getTotalPrice);
  }, [cart]);
  return (
    <div
      className={`${
        open ? "fixed " : "hidden "
      } bg-gray-200 dark:bg-gray-900 z-100 h-dvh w-96 rounded-xl mb-4 flex flex-col absolute right-0 top-0 transition-all shadow-md border border-gray-600/5 dark:border-gray-200/10`}
    >
      <div className="flex justify-between w-full rounded-t-xl bg-gray-100 dark:bg-gray-950 p-3">
        <p className="text-3xl mt-4 mx-4">Cart</p>
        <div className="mt-4 mr-4">
          <ButtonWithIcon
            onSubmit={() => clearCart()}
            Icon={<TrashIcon className="size-8 p-1" />}
          ></ButtonWithIcon>
        </div>
      </div>
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center mx-4 h-full p-6">
          <p className="text-3xl">Cart is empty</p>
          <img src="/app/assets/empty_cart.png"></img>
        </div>
      ) : (
        <div className="h-9/12">
          <div className="mx-4 p-6 overflow-auto h-full">
            {cart.map((item) => (
              <CartItem
                name={item.name}
                price={item.price}
                count={item.count}
                minusClick={() => decreaseQuantity(item.id)}
                plusClick={() => increaseQuantity(item.id)}
                deleteFromCart={() => removeFromCart(item.id)}
              ></CartItem>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col justify-between bg-gray-100 dark:bg-gray-950 rounded-b-xl p-6 w-full">
        <p className="text-2xl mb-4 mx-4">{sum + "p"}</p>
        <PrimaryButtonWithIcon
          onSubmit={() => goToCheckout()}
          label={"Continue"}
          icon={<ArrowRightIcon className="size-8 p-1" />}
        ></PrimaryButtonWithIcon>
      </div>
    </div>
  );
}
