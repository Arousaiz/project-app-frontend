import { StarIcon } from "@heroicons/react/20/solid";

export default function OrderCard() {
  return (
    <div className="w-full md:w-9/12 mx-auto my-4 bg-white dark:bg-gray-900 rounded-lg shadow flex flex-col relative p-4">
      <div className="flex justify-between h-8">
        <p className="text-gray-700 dark:text-white font-bold text-xl mt-1 mx-4 line-clamp-1">
          Mak.by
        </p>
        <p className="text-gray-700/50 dark:text-white/50 font-medium mt-1 mx-4 line-clamp-1">
          2 days ago
        </p>
        <p className="text-gray-700 dark:text-white font-normal mt-1 mx-4 line-clamp-1 bg-green-600 rounded p-1">
          delivered
        </p>
      </div>
      <div className="flex flex-col mx-4 my-2">
        <div>
          <p>Burger</p>
          <p>19p - 3x.</p>
        </div>
      </div>
      <div className="flex flex-col mx-4 my-2">
        <p>Products: 19p</p>
        <p>Delivery: 0p</p>
        <p>Sum: 19p</p>
      </div>
    </div>
  );
}
