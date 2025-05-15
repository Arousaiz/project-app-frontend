import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResult from "./SearchResult/SearchResult";
import { RestaurantService } from "~/api/api.restaurant";
import { useFetcher } from "react-router";
import type { Restaurant } from "~/types/restaurant";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Restaurant[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.res) {
      setResults(fetcher.data.res);
    }
  }, [fetcher.data]);

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

  useEffect(() => {
    if (query) {
      fetcher.submit(JSON.stringify(query), {
        method: "post",
        encType: "application/json",
        action: "/action/search",
      });
      setIsOpen(true);
    }
  }, [query]);

  return (
    <div ref={wrapperRef}>
      <SearchBar
        results={results}
        isOpen={isOpen}
        setQuery={setQuery}
      ></SearchBar>
    </div>
  );
}
