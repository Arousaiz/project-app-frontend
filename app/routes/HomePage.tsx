import { useLoaderData } from "react-router";
import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantCard from "~/components/Card/RestaurantCard";
import Carousel from "~/components/Carousel/Carousel";
import FilterButton from "~/components/Buttons/FilterButton";
import FilterDropDownMenu from "~/components/Filters/FilterDropDownMenu/FilterDropDownMenu";
import type { Route } from "../+types/root";
import { RestaurantQuery, RestaurantService } from "~/api/api.restaurant";
import { useEffect, useRef, useState } from "react";
import type { Restaurants } from "~/types/restaurant";
import { checkQuery, type ApiData } from "~/utils/query-utils";
import { queryClient } from "~/api/api.config";
import { dehydrate, keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Promotions } from "~/types/promotions";
import { Filter } from "lucide-react";
import PrimaryButton from "~/components/Buttons/PrimaryButton";
import { cn } from "~/utils/utils";
import { useOverflowCategories } from "~/utils/measure";
import { useCategoryIntersectionObserver } from "~/utils/category";
import RestaurantFilters from "~/components/Modals/RestaurantFilters";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const city = localStorage.getItem("city");
  const promotions = await RestaurantService.findPromotions(city!);

  const cuisines = await RestaurantService.fetchCuisines();

  await checkQuery(
    "reataurants",
    RestaurantService.fetchRestaurants,
    queryClient
  );

  return { dehydratedState: dehydrate(queryClient), promotions, cuisines };
}

export default function HomePage() {
  const { dehydratedState, promotions, cuisines } =
    useLoaderData<typeof clientLoader>();
  const city = localStorage.getItem("city");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const { visibleCategories, overflowCategories } =
    useOverflowCategories(containerRef);

  const { data, isLoading, isFetching, error } = useQuery<
    ApiData<Restaurants>,
    AxiosError
  >({
    queryKey: ["reataurants", activeCategory],
    queryFn: () => RestaurantService.fetchRestaurants("0", "10", city!),
    placeholderData: keepPreviousData,
  });
  const [promos, setPromos] = useState<Promotions[]>();

  useEffect(() => {
    if (!promotions === undefined) return;
    setPromos(promotions.data);
  }, [promotions]);
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-5">
      <div className={`${promos?.length ? " " : "hidden "}  p-4`}>
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
                  <PromotionCard promo={item}></PromotionCard>
                ))
              ) : (
                <div></div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div
          ref={containerRef}
          className="flex justify-between p-4 overflow-x-auto md:overflow-clip  sticky top-0 z-[1000] space-x-2 hide-scrollbar"
        >
          {cuisines.data.map(({ name }) => {
            const isOverflowed = overflowCategories.includes(name);
            return (
              <PrimaryButton
                data-category={name}
                key={name}
                onClick={() => setActiveCategory(name)}
                variant={activeCategory === name ? "primary" : "ghost"}
                className={cn(
                  "shrink-0 category-button",
                  isOverflowed && "invisible absolute -z-10"
                )}
              >
                <p className="text-center">{name}</p>
              </PrimaryButton>
            );
          })}
          {overflowCategories.length !== 0 && (
            <FilterDropDownMenu
              onClick={(category: string) => setActiveCategory(category)}
              categories={overflowCategories}
              value={"Остальное"}
            ></FilterDropDownMenu>
          )}
          <PrimaryButton
            className="filter-button"
            onClick={() => setOpen(true)}
          >
            фильтры
            <Filter className="size-4"></Filter>
          </PrimaryButton>
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-bold text-4xl my-4">Рестораны</h2>
        <div className="">
          {data !== undefined ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.data.map((restaurant) => (
                <div>
                  <div>
                    <RestaurantCard restaurant={restaurant}></RestaurantCard>
                  </div>
                </div>
              ))}
            </div>
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
      ></RestaurantFilters>
    </div>
  );
}
