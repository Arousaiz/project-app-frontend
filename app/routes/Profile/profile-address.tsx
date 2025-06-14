import { useLoaderData } from "react-router";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import AddressForm from "~/components/Forms/AddressForm";
import { ProfileService } from "~/api/api.profile";
import { isNullOrUndefined } from "~/utils/utils";
import { toast } from "sonner";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export async function clientAction({ request }: Route.ActionArgs) {
  let response = undefined;
  const data = await request.json();
  response = await ProfileService.editAddress(data).catch((error) =>
    console.log(error)
  );

  if (isNullOrUndefined(response)) {
    return { message: "Something went wrong" };
  }

  toast.info("Успешно обновлено");

  return response;
}

export default function ProfileAddress() {
  const { user } = useLoaderData<typeof clientLoader>();
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      <ProfileHeader username={user?.username}></ProfileHeader>
      <ProfileContent>
        <AddressForm address={user?.address} />
      </ProfileContent>
    </div>
  );
}
