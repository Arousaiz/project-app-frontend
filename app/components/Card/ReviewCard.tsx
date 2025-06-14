import { StarIcon } from "@heroicons/react/20/solid";
import type { Reviews } from "~/types/review";
import { Card } from "./Card";

export default function ReviewCard({ review }: { review?: Reviews }) {
  return (
    <Card className="w-full min-h-32 mx-auto my-4 rounded-lg shadow flex flex-col relative p-4">
      <div className="flex justify-between">
        <div className="flex">
          <div className="mt-1 mx-4 flex">
            <p className="font-semibold">{review?.rating}</p>
            <StarIcon className="size-4 mt-1 ml-1 text-yellow-300" />
          </div>
          <p className="font-bold mt-1 mx-4 line-clamp-1">
            {review?.menuItem?.name ??
              (review?.restaurant?.name
                ? `${review.restaurant.name} (ресторан)`
                : "Без названия")}
          </p>
        </div>
        <p className="text-muted-foreground font-medium mt-1 mx-4 line-clamp-1">
          {new Date(review?.createdAt!).toLocaleString()}
        </p>
      </div>
      <div className="line-clamp-6 mx-4">
        <p>{review?.text}</p>
      </div>
    </Card>
  );
}
