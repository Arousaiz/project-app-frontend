import { BookmarkIcon, StarIcon, TruckIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router";
import type {} from "~/types/menuItem";
import { Card, CardContent } from "./Card";
import ImageWithLoadingAndFallback from "./ImageWithFallback";
import type { Promotions } from "~/types/promotions";

export default function PromotionCard({
  promo,
  shouldWrapInLink = true,
  onClick,
}: {
  promo?: Promotions;
  shouldWrapInLink?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <Card className="relative group-hover:-translate-y-2 hover:shadow-lg">
      <ImageWithLoadingAndFallback
        src="/app/assets/placeholder-image.jpg"
        fallbackSrc="/app/assets/placeholder-image.jpg"
        alt={`Изображение акции ${promo?.title}`}
        className="rounded-t-xl w-full h-[160px] object-cover"
        isInCard={true}
      ></ImageWithLoadingAndFallback>
      <CardContent>
        <p className={`font-bold text-base line-clamp-1`}>
          {promo?.title ? promo.title : "нет названия"}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {promo?.description ? promo.description : "нет описания"}
        </p>
      </CardContent>
    </Card>
  );

  return shouldWrapInLink ? (
    <Link className="group" to={`/restaurant/${promo?.restaurant?.id}`}>
      {content}
    </Link>
  ) : (
    <div className="group" onClick={onClick}>
      {content}
    </div>
  );
}
