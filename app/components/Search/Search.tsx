import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { RestaurantService } from "~/api/api.restaurant";
import { useDebounce } from "@uidotdev/usehooks";
import type { Restaurants } from "~/types/restaurant";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { MenuItems } from "~/types/menuItem";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError, error } = useQuery<
    { menuItems: MenuItems[]; restaurants: Restaurants[] },
    AxiosError
  >({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      RestaurantService.searchCombined(
        localStorage.getItem("city")!,
        debouncedQuery
      ),
    enabled: !!debouncedQuery.trim(),
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <SearchBar
        results={data}
        isOpen={isOpen}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
      ></SearchBar>
    </div>
  );
}
