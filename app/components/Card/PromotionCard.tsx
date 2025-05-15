import { BookmarkIcon, StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router";
import type { MenuItem, MenuItemPromo } from "~/types/menuItem";

export default function PromotionCard({
  menuItem,
}: {
  menuItem?: MenuItemPromo;
}) {
  return (
    <Link to={`/restaurant/${menuItem?.restaurant?.id}`}>
      <div className="min-w-[calc(25%-12px)] flex-[0_0_calc(25%-12px)] group">
        <div className=" h-64 mx-auto my-4 bg-white dark:bg-gray-900 rounded-lg shadow flex flex-col relative group-hover:-translate-y-2">
          <img src="/app/assets/orig.jpg" className="rounded-t h-8/12"></img>
          <p
            className={`${
              menuItem?.name ? "text-lg " : "hidden "
            } text-gray-700 dark:text-white font-bold mx-4 mt-1 line-clamp-1`}
          >
            {menuItem?.name ? menuItem.name : "нет названия"}
          </p>
          <p className=" text-gray-700 dark:text-white font-light mx-4 mt-1 line-clamp-1">
            {menuItem?.description ? menuItem.description : "нет описания"}
          </p>
        </div>
      </div>
    </Link>
  );
}
