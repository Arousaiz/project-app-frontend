import { BookmarkIcon, StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import { Link, redirect } from "react-router";
import type { RestaurantCardInfo } from "~/types/restaurant";
import PrimaryBadge from "../ui/Badges/PrimaryBadge";
import { Card, CardContent, CardFooter } from "./Card";
import ImageWithLoadingAndFallback from "./ImageWithFallback";

type RestaurantCardProps = {
  restaurant: RestaurantCardInfo;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const deliveryTime = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

  return (
    <Link to={`/restaurant/${restaurant?.id}`} className="">
      <Card className="w-full h-full relative hover:-translate-y-2 hover:shadow-lg">
        <ImageWithLoadingAndFallback
          size="w-full h-40"
          src={`https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${restaurant.img_url}`}
          fallbackSrc="/app/assets/placeholder-image.jpg"
          alt={`Изображение ресторана ${restaurant?.name}`}
          className="rounded-t-xl"
          isInCard={true}
        ></ImageWithLoadingAndFallback>
        <CardContent className="flex-col flex pt-1">
          <div className="flex flex-row justify-between">
            <p className="font-bold line-clamp-1">{restaurant?.name}</p>
            <div className="flex items-center">
              <p className="font-bold">
                {restaurant?.rating ? restaurant.rating : "--- "}
              </p>
              <StarIcon className="size-4"></StarIcon>
            </div>
          </div>
          <div className="flex">
            <TruckIcon className="size-5"></TruckIcon>
            <p className="px-1 line-clamp-1">{deliveryTime}~ минут</p>
          </div>
        </CardContent>
        <CardFooter className="gap-2 py-1 md:py-2">
          <PrimaryBadge>Бесплатная доставка</PrimaryBadge>
          {/* <PrimaryBadge variant="secondary">-20% скидки</PrimaryBadge> */}
        </CardFooter>
      </Card>
    </Link>
  );
}
