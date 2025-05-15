import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router";
import type { Restaurant } from "~/types/restaurant";

export default function SearchResult({
  results,
  isOpen,
}: {
  results: Restaurant[];
  isOpen: boolean;
}) {
  return (
    <div>
      {isOpen && results.length > 0 && (
        <div className="absolute flex flex-col left-0 right-0 mt-1 bg-gray-600/50 border border-gray-600 rounded shadow-lg z-10 max-h-60 overflow-auto">
          {results.map((item) => (
            <Link
              to={`/restaurant/${item.id}`}
              key={item.id}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
