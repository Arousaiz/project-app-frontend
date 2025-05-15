import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchResult from "../SearchResult/SearchResult";
import type { Restaurant } from "~/types/restaurant";

export default function SearchBar({
  setQuery,
  results,
  isOpen,
}: {
  setQuery?: any;
  results: Restaurant[];
  isOpen: boolean;
}) {
  return (
    <div className="hidden sm:flex w-full max-w-sm min-w-[200px]">
      <div className="relative w-full">
        <input
          className="w-full bg-transparent placeholder:text-gray-400  text-gray-600 dark:text-gray-200 text-sm border border-gray-600 rounded-lg pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-blue-600 hover:border-blue-300 dark:focus:border-sky-700 dark:hover:border-sky-500 shadow-sm focus:shadow"
          placeholder="Restaurants..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="absolute top-0 end-0 h-full flex items-center rounded-e-lg bg-blue-700 dark:bg-sky-700 p-2.5 border border-blue-700 dark:border-sky-700 text-center text-sm text-gray-200 transition-all shadow-sm hover:shadow focus:bg-blue-800 dark:focus:bg-sky-800 focus:shadow-none active:bg-blue-500 dark:active:bg-sky-600 hover:bg-blue-600 dark:hover:bg-sky-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <MagnifyingGlassIcon className="size-5 mx-auto" />
          Search
        </button>
        <SearchResult results={results} isOpen={isOpen}></SearchResult>
      </div>
    </div>
  );
}
