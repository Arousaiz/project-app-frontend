import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResult from "./SearchResult/SearchResult";
import { RestaurantService } from "~/api/api.restaurant";
import { useFetcher } from "react-router";
import { useDebounce } from "@uidotdev/usehooks";
import type { Restaurants } from "~/types/restaurant";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError, error } = useQuery<
    Restaurants[],
    AxiosError
  >({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      RestaurantService.searchRestaurants(
        localStorage.getItem("city")!,
        debouncedQuery
      ),
    enabled: !!debouncedQuery.trim(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(true);
  }, [debouncedQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef}>
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
