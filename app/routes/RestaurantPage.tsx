import { useEffect, useMemo, useRef, useState } from "react";
import Cart from "~/components/Card/CartCard";
import ProductCard from "~/components/Card/ProductCard";
import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantHeaderCard from "~/components/Card/RestaurantHeaderCard";
import Carousel from "~/components/ui/Carousel/Carousel";
import FilterDropDownMenu from "~/components/Menus/FilterDropDownMenu";
import type { Route } from "../+types/root";
import { RestaurantService } from "~/api/api.restaurant";
import { useLocation, useParams } from "react-router";
import type { MenuItems } from "~/types/menuItem";
import ReviewModal from "~/components/Modals/ReviewModal";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";
import type { Promotions } from "~/types/promotions";
import { ArrowLeftIcon, Settings2 } from "lucide-react";
import { useCategoryIntersectionObserver } from "~/hooks/use-category";
import MenuFilters from "~/components/Modals/MenuFilters";
import PromotionModal from "~/components/Modals/PromotionModal";
import ProductModal from "~/components/Modals/MenuItemInfo";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ApiData, ApiDataOne } from "~/utils/query-utils";
import type { AxiosError } from "axios";
import { SkeletonCard } from "~/components/ui/Skeletons/skeletonCard";
import { SkeletonButton } from "~/components/ui/Skeletons/skeletonButton";
import { useOverflowButtons } from "~/hooks/use-oveflow";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";

export async function clientLoader({ request, params }: Route.LoaderArgs) {
  // if (params.id) {
  //   const menuItems = await RestaurantService.fetchMenuItems(params.id);
  //   const promotions = await RestaurantService.fetchPromotionsById(params.id);
  //   return { menuItems, promotions };
  // } else {
  //   throw Error("Not Found");
  // }
}

export async function clientAction({ request }: Route.ActionArgs) {
  const res: {
    menuItemId: string;
    restaurantId: string;
    _intent: string;
  } = await request.json();

  return { success: true };
}

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params.id;
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedPromo, setSelectedPromo] = useState<Promotions | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItems | null>(null);
  const location = useLocation();
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlightId = params.get("highlight");
    if (highlightId) {
      const el = document.getElementById(`menu-item-${highlightId}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ behavior: "smooth", top: y });

        el.classList.add("highlight");
        const timeoutId = setTimeout(() => {
          el.classList.remove("highlight");
        }, 3000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [location.search]);

  const [openReview, setOpenReview] = useState<{
    id: string | null;
    isOpen: boolean;
  }>({
    id: null,
    isOpen: false,
  });

  useCategoryIntersectionObserver({
    refs: categoryRefs,
    onIntersect: (category) => setActiveCategory(category),
  });

  const openModal = (id: string) => {
    setOpenReview({ id, isOpen: true });
  };

  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);

    const el = categoryRefs.current[categoryName];
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 50;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const closeModal = () => {
    setOpenReview({ id: null, isOpen: false });
  };

  const { data: promotions, isLoading: isLoadingPromotions } = useQuery<
    ApiData<Promotions>,
    AxiosError,
    Promotions[]
  >({
    queryKey: ["restaurantPromotions", restaurantId],
    queryFn: () => RestaurantService.fetchPromotionsById(restaurantId!),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const {
    data: menu,
    isLoading: isLoadingMenu,
    isFetching,
    error,
  } = useQuery<
    ApiDataOne<Record<string, MenuItems[]>>,
    AxiosError,
    Record<string, MenuItems[]>
  >({
    queryKey: ["restaurants", restaurantId],
    queryFn: () => RestaurantService.fetchMenuItems(restaurantId!),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  });

  const categories = Object.keys(menu ?? {}).map((key) => ({ id: key }));

  const { containerRef, hiddenItems } = useOverflowButtons({
    items: categories,
  });

  const overflowCategories = Object.keys(menu ?? {}).filter(
    (key) => hiddenItems[key]
  );

  return (
    <div>
      <div className="flex flex-col max-w-7xl mx-auto min-h-[2000px] mt-5 p-2 sm:p-4">
        <div className="flex items-center gap-2 py-2">
          <PrimaryLink to="/" className="font-bold p-4">
            <ArrowLeftIcon className="w-4 h-4" />К остальным ресторанам
          </PrimaryLink>
        </div>
        <div>
          <RestaurantHeaderCard id={params.id!}></RestaurantHeaderCard>
        </div>
        <div
          className={`${
            isLoadingPromotions || promotions?.length ? "block" : "hidden"
          } p-4`}
        >
          <h2 className="font-bold text-4xl">Акции</h2>
          <div className="w-full p-4">
            <Carousel className="">
              {isLoadingPromotions
                ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard />)
                : promotions?.length &&
                  promotions.map((item) => (
                    <PromotionCard key={item.id} promo={item} />
                  ))}
            </Carousel>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 flex-col min-h-screen">
            <div
              ref={containerRef}
              className="flex p-4 overflow-x-auto md:overflow-clip sticky top-0 z-[1000] bg-background border-b space-x-2 hide-scrollbar"
            >
              {isLoadingMenu
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonButton />)
                : Object.entries(menu ?? {}).map(([category, _]) => {
                    if (hiddenItems[category]) return null;
                    return (
                      <PrimaryButton
                        data-category={category}
                        key={category}
                        onClick={() => scrollToCategory(category)}
                        variant={
                          activeCategory === category ? "primary" : "ghost"
                        }
                      >
                        <p className="text-center">{category}</p>
                      </PrimaryButton>
                    );
                  })}
              {!isLoadingMenu && (
                <FilterDropDownMenu
                  data-element="dropdown"
                  onClick={(category: string) => scrollToCategory(category)}
                  categories={overflowCategories}
                  hidden={
                    Object.keys(menu ?? {}).filter((key) => hiddenItems[key])
                      .length === 0
                  }
                />
              )}
            </div>
            <div className="flex flex-col p-4" ref={menuContainerRef}>
              {isLoadingMenu ? (
                <div>
                  <div className="h-6 w-40 rounded bg-gray-300 animate-pulse mb-4"></div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <SkeletonCard />
                    ))}
                  </div>
                </div>
              ) : (
                menu !== undefined &&
                Object.entries(menu).map(([category, items]) => (
                  <div
                    key={category}
                    ref={(el: HTMLDivElement | null) => {
                      categoryRefs.current[category] = el;
                    }}
                    data-category={category}
                  >
                    <h3 className="pt-6 pb-2">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {items.map((item) => {
                        const promo = promotions?.find(
                          (p) => p.menuItem.id === item.id
                        );

                        return (
                          <ProductCard
                            id={`menu-item-${item.id}`}
                            promotion={promo}
                            key={item.id}
                            openReview={() => openModal(item.id)}
                            menuItem={item}
                            onClick={() => setSelectedItem(item)}
                            restaurantId={restaurantId!}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <Cart></Cart>
        </div>
        <div className="min-h-screen"></div>
      </div>

      {selectedItem && (
        <ProductModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          restaurantId={restaurantId!}
        ></ProductModal>
      )}

      {selectedPromo && (
        <PromotionModal
          selectedPromo={selectedPromo}
          onClose={() => setSelectedPromo(null)}
        ></PromotionModal>
      )}
    </div>
  );
}
