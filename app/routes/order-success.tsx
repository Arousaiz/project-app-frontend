import { useEffect } from "react";
import { Link } from "react-router";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";
import { useCart } from "~/providers/cartContext";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Заказ успешно оформлен!
        </h1>
        <p className="mb-6">
          Спасибо за ваш заказ. Вы можете отследить его в личном кабинете.
        </p>
        <PrimaryLink to="/profile/orders" className="underline">
          Перейти в профиль
        </PrimaryLink>
      </div>
    </div>
  );
}
