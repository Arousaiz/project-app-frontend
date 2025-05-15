import { UserIcon } from "@heroicons/react/20/solid";
import { Link, useLoaderData } from "react-router";
import PrimaryButton from "~/components/Buttons/PrimaryButton";
import OrderCard from "~/components/Card/OrderCard";
import ReviewCard from "~/components/Card/ReviewCard";
import CredentialsForm from "~/components/Forms/CredentialsForm";
import ProfileForm from "~/components/Forms/ProfileForm";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import { fetchUser, requireAuthCookie } from "~/services/session.server";
import ProfileContent from "~/components/Profile/ProfileContent";
import AddressForm from "~/components/Forms/AddressForm";
import { FavoritesService } from "~/api/api.favorites";
import type { Favorites } from "~/types/favorite";
import FavoriteCard from "~/components/Card/FavoriteProfileCard";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await fetchUser(request);
  const token = await requireAuthCookie(request);
  const favorites: Favorites[] = await FavoritesService.fetchFavorites(token);
  return { user, favorites };
}

export default function ProfileAddress() {
  const { user, favorites } = useLoaderData<typeof loader>();
  return (
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
  );
}
