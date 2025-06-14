import { Link, useLoaderData } from "react-router";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import { FavoritesService } from "~/api/api.favorites";
import type { Favorites } from "~/types/favorite";
import { ProfileService } from "~/api/api.profile";
import { FavoritesProvider, useFavorites } from "~/providers/favoritesContext";
import ProductCard from "~/components/Card/ProductCard";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export default function ProfileAddress() {
  const { favorites } = useFavorites();
  const grouped = groupFavoritesByRestaurant(favorites);
  const { user } = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      <ProfileHeader username={user?.username}></ProfileHeader>
      <ProfileContent>
        <div className="flex flex-col">
          {Object.values(grouped).map((group) => (
            <div key={group.restaurant.id}>
              <Link to={`/restaurant/${group.restaurant?.id}`}>
                <h2 className="text-xl font-bold">{group.restaurant.name}</h2>
              </Link>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {group.items.map((item) => (
                  <ProductCard
                    key={item.id}
                    openReview={() => {}}
                    menuItem={item.menuItem}
                    onClick={() => {}}
                    restaurantId={item.menuItem.restaurant.id}
                    id={item.id}
                  ></ProductCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ProfileContent>
    </div>
  );
}

type GroupedFavorites = {
  [restaurantId: string]: {
    restaurant: {
      id: string;
      name: string;
    };
    items: Favorites[];
  };
};

function groupFavoritesByRestaurant(favorites: Favorites[]): GroupedFavorites {
  return favorites.reduce((acc, fav) => {
    const restId = fav.menuItem.restaurant.id;

    if (!acc[restId]) {
      acc[restId] = {
        restaurant: {
          id: restId,
          name: fav.menuItem.restaurant.name,
        },
        items: [],
      };
    }

    acc[restId].items.push(fav);

    return acc;
  }, {} as GroupedFavorites);
}
