import { BookmarkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useCart } from "~/providers/cartContext";
import type { MenuItem, MenuItemInfo } from "~/types/menuItem";
import CounterButton from "../Buttons/CounterButton";
import { useFavorites } from "~/providers/favoritesContext";
import { useFetcher, useParams, useRevalidator } from "react-router";

export default function FavoriteCard({
  menuItem,
  restaurantId,
}: {
  menuItem: MenuItem;
  restaurantId?: string;
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
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [favorite, setFavorite] = useState(false);
  const fetcher = useFetcher();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      revalidator.revalidate(); // перезапускаем loader
    }
  }, [fetcher.state, fetcher.data]);

  const toggleFavorite = (isFavorite: boolean) => {
    fetcher.submit(
      JSON.stringify({
        _intent: isFavorite ? "remove" : "add",
        menuItemId: menuItem.id,
        restaurantId: restaurantId!,
      }),
      {
        method: "post",
        encType: "application/json",
        action: "/action/favorites",
      }
    );
    favorite ? removeFromFavorites(menuItem.id) : addToFavorites(menuItem.id);
  };

  useEffect(() => {
    setFavorite(isFavorite(menuItem.id));
  }, [menuItem.id, isFavorite]);

  return (
    <div className="w-64 h-84 sm:w-72 sm:h-84 mx-auto my-4 bg-white dark:bg-gray-900 rounded-lg shadow flex flex-col relative hover:-translate-y-2">
      <div className="relative h-7/12">
        <img
          src="/app/assets/pizza.jpg"
          className="rounded-t h-full w-full"
        ></img>
        <button
          type="button"
          onClick={(e) => {
            toggleFavorite(favorite);
            setFavorite(!favorite);
            e.preventDefault();
            e.stopPropagation();
          }}
          className={`absolute items-center mt-2 mr-2 text-white rounded-full top-0 right-0 ${
            favorite
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-800"
          }`}
        >
          <BookmarkIcon className="size-8 p-1" />
        </button>
        <div className="flex flex-row mx-4 absolute bottom-2 bg-blue-600 dark:bg-sky-800 rounded-lg p-1 hover:bg-blue-800 dark:hover:bg-sky-700">
          <p className=" text-white dark:text-white font-bold select-none">
            Rate
          </p>
          <StarIcon className="text-white size-4 mt-1 ml-1"></StarIcon>
        </div>
      </div>
      <p className=" text-gray-700 dark:text-white font-bold mx-4 mt-1 line-clamp-1">
        {menuItem.name}
      </p>
      <div className="flex mx-4 justify-between h-12 w-11/12 ">
        <p className=" text-gray-700 dark:text-gray-300 line-clamp-2 ">
          {menuItem.description}
        </p>
      </div>
      <p className=" text-gray-700 dark:text-white font-bold absolute bottom-0 left-0 mb-4 ml-4">
        {menuItem.price + "p"}
      </p>
    </div>
  );
}
