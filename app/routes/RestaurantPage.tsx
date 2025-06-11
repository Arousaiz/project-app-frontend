import { useRef, useState } from "react";
import Cart from "~/components/Card/CartCard";
import ProductCard from "~/components/Card/ProductCard";
import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantHeaderCard from "~/components/Card/RestaurantHeaderCard";
import Carousel from "~/components/Carousel/Carousel";
import FilterDropDownMenu from "~/components/Filters/FilterDropDownMenu/FilterDropDownMenu";
import type { Route } from "../+types/root";
import { RestaurantService } from "~/api/api.restaurant";
import { useLoaderData, useParams } from "react-router";
import type { MenuItems } from "~/types/menuItem";
import ReviewModal from "~/components/Modals/ReviewModal";
import { FavoritesService } from "~/api/api.favorites";
import { FavoritesProvider } from "~/providers/favoritesContext";
import PrimaryButton from "~/components/Buttons/PrimaryButton";
import type { Promotions } from "~/types/promotions";
import { ArrowLeftIcon, Filter } from "lucide-react";
import { useCategoryIntersectionObserver } from "~/utils/category";
import { useOverflowCategories } from "~/utils/measure";
import { cn } from "~/utils/utils";
import MenuFilters from "~/components/Modals/MenuFilters";
import PromotionModal from "~/components/Modals/PromotionModal";
import ProductModal from "~/components/Modals/MenuItemInfo";
import CartSummaryBar from "~/components/Card/CartSummaryBar";
import CartModal from "~/components/Modals/CartModal";
import SimpleLink from "~/components/Footer/SimpleLink";

export async function clientLoader({ request, params }: Route.LoaderArgs) {
  if (params.id) {
    const menuItems = await RestaurantService.fetchMenuItems(params.id);
    const promotions = await RestaurantService.fetchPromotionsById(params.id);
    return { menuItems, promotions };
  } else {
    throw Error("Not Found");
  }
}

export async function clientAction({ request }: Route.ActionArgs) {
  const res: {
    menuItemId: string;
    restaurantId: string;
    _intent: string;
  } = await request.json();

  if (res._intent === "add") {
    await FavoritesService.createFavorite({
      menuItemId: res.menuItemId,
      restaurantId: res.restaurantId,
    });
  } else if (res._intent === "remove") {
    await FavoritesService.deleteFavorite(res.menuItemId);
  }

  return { success: true };
}

export default function RestaurantPage() {
  const { menuItems, promotions } = useLoaderData<typeof clientLoader>();
  const params = useParams();
  const restaurantId = params.id;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedPromo, setSelectedPromo] = useState<Promotions | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItems | null>(null);

  const [openReview, setOpenReview] = useState<{
    id: string | null;
    isOpen: boolean;
  }>({
    id: null,
    isOpen: false,
  });

  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { visibleCategories, overflowCategories } =
    useOverflowCategories(containerRef);

  useCategoryIntersectionObserver({
    refs: categoryRefs,
    onIntersect: (category) => setActiveCategory(category),
  });

  const openModal = (id: string) => {
    setOpenReview({ id, isOpen: true });
  };

  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    categoryRefs.current[categoryName]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const closeModal = () => {
    setOpenReview({ id: null, isOpen: false });
  };

  return (
    <FavoritesProvider>
      <div className="flex flex-col max-w-7xl mx-auto min-h-[2000px] mt-5 p-2 sm:p-4">
        <div className="flex items-center gap-2 py-2">
          <SimpleLink to="/" className="flex items-center font-bold p-4 ">
            <ArrowLeftIcon className="w-4 h-4" />К остальным ресторанам
          </SimpleLink>
        </div>
        <div>
          <RestaurantHeaderCard id={params.id!}></RestaurantHeaderCard>
        </div>
        <div className={`${promotions?.data?.length ? " " : "hidden "}  m-4`}>
          <h2 className="font-bold text-4xl">Акции</h2>
          <div
            className={`${
              promotions?.data?.length ? "flex" : "hidden"
            } min-w-0 gap-4 justify-center`}
          >
            <div className="w-full">
              <Carousel className="">
                {promotions?.data.length ? (
                  promotions?.data.map((item) => (
                    <PromotionCard
                      shouldWrapInLink={false}
                      promo={item}
                      onClick={() => setSelectedPromo(item)}
                    ></PromotionCard>
                  ))
                ) : (
                  <div></div>
                )}
              </Carousel>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 flex-col min-h-screen  ">
            <div
              ref={containerRef}
              className="flex p-4 overflow-x-auto md:overflow-clip sticky top-0 z-[1000] bg-background border-b space-x-2 hide-scrollbar"
            >
              {Object.keys(menuItems.data).map((category) => {
                const isOverflowed = overflowCategories.includes(category);
                return (
                  <PrimaryButton
                    data-category={category}
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    variant={activeCategory === category ? "primary" : "ghost"}
                    className={cn(
                      "shrink-0 category-button",
                      isOverflowed && "invisible absolute -z-10"
                    )}
                  >
                    <p className="text-center">{category}</p>
                  </PrimaryButton>
                );
              })}
              {overflowCategories.length !== 0 && (
                <FilterDropDownMenu
                  onClick={(category: string) => scrollToCategory(category)}
                  categories={overflowCategories}
                  value={activeCategory || "Остальное"}
                ></FilterDropDownMenu>
              )}
              <PrimaryButton
                className="filter-button"
                variant="secondary"
                onClick={() => setOpen(true)}
              >
                Фильтры
                <Filter className="size-4"></Filter>
              </PrimaryButton>
            </div>
            <div className="flex flex-col p-4">
              {menuItems.data !== undefined &&
                Object.entries(menuItems.data).map(([category, items]) => (
                  <div
                    key={category}
                    ref={(el: HTMLDivElement | null) => {
                      categoryRefs.current[category] = el;
                    }}
                    className=""
                    data-category={category}
                  >
                    <h3 className="pt-6 pb-2">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {items.map((item) => (
                        <ProductCard
                          key={item.id}
                          openReview={() => openModal(item.id)}
                          menuItem={item}
                          onClick={() => setSelectedItem(item)}
                          restaurantId={restaurantId!}
                        ></ProductCard>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Cart></Cart>

          <CartSummaryBar onClick={() => setIsCartOpen(true)} />
          <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
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

      <MenuFilters
        open={open}
        onClose={() => setOpen(false)}
        id={""}
      ></MenuFilters>

      <ReviewModal
        open={openReview.isOpen}
        onClose={() => closeModal()}
        id={openReview.id!}
      ></ReviewModal>
    </FavoritesProvider>
  );
}
