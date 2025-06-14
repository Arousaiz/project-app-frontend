import { Link } from "react-router";
import type { MenuItems } from "~/types/menuItem";
import type { Restaurants } from "~/types/restaurant";

type SearchResultProps = {
  results: { menuItems: MenuItems[]; restaurants: Restaurants[] };
  isOpen: boolean;
};

export default function SearchResult({ results, isOpen }: SearchResultProps) {
  const { restaurants, menuItems } = results;
  const hasResults = restaurants.length > 0 || menuItems.length > 0;

  return (
    <>
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 min-w-96 hidden sm:block bg-popover/90 backdrop-blur-md border border-border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
          {hasResults ? (
            <>
              {restaurants.map((r) => (
                <Link
                  to={`/restaurant/${r.id}`}
                  key={`restaurant-${r.id}`}
                  className="flex flex-col items-start px-4 py-2 hover:bg-accent/60 transition-colors duration-300 border-b last:border-none"
                >
                  <span className="text-lg font-bold truncate">{r.name}</span>
                  <span className="text-sm text-muted-foreground truncate">
                    {r.address?.city || "Город неизвестен"}
                  </span>
                </Link>
              ))}

              {menuItems.map((m) => (
                <Link
                  to={`/restaurant/${m.restaurant.id}?highlight=${m.id}`}
                  key={`menuItem-${m.id}`}
                  className="flex flex-col items-start px-4 py-2 hover:bg-accent/60 transition-colors duration-300 border-b last:border-none"
                >
                  <span className="text-lg font-bold truncate">{m.name}</span>
                  <span className="text-sm text-muted-foreground truncate">
                    {m.restaurant?.name || "Ресторан неизвестен"}
                  </span>
                </Link>
              ))}
            </>
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </>
  );
}
