import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchResult from "../SearchResult/SearchResult";
import type { Restaurants } from "~/types/restaurant";
import { useState } from "react";
import { Link } from "react-router";
import PrimaryButton from "~/components/Buttons/PrimaryButton";
import Modal from "~/components/Modal/Modal";
import SearchModal from "~/components/Modals/SearchModal";
import LoadingSpinner from "~/components/Spinners/LoadingSpinner";

export default function SearchBar({
  query,
  setQuery,
  results,
  isOpen,
  isLoading,
}: {
  query: string;
  setQuery: (str: string) => void;
  results?: Restaurants[];
  isOpen: boolean;
  isLoading: boolean;
}) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <div className="w-auto sm:w-full  max-w-sm min-w-0">
      <div className="lg:hidden p-2">
        <PrimaryButton
          variant="ghost"
          size="icon"
          className="flex items-center space-x-2 border rounded-lg"
          onClick={() => setIsMobileSearchOpen(true)}
        >
          <MagnifyingGlassIcon className="size-5" />
        </PrimaryButton>
      </div>
      <div className="relative w-full hidden lg:flex">
        <input
          className="w-full bg-transparent text-sm border border-border rounded-lg pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-ring shadow-sm focus:shadow"
          placeholder="Рестораны, меню..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute top-0 end-0 h-full flex items-center p-2.5">
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <MagnifyingGlassIcon className="size-5 mx-auto" />
          )}
        </div>
        {results !== undefined && (
          <SearchResult results={results} isOpen={isOpen}></SearchResult>
        )}
      </div>
      <SearchModal
        query={query}
        results={results}
        isMobileSearchOpen={isMobileSearchOpen}
        setIsMobileSearchOpen={setIsMobileSearchOpen}
        setQuery={setQuery}
        isLoading={isLoading}
      ></SearchModal>
    </div>
  );
}
