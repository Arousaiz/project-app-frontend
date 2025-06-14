import type { MenuItems } from "~/types/menuItem";
import Modal from "../ui/Modal";
import CounterButton from "../ui/Buttons/CounterButton";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import { PlusIcon } from "lucide-react";
import { useCart } from "~/providers/cartContext";
import { useEffect, useState } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import { PromotionType, type Promotions } from "~/types/promotions";
import { useConfirmAddToCart } from "~/hooks/use-cart";
import ConfirmDialog from "../ui/Dialogs/ConfirmDialog";

export default function ProductModal({
  item,
  promotion,
  restaurantId,
  onClose,
}: {
  promotion?: Promotions;
  item: MenuItems | null;
  restaurantId: string;
  onClose: () => void;
}) {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    isItemInCart,
  } = useCart();
  const isMobile = useIsMobile();
  const { requestAddToCart, isConfirmOpen, confirmAdd, cancelAdd } =
    useConfirmAddToCart();
  const handleAddToCart = () => {
    requestAddToCart(item!, restaurantId);
  };

  const [quantity, setQuantity] = useState(1);
  const currentCount = item ? cart.items[item.id]?.count ?? 0 : 0;
  useEffect(() => {
    setQuantity(1);
  }, [item]);

  if (!item) return null;

  return (
    <Modal open={!!item} onClose={onClose} size="xl">
      <div className="flex flex-col lg:flex-row gap-4 w-full relative py-4">
        <div className="w-full lg:w-2/3 sm:h-auto">
          <img
            src={item?.img_url || "/app/assets/placeholder-image.jpg"}
            alt={item?.name}
            className="object-cover w-full h-full rounded-xl"
          />
          {promotion && (
            <div
              className={`
                      absolute top-2 left-2 px-2 py-1 rounded shadow-md select-none z-10
                      ${
                        promotion.promotionType === PromotionType.DISCOUNT
                          ? "bg-red-600 text-white"
                          : promotion.promotionType === PromotionType.FREE_ITEM
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                      }
                      `}
            >
              {promotion.promotionType === PromotionType.DISCOUNT &&
                `Скидка ${promotion.discount}%`}
              {promotion.promotionType === PromotionType.FREE_ITEM &&
                `${promotion.requiredCount}+1`}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col lg:max-h-[70vh] ">
          <div className="overflow-y-auto pr-2 space-y-2">
            <h3 className="text-xl font-bold">{item?.name}</h3>
            {promotion ? (
              <>
                <span className="line-through text-muted-foreground">
                  {item.price}p
                </span>{" "}
                <span className="text-primary">
                  {Math.round(item.price * (1 - promotion.discount / 100))}p
                </span>
              </>
            ) : (
              <span>{item.price}p</span>
            )}
            <p className="text-base text-muted-foreground">
              {item?.description}
            </p>

            {item?.rating !== null && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Рейтинг:</span>
                <span className="text-green-600 font-bold">{item?.rating}</span>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-sm">
                Категория: <strong>{item?.category.name}</strong>
              </p>
              <p className="text-sm">
                Доступность:{" "}
                <span
                  className={
                    item?.isAvailable ? "text-green-600" : "text-red-500"
                  }
                >
                  {item?.isAvailable ? "В наличии" : "Нет в наличии"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-auto sticky -bottom-6 lg:static flex items-center justify-between space-x-3 py-4 border-t border-border">
            {isItemInCart(item.id) ? (
              <div className="">
                <CounterButton
                  count={currentCount}
                  minusClick={() => decreaseQuantity(item.id)}
                  plusClick={() => increaseQuantity(item.id)}
                  deleteFromCart={() => removeFromCart(item.id)}
                />
              </div>
            ) : (
              <div className="flex w-full items-center justify-between ">
                <CounterButton
                  count={quantity}
                  minusClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  plusClick={() => setQuantity((q) => q + 1)}
                  deleteFromCart={() => {}}
                ></CounterButton>
                <PrimaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  className=""
                >
                  {isMobile ? (
                    <PlusIcon className="w-5 h-5" />
                  ) : (
                    `Добавить в корзину`
                  )}
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={isConfirmOpen}
        title={"Блюдо из другого ресторана"}
        message={
          "Хотите сбросить текущее содержимое корзины и добавить данное блюдо в корозину?"
        }
        onCancel={cancelAdd}
        onConfirm={confirmAdd}
      ></ConfirmDialog>
    </Modal>
  );
}
