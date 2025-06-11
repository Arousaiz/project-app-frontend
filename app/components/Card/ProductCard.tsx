import { PlusIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/20/solid";
import { useCart } from "~/providers/cartContext";
import type { MenuItemInfo } from "~/types/menuItem";
import CounterButton from "../Buttons/CounterButton";
import { useFavorites } from "~/providers/favoritesContext";
import { useFetcher, useParams } from "react-router";
import { Card, CardContent } from "./Card";
import ImageWithLoadingAndFallback from "./ImageWithFallback";
import { Bookmark } from "lucide-react";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useConfirmAddToCart } from "~/utils/cart";
import ConfirmDialog from "../Dialogs/ConfirmDialog";

export default function ProductCard({
  menuItem,
  restaurantId,
  openReview,
  onClick,
}: {
  menuItem: MenuItemInfo;
  restaurantId: string;
  openReview: () => void;
  onClick?: () => void;
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
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const fetcher = useFetcher();
  const { id } = useParams();

  const toggleFavorite = (isFavorite: boolean) => {
    fetcher.submit(
      JSON.stringify({
        _intent: isFavorite ? "remove" : "add",
        menuItemId: menuItem.id,
        restaurantId: id!,
      }),
      {
        method: "post",
        encType: "application/json",
      }
    );
    isFavorite ? removeFromFavorites(menuItem.id) : addToFavorites(menuItem.id);
  };

  const isInCart = isItemInCart(menuItem.id);
  const isInFavorites = isFavorite(menuItem.id);
  const count = cart.items[menuItem.id]?.count ?? 0;

  const handleAddToCart = () => {
    requestAddToCart(menuItem, restaurantId);
  };

  return (
    <Card
      className="w-full h-full  mx-auto relative hover:-translate-y-2"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <ImageWithLoadingAndFallback
          src="/app/assets/placeholder-image.jpg"
          fallbackSrc="/app/assets/placeholder-image.jpg"
          alt={`Изображение ресторана ${menuItem?.name}`}
          className="w-full h-full object-cover"
          isInCard={true}
        ></ImageWithLoadingAndFallback>
        <PrimaryButton
          variant="secondary"
          size="icon"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(isInFavorites);
          }}
          className={`absolute top-2 right-2`}
        >
          <Bookmark
            className={`size-8 p-1 ${
              isInFavorites ? "bg-secondary-foreground " : " "
            }`}
          />
        </PrimaryButton>
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
          <p className="font-bold">{menuItem.price}p</p>
          {isInCart ? (
            <CounterButton
              count={count}
              minusClick={() => decreaseQuantity(menuItem.id)}
              plusClick={() => increaseQuantity(menuItem.id)}
              deleteFromCart={() => removeFromCart(menuItem.id)}
            />
          ) : (
            <PrimaryButton
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
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
