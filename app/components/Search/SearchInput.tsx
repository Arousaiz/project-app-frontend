import LoadingSpinner from "../ui/Spinners/LoadingSpinner";
import { Search } from "lucide-react";

type SearchInputProps = {
  query: string;
  setQuery: (q: string) => void;
  isLoading: boolean;
};

export default function SearchInput({
  query,
  setQuery,
  isLoading,
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        className="w-full bg-transparent text-sm border border-border rounded-lg pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-ring shadow-sm focus:shadow"
        placeholder="Рестораны, меню..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute top-0 end-0 h-full flex items-center p-2.5">
        {isLoading ? <LoadingSpinner /> : <Search className="size-5 mx-auto" />}
      </div>
    </div>
  );
}
