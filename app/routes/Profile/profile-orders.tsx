import { useLoaderData } from "react-router";
import OrderCard from "~/components/Card/OrderCard";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import { ProfileService } from "~/api/api.profile";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export default function ProfileOrders() {
  const { user } = useLoaderData<typeof clientLoader>();
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      <ProfileHeader username={user?.username}></ProfileHeader>
      <ProfileContent>
        <OrderCard></OrderCard>
      </ProfileContent>
    </div>
  );
}
