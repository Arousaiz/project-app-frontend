import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Modal from "../ui/Modal";
import type { Restaurants } from "~/types/restaurant";
import LoadingSpinner from "../ui/Spinners/LoadingSpinner";
import type { MenuItems } from "~/types/menuItem";

export default function SearchModal({
  query,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
  setQuery,
  isLoading,
  results,
}: {
  query: string;
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (bool: boolean) => void;
  setQuery: (str: string) => void;
  isLoading: boolean;
  results?: { menuItems: MenuItems[]; restaurants: Restaurants[] };
}) {
  return (
    <Modal
      open={isMobileSearchOpen}
      onClose={() => {
        setIsMobileSearchOpen(false);
        setQuery("");
      }}
      size="full"
    >
      <div className="flex flex-col gap-4 p-2">
        <div className="flex items-center gap-2 relative">
          <MagnifyingGlassIcon className="size-5 text-muted-foreground absolute right-2" />
          <input
            type="text"
            value={query}
            autoFocus
            placeholder="Введите ресторан или блюдо..."
            className="input p-2 px-4"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground px-4">
            <LoadingSpinner />{" "}
            <div className="animate-pulse text-sm text-muted-foreground">
              Поиск...
            </div>
          </div>
        )}

        {results?.restaurants.map((r) => (
          <button
            key={`restaurant-${r.id}`}
            onClick={() => {
              setIsMobileSearchOpen(false);
              location.href = `/restaurant/${r.id}`;
            }}
            className="text-left px-2 py-3 bg-accent text-accent-foreground hover:bg-accent/50 rounded-md transition border border-border"
          >
            <span className="font-semibold">{r.name}</span>
            <span className="text-sm text-muted-foreground flex gap-2 mt-1">
              {r.address?.city}
            </span>
          </button>
        ))}

        {results?.menuItems.map((m) => (
          <button
            key={`menuItem-${m.id}`}
            onClick={() => {
              setIsMobileSearchOpen(false);
              location.href = `/restaurant/${m.restaurant.id}?highlight=${m.id}`;
            }}
            className="text-left px-2 py-3 bg-muted text-muted-foreground hover:bg-accent/50 rounded-md transition border border-border"
          >
            <span className="font-semibold">{m.name}</span>
            <span className="text-sm text-muted-foreground flex gap-2 mt-1">
              {m.restaurant?.name}
            </span>
          </button>
        ))}

        {results &&
          results.menuItems.length < 1 &&
          results?.restaurants.length < 1 && (
            <p className="text-muted-foreground text-sm">Ничего не найдено</p>
          )}
      </div>
    </Modal>
  );
}
