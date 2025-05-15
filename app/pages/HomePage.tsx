import { useLoaderData } from "react-router";
import PromotionCard from "~/components/Card/PromotionCard";
import RestaurantCard from "~/components/Card/RestaurantCard";
import Carousel from "~/components/Carousel/Carousel";
import FilterButton from "~/components/Filters/FilterButton/FilterButton";
import FilterDropDownMenu from "~/components/Filters/FilterDropDownMenu/FilterDropDownMenu";
import type { Route } from "../+types/root";
import { fetchUser } from "~/services/session.server";
import { RestaurantQuery, RestaurantService } from "~/api/api.restaurant";
import { useEffect, useState } from "react";
import type { Restaurant } from "~/types/restaurant";
import { getCityCookie } from "~/services/cookie.server";
import type { MenuItem, MenuItemPromo } from "~/types/menuItem";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams);
  const city = await getCityCookie(request);
  const promotions = await RestaurantService.findPromotions(city.city);

  let query = new RestaurantQuery(queryParams);
  query.city = city.city;
  const restaurants = await RestaurantService.fetchRestaurants(query);
  const user = fetchUser(request);
  return { user, restaurants, city, promotions };
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>();
  const [grouped, setGrouped] = useState<Record<string, Restaurant[]>>({});
  const [promos, setPromos] = useState<MenuItemPromo[]>();
  const [category, setCategory] = useState<string>("");
  useEffect(() => {
    if (!data.restaurants?.length) return;
    const result = data.restaurants.reduce(
      (obj: Record<string, typeof data.restaurants>, item: Restaurant) => {
        const key = item.cuisine;
        if (!obj[key]) {
          obj[key] = [];
        }
        obj[key].push(item);
        return obj;
      },
      {} as Record<string, Restaurant[]>
    );
    setGrouped(result);
  }, [data.restaurants]);

  useEffect(() => {
    if (!data.promotions?.length) return;
    setPromos(data.promotions);
    console.log(data.promotions);
  }, [data.promotions]);
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-5">
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
      <div className="flex p-4">
        <FilterButton key={category} onClick={() => setCategory("")}>
          <p className="text-center">Все</p>
        </FilterButton>
        <div>
          {Object.keys(grouped).length ? (
            Object.entries(grouped).map(([category, items]) => {
              return (
                <FilterButton
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  <p className="text-center">{category}</p>
                </FilterButton>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <FilterDropDownMenu
          onClick={(category: string) => setCategory(category)}
          categories={Object.keys(grouped)}
        >
          <p>Остальное</p>
        </FilterDropDownMenu>
      </div>
      <div className="p-4">
        <h2 className="font-bold text-4xl">Рестораны</h2>
        <div className="mx-4">
          {Object.keys(grouped).length && category?.length === 0 ? (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h2 className="mt-4 font-bold text-3xl">{category}</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 justify-center items-center mx-4 ">
                  {items.map((item) => (
                    <div>
                      <RestaurantCard restaurant={item}></RestaurantCard>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : category?.length !== 0 ? (
            <div key={category}>
              <h2 className="mt-4 font-bold text-3xl">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center mx-4 ">
                {grouped[category!].map((item) => (
                  <div>
                    <RestaurantCard restaurant={item}></RestaurantCard>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
