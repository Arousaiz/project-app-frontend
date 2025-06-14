import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useCart } from "~/providers/cartContext";
import CartItem from "./cartitem";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PrimaryButton from "../ui/Buttons/PrimaryButton";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  const itemsArray = Object.values(cart.items);
  const totalCount = itemsArray.reduce((acc, item) => acc + item.count, 0);

  const goToCheckout = () => {
    navigate(`/order`);
  };

  const handleClearCart = () => {
    if (window.confirm("Вы уверены, что хотите очистить корзину?")) {
      clearCart();
    }
  };

  return (
    <div
      className={`lg:sticky lg:right-2 lg:top-2 lg:flex relative hidden z-100 h-dvh w-96 rounded-xl flex-col shadow-md border border-border transition-all duration-500 ease-in-out transform ${
        itemsArray.length === 0
          ? "opacity-50 scale-95"
          : "opacity-100 scale-100"
      }`}
    >
      {itemsArray.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-6 bg-muted text-muted-foreground w-full h-full rounded-xl border border-border">
          <p className="text-3xl">Корзина пуста</p>
          <img src="/app/assets/empty_cart.png" alt="Пустая корзина"></img>
        </div>
      ) : (
        <div className="h-9/12">
          <div className="flex justify-between w-full rounded-t-xl bg-sidebar text-sidebar-foreground p-3">
            <p className="text-3xl p-4">Корзина</p>
            <div className="mt-4 mr-4">
              <PrimaryButton size="icon" onClick={handleClearCart}>
                <TrashIcon className="size-8 p-1" />
              </PrimaryButton>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6 overflow-auto h-full">
            {itemsArray.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                count={item.count}
                minusClick={() => decreaseQuantity(item.id)}
                plusClick={() => increaseQuantity(item.id)}
                deleteFromCart={() => removeFromCart(item.id)}
              ></CartItem>
            ))}
          </div>
          <div className="flex flex-col justify-between bg-sidebar text-sidebar-foreground rounded-b-xl p-6 w-full absolute bottom-0">
            <div className="flex justify-between items-center p-4">
              <p className="text-lg font-semibold">
                Всего товаров: {totalCount}
              </p>
              <p className="text-2xl">{totalPrice + "Р"}</p>
            </div>
            <PrimaryButton onClick={goToCheckout}>
              {"Продолжить"}
              <ArrowRightIcon className="size-8 p-1" />
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
