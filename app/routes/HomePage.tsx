import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantCard from "~/components/Card/RestaurantCard";
import FilterDropDownMenu from "~/components/Menus/FilterDropDownMenu";
import type { Route } from "../+types/root";
import { RestaurantService } from "~/api/api.restaurant";
import { useState } from "react";
import type { Cuisines, Restaurants } from "~/types/restaurant";
import { type ApiData } from "~/utils/query-utils";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Promotions } from "~/types/promotions";
import { FilterX, Settings2 } from "lucide-react";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";
import RestaurantFilters from "~/components/Modals/RestaurantFilters";
import { SkeletonCard } from "~/components/ui/Skeletons/skeletonCard";
import { SkeletonButton } from "~/components/ui/Skeletons/skeletonButton";
import { useOverflowButtons } from "~/hooks/use-oveflow";
import Carousel from "~/components/ui/Carousel/Carousel";

export async function clientLoader({ request }: Route.LoaderArgs) {
  // const city = localStorage.getItem("city");
  // const promotions = await RestaurantService.findPromotions(city!);

  // const cuisines = await RestaurantService.fetchCuisines();

  // await checkQuery(
  //   "restaurants",
  //   RestaurantService.fetchRestaurants,
  //   queryClient
  // );

  // return { dehydratedState: dehydrate(queryClient), cuisines };

  return null;
}

export default function HomePage() {
  const city = localStorage.getItem("city");
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const { data: promotions, isLoading: isLoadingPromotions } = useQuery<
    ApiData<Promotions>,
    AxiosError,
    Promotions[]
  >({
    queryKey: ["promotions", city],
    queryFn: () => RestaurantService.findPromotions(city!),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const {
    data: restaurants,
    isLoading: isLoadingRestaurants,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery<
    ApiData<Restaurants>,
    AxiosError,
    Restaurants[],
    [string, string, string, string],
    number
  >({
    queryKey: ["restaurants", activeCategory, city!, sortBy],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      RestaurantService.fetchRestaurants(
        pageParam.toString(),
        "10",
        city!,
        activeCategory,
        sortBy
      ),
    getNextPageParam: (lastPage) => {
      const { offset, limit, total_records } = lastPage.paginated;
      const nextOffset = offset + limit;
      return nextOffset < total_records ? nextOffset : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });

  const { data: cuisines, isLoading: isLoadingCuisines } = useQuery<
    ApiData<Cuisines>,
    AxiosError
  >({
    queryKey: ["cuisines"],
    queryFn: () => RestaurantService.fetchCuisines(),
    staleTime: 1000 * 60 * 10,
  });

  const { containerRef, hiddenItems } = useOverflowButtons({
    items: cuisines?.data,
  });

  const overflowCategories =
    cuisines?.data?.filter((item) => hiddenItems[item.id]) ?? [];

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-5">
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
      <div className="flex justify-between p-4">
        <div
          ref={containerRef}
          className="flex justify-between p-4 overflow-x-auto lg:overflow-hidden lg:max-w-2xl sticky top-0 z-[1000] hide-scrollbar"
        >
          <PrimaryButton
            data-element="filter"
            variant="secondary"
            onClick={() => setOpen(true)}
          >
            <Settings2 className="size-4" />
          </PrimaryButton>
          <PrimaryButton
            data-element="filter2"
            className="mx-2"
            variant="secondary"
            onClick={() => {
              setActiveCategory("");
              setSortBy("");
            }}
          >
            <FilterX className="size-4" />
          </PrimaryButton>
          {isLoadingCuisines
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonButton key={i} />
              ))
            : cuisines?.data?.map(({ name, id }) => {
                if (hiddenItems[id]) {
                  return null;
                }
                return (
                  <PrimaryButton
                    data-category={name}
                    key={name}
                    onClick={() => setActiveCategory(name)}
                    variant={activeCategory === name ? "primary" : "ghost"}
                  >
                    <p className="text-center">{name}</p>
                  </PrimaryButton>
                );
              })}

          {!isLoadingCuisines && (
            <FilterDropDownMenu
              onClick={(category: string) => setActiveCategory(category)}
              data-element="dropdown"
              categories={overflowCategories.map((item) => item.name)}
              hidden={overflowCategories.length === 0}
            />
          )}
        </div>
      </div>

      <div className="p-4">
        <h2 className="font-bold text-4xl my-4">Рестораны</h2>
        <div className="">
          {isLoadingRestaurants ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : restaurants && restaurants.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
              {hasNextPage && (
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="btn mt-4"
                >
                  {isFetchingNextPage ? "Загрузка..." : "Загрузить ещё"}
                </button>
              )}
            </>
          ) : (
            <div>
              Ни одного ресторана не найдено, попробуйте сбросить фильтры
            </div>
          )}
        </div>
      </div>
      <RestaurantFilters
        open={open}
        onClose={() => setOpen(false)}
        id={""}
        cuisines={cuisines?.data}
        selectedCategory={activeCategory}
        setSelectedCategory={setActiveCategory}
        setSortBy={setSortBy}
        sortBy={sortBy}
      ></RestaurantFilters>
    </div>
  );
}
