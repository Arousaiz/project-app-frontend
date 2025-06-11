import {
  ArrowRightIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useCart } from "~/providers/cartContext";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useNavigate, useParams } from "react-router";
import Modal from "../Modal/Modal";
import CartItem from "../Card/cartitem";

export default function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const itemsArray = Object.values(cart.items);
  const totalCount = itemsArray.reduce((acc, item) => acc + item.count, 0);

  const navigate = useNavigate();
  const params = useParams();

  const goToCheckout = () => {
    navigate(`/order`, { state: { id: params.id } });
    onClose();
  };

  const handleClearCart = () => {
    if (window.confirm("Вы уверены, что хотите очистить корзину?")) {
      clearCart();
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="flex items-center flex-col h-full">
        <div className="flex justify-between items-center bg-sidebar text-sidebar-foreground border-b border-border fixed top-0 w-full p-4">
          <h3 className="text-2xl font-bold">Корзина</h3>
          <div className="flex gap-2">
            <PrimaryButton
              size="icon"
              onClick={handleClearCart}
              className="mr-10"
            >
              <TrashIcon className="w-6 h-6" />
            </PrimaryButton>
          </div>
        </div>

        <div className="flex-1 place-self-stretch overflow-y-auto pt-20 pb-32 px-4">
          {itemsArray.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p className="text-2xl mb-4">Корзина пуста</p>
              <img src="/app/assets/empty_cart.png" alt="Пустая корзина" />
            </div>
          ) : (
            itemsArray.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                count={item.count}
                minusClick={() => decreaseQuantity(item.id)}
                plusClick={() => increaseQuantity(item.id)}
                deleteFromCart={() => removeFromCart(item.id)}
              />
            ))
          )}
        </div>

        {itemsArray.length > 0 && (
          <div className="fixed bottom-0 w-full bg-sidebar text-sidebar-foreground p-4 border-t border-border z-10">
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold">Всего: {totalCount} шт</p>
              <p className="text-2xl">{totalPrice} Р</p>
            </div>
            <PrimaryButton className="w-full" onClick={goToCheckout}>
              Перейти к оформлению
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </PrimaryButton>
          </div>
        )}
      </div>
    </Modal>
  );
}
