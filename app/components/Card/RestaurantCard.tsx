import { BookmarkIcon, StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import { Link, redirect } from "react-router";
import type { Restaurant } from "~/types/restaurant";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant?: Restaurant;
}) {
  return (
    <Link to={`/restaurant/${restaurant?.id}`}>
      <div className="w-64 md:w-80 h-64 mx-auto my-4 bg-white dark:bg-gray-900 rounded-lg shadow flex flex-col relative mr-4 hover:-translate-y-2">
        <img src="/app/assets/orig.jpg" className="rounded-t h-8/12"></img>
        <div className="flex flex-row mx-4 mt-1 justify-between">
          <p className=" text-gray-700 dark:text-white font-bold line-clamp-1">
            {restaurant?.name ? restaurant?.name : "Mak.by"}
          </p>
          <div className="flex flex-row">
            <p className=" text-gray-700 dark:text-white font-bold">
              {restaurant?.rating ? restaurant.rating : "No rating"}
            </p>
            <StarIcon className="size-4 mt-1 ml-1"></StarIcon>
          </div>
        </div>
        <div className="flex mx-4">
          <TruckIcon className="size-5"></TruckIcon>
          <p className="text-gray-700 dark:text-white mx-1 line-clamp-1">
            30-40 minutes
          </p>
        </div>
        <div className="flex mx-4">
          <div className="rounded-3xl text-gray-200 bg-blue-600 dark:bg-sky-800 text-center px-1 text-sm truncate select-none">
            Free delivery
          </div>
          <div className="rounded-3xl text-gray-200 bg-blue-600 dark:bg-sky-800 text-center mx-1 px-1 text-sm truncate select-none">
            -20% for some items
          </div>
        </div>
      </div>
    </Link>
  );
}
