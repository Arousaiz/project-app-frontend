import { PlusIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/20/solid";
import { useCart } from "~/providers/cartContext";
import type { MenuItemInfo } from "~/types/menuItem";
import CounterButton from "../ui/Buttons/CounterButton";
import { useFavorites } from "~/providers/favoritesContext";
import { Card, CardContent } from "./Card";
import ImageWithLoadingAndFallback from "./ImageWithFallback";
import { Bookmark } from "lucide-react";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import { useConfirmAddToCart } from "~/hooks/use-cart";
import { useAuth } from "~/providers/authContext";
import { PromotionType, type Promotions } from "~/types/promotions";
import ConfirmDialog from "../ui/Dialogs/ConfirmDialog";

export default function ProductCard({
  menuItem,
  promotion,
  restaurantId,
  openReview,
  onClick,
  id,
}: {
  promotion?: Promotions;
  menuItem: MenuItemInfo;
  restaurantId: string;
  openReview: () => void;
  onClick?: () => void;
  id: string;
}) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isItemInCart,
  } = useCart();
  const { requestAddToCart, isConfirmOpen, confirmAdd, cancelAdd } =
    useConfirmAddToCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const showFavorites = user !== null;

  const isInCart = isItemInCart(menuItem.id);
  const isInFavorites = isFavorite(menuItem.id);
  const count = cart.items[menuItem.id]?.count ?? 0;

  const handleAddToCart = () => {
    requestAddToCart(menuItem, restaurantId);
  };

  return (
    <Card
      className="w-full h-full  mx-auto relative hover:-translate-y-2 hover:shadow-lg"
      onClick={onClick}
      id={id}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <ImageWithLoadingAndFallback
          src={`https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${menuItem.img_url}`}
          fallbackSrc="/app/assets/placeholder-image.jpg"
          alt={`Изображение ресторана ${menuItem?.name}`}
          className="w-full h-full object-cover"
          isInCard={true}
        ></ImageWithLoadingAndFallback>
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
        {showFavorites && (
          <PrimaryButton
            variant="secondary"
            size="icon"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(menuItem.id);
            }}
            className={`absolute top-2 right-2`}
          >
            <Bookmark
              className={`size-8 p-1 ${
                isInFavorites
                  ? "text-amber-300 dark:text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </PrimaryButton>
        )}
        {menuItem.rating && (
          <PrimaryButton
            variant="secondary"
            className="absolute bottom-2 left-2 bg-green-300 text-black hover:bg-green-600"
            onClick={(e) => {
              e.stopPropagation();
              openReview();
            }}
          >
            <div className="flex">
              <p className="font-bold select-none">{menuItem.rating}</p>
              <StarIcon className="size-4"></StarIcon>
            </div>
          </PrimaryButton>
        )}
      </div>
      <CardContent className="flex flex-col justify-between gap-2 p-3 min-h-[9rem]">
        <div>
          <p className="font-bold text-base line-clamp-1 break-words">
            {menuItem.name}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 break-words mt-1">
            {menuItem.description}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>
            {promotion ? (
              <>
                <span className="line-through text-muted-foreground">
                  {menuItem.price}p
                </span>{" "}
                <span className="text-primary">
                  {Math.round(menuItem.price * (1 - promotion.discount / 100))}p
                </span>
              </>
            ) : (
              <span>{menuItem.price}p</span>
            )}
          </div>
          {isInCart ? (
            <div
              key="counter"
              className="transition-all duration-300  ease-in-out opacity-100 scale-100"
            >
              <CounterButton
                count={count}
                minusClick={() => decreaseQuantity(menuItem.id)}
                plusClick={() => increaseQuantity(menuItem.id)}
                deleteFromCart={() => removeFromCart(menuItem.id)}
              />
            </div>
          ) : (
            <PrimaryButton
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="transition-all duration-300 ease-in-out opacity-100 scale-100"
            >
              <PlusIcon className="size-8 p-1" />
            </PrimaryButton>
          )}
        </div>
      </CardContent>
      <ConfirmDialog
        open={isConfirmOpen}
        title={"Блюдо из другого ресторана"}
        message={
          "Хотите сбросить текущее содержимое корзины и добавить данное блюдо в корозину?"
        }
        onCancel={cancelAdd}
        onConfirm={confirmAdd}
      ></ConfirmDialog>
    </Card>
  );
}
