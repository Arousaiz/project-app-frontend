import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Modal from "../Modal/Modal";
import type { Restaurants } from "~/types/restaurant";

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
  results?: Restaurants[];
}) {
  return (
    <Modal
      open={isMobileSearchOpen}
      onClose={() => setIsMobileSearchOpen(false)}
      size="full"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <MagnifyingGlassIcon className="size-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            autoFocus
            placeholder="Введите ресторан или блюдо..."
            className="flex-1 border-b border-border bg-transparent outline-none text-base py-2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {isLoading && <p className="text-sm text-muted-foreground">Поиск...</p>}

        {results && results.length > 0 && (
          <div className="flex flex-col divide-y border-t mt-2 max-h-[60vh] overflow-y-auto">
            {results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  location.href = `/restaurant/${item.id}`; // или useNavigate()
                }}
                className="text-left px-2 py-3 hover:bg-accent rounded-md transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {results && results.length === 0 && (
          <p className="text-muted-foreground text-sm">Ничего не найдено</p>
        )}
      </div>
    </Modal>
  );
}
