import { Link, useLoaderData } from "react-router";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import { FavoritesService } from "~/api/api.favorites";
import type { Favorites } from "~/types/favorite";
import FavoriteCard from "~/components/Card/FavoriteProfileCard";
import { ProfileService } from "~/api/api.profile";
import { FavoritesProvider } from "~/providers/favoritesContext";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  const favorites: Favorites[] = await FavoritesService.fetchFavorites();
  return { user, favorites };
}

export default function ProfileAddress() {
  const { user, favorites } = useLoaderData<typeof clientLoader>();
  return (
    <FavoritesProvider>
      <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
        <ProfileHeader username={user?.username}></ProfileHeader>
        <ProfileContent>
          <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 justify-center items-center sm:mx-4">
            {favorites.map((item) => (
              <div>
                <Link to={`/restaurant/${item.restaurant.id}`}>
                  <FavoriteCard
                    menuItem={item.menuItem}
                    restaurantId={item.restaurant.id}
                  ></FavoriteCard>
                </Link>
              </div>
            ))}
          </div>
        </ProfileContent>
      </div>
    </FavoritesProvider>
  );
}
