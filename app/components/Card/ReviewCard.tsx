import { StarIcon } from "@heroicons/react/20/solid";
import type { Reviews } from "~/types/review";
import { Card } from "./Card";

export default function ReviewCard({ review }: { review?: Reviews }) {
  return (
    <Card className="w-full min-h-32 my-4 rounded-lg shadow flex flex-col p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
            <span>{review?.rating}</span>
            <StarIcon className="w-4 h-4" />
          </div>
          <p className="font-bold text-base line-clamp-1">
            {review?.menuItem?.name ??
              (review?.restaurant?.name
                ? `${review.restaurant.name} (ресторан)`
                : "Без названия")}
          </p>
        </div>

        <p className="text-sm text-muted-foreground font-medium whitespace-nowrap">
          {new Date(review?.createdAt!).toLocaleString()}
        </p>
      </div>

      <div className="mt-3">
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {review?.text}
        </p>
      </div>
    </Card>
  );
}
