import {
  ComputerDesktopIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Cart from "~/components/Card/CartCard";
import ProductCard from "~/components/Card/ProductCard";
import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantHeaderCard from "~/components/Card/RestaurantHeaderCard";
import ReviewCard from "~/components/Card/ReviewCard";
import Carousel from "~/components/Carousel/Carousel";
import FilterButton from "~/components/Filters/FilterButton/FilterButton";
import FilterDropDownMenu from "~/components/Filters/FilterDropDownMenu/FilterDropDownMenu";
import Modal from "~/components/Modal/Modal";
import type { Route } from "../+types/root";
import { RestaurantService } from "~/api/api.restaurant";
import { fetchUser } from "~/services/session.server";
import type { RestaurantInfo } from "~/types/restaurant";
import { useLoaderData } from "react-router";
import type { MenuItem, MenuItemInfo } from "~/types/menuItem";
import { useCart } from "~/providers/cartContext";
import ButtonWithIcon from "~/components/Buttons/ButtonWithIcon";
import RestaurantInfoModal from "~/components/Modals/RestaurantInfoModal";
import ReviewModal from "~/components/Modals/ReviewModal";
import type { Review } from "~/types/review";

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams);
  let restaurant: RestaurantInfo | null = null;
  if (params.id) {
    restaurant = await RestaurantService.findRestaurant(params.id);
  }
  if (restaurant === null || restaurant === undefined) {
    throw Error("Not Found");
  }
  const user = fetchUser(request);
  return { user, restaurant };
}

export default function RestaurantPage() {
  const data = useLoaderData<typeof loader>();
  const [grouped, setGrouped] = useState<Record<string, MenuItemInfo[]>>({});
  const [promos, setPromos] = useState<MenuItemInfo[]>();
  const [reviews, setReviews] = useState<Review[]>();
  const [category, setCategory] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openReview, setOpenReview] = useState<{
    id: string | null;
    isOpen: boolean;
  }>({
    id: null,
    isOpen: false,
  });
  const openModal = (id: string) => {
    setOpenReview({ id, isOpen: true });
  };

  const closeModal = () => {
    setOpenReview({ id: null, isOpen: false });
  };
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    if (!data.restaurant?.menuItems.length) return;
    const result = data.restaurant.menuItems.reduce(
      (obj: Record<string, MenuItemInfo[]>, item: MenuItemInfo) => {
        const key = item.category.name;
        if (!obj[key]) {
          obj[key] = [];
        }
        obj[key].push(item);
        return obj;
      },
      {} as Record<string, MenuItemInfo[]>
    );

    if (result["Promotion"]) {
      setPromos(result["Promotion"]);
      delete result["Promotion"];
    }

    setReviews(
      data.restaurant?.menuItems.flatMap((menuItem) =>
        menuItem.reviews.flatMap((review) => review)
      )
    );

    setGrouped(result);
  }, [data.restaurant?.menuItems]);

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[2000px] mt-5">
      <div className="fixed bottom-4 left-4 size-12 z-100">
        <ButtonWithIcon
          onSubmit={() => setOpenCart(!openCart)}
          Icon={<ShoppingCartIcon className="size-8"></ShoppingCartIcon>}
        ></ButtonWithIcon>
      </div>
      <div>
        <RestaurantHeaderCard
          reviews={reviews}
          onSubmit={() => setOpen(true)}
        ></RestaurantHeaderCard>
      </div>
      <div className={`${promos?.length ? " " : "hidden "}  m-4`}>
        <h2 className="font-bold text-4xl">Акции</h2>
        <div
          className={`${
            promos?.length ? "flex" : "hidden"
          } min-w-0 gap-4 justify-center`}
        >
          <div className="w-full">
            <Carousel className="">
              {promos?.length ? (
                promos.map((item) => (
                  <PromotionCard menuItem={item}></PromotionCard>
                ))
              ) : (
                <div></div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="flex">
        <FilterButton onClick={() => setCategory("")}>
          <p className="text-center">Все</p>
        </FilterButton>
        {Object.keys(grouped).length ? (
          Object.entries(grouped).map(([category, items]) => {
            return (
              <FilterButton onClick={() => setCategory(category)}>
                <p className="text-center">{category}</p>
              </FilterButton>
            );
          })
        ) : (
          <div></div>
        )}
        <FilterDropDownMenu
          onClick={(category: string) => setCategory(category)}
          categories={Object.keys(grouped)}
        >
          <p>Остальное</p>
        </FilterDropDownMenu>
      </div>
      <div className="">
        <div className="">
          {Object.keys(grouped).length && category?.length === 0 ? (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h2 className="mt-4 font-bold text-3xl">{category}</h2>
                <div className="grid grid-cols-3 justify-center items-center mx-4">
                  {items.map((item) => (
                    <div>
                      <ProductCard
                        openReview={() => openModal(item.id)}
                        menuItem={item}
                      ></ProductCard>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : category?.length !== 0 ? (
            <div key={category}>
              <h2 className="mt-4 font-bold text-3xl">{category}</h2>
              <div className="grid grid-cols-3 justify-center items-center mx-4">
                {grouped[category!].map((item) => (
                  <div>
                    <ProductCard
                      openReview={() => openModal(item.id)}
                      menuItem={item}
                    ></ProductCard>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Cart open={openCart}></Cart>
      <RestaurantInfoModal
        open={open}
        onClose={() => setOpen(false)}
        restaurant={data.restaurant}
      ></RestaurantInfoModal>
      <ReviewModal
        open={openReview.isOpen}
        onClose={() => closeModal()}
        id={openReview.id!}
      ></ReviewModal>
    </div>
  );
}
