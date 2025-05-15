import { StarIcon } from "@heroicons/react/20/solid";
import type { Review } from "~/types/review";

export default function ReviewCard({ review }: { review?: Review }) {
  console.log(review?.createdAt);
  return (
    <div className="w-full min-h-32 md:w-9/12 mx-auto my-4 bg-white dark:bg-gray-900 rounded-lg shadow flex flex-col relative p-4">
      <div className="flex justify-between">
        <div className="flex">
          <div className="mt-1 mx-4 flex">
            <p className=" text-gray-700 dark:text-white font-semibold">
              {review?.rating}
            </p>
            <StarIcon className="size-4 mt-1 ml-1 text-yellow-300"></StarIcon>
          </div>
          <p className="text-gray-700 dark:text-white font-bold mt-1 mx-4 line-clamp-1">
            {review?.menuItem?.name}
          </p>
        </div>
        <p className="text-gray-700/50 dark:text-white/50 font-medium mt-1 mx-4 line-clamp-1">
          {new Date(review?.createdAt!).toLocaleString()}
        </p>
      </div>
      <div className="line-clamp-6 mx-4">
        <p>{review?.text}</p>
      </div>
    </div>
  );
}
