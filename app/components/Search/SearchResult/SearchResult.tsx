import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router";
import type { Restaurants } from "~/types/restaurant";

export default function SearchResult({
  results,
  isOpen,
}: {
  results: Restaurants[];
  isOpen: boolean;
}) {
  return (
    <>
      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 min-w-96 hidden sm:flex flex-col bg-popover/90 backdrop-blur-md border border-border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto animate-fade-in transition-all duration-150">
          {results.map((item) => (
            <Link
              to={`/restaurant/${item.id}`}
              key={item.id}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent/60 transition-colors truncate"
            >
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
