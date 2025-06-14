import SearchResult from "./SearchResult";
import type { Restaurants } from "~/types/restaurant";
import { useState } from "react";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";
import SearchModal from "~/components/Modals/SearchModal";
import type { MenuItems } from "~/types/menuItem";
import SearchInput from "./SearchInput";
import { Search } from "lucide-react";

type SearchBarProps = {
  query: string;
  setQuery: (str: string) => void;
  results?: { menuItems: MenuItems[]; restaurants: Restaurants[] };
  isOpen: boolean;
  isLoading: boolean;
};

export default function SearchBar({
  query,
  setQuery,
  results,
  isOpen,
  isLoading,
}: SearchBarProps) {
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
          <Search className="size-5" />
        </PrimaryButton>
      </div>
      <div className="relative w-full hidden lg:flex">
        <SearchInput query={query} setQuery={setQuery} isLoading={isLoading} />
        {results !== undefined && (
          <SearchResult results={results} isOpen={isOpen} />
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
