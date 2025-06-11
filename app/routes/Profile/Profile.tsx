import { useLoaderData } from "react-router";
import ProfileForm from "~/components/Forms/ProfileForm";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import { ProfileService } from "~/api/api.profile";
import { isNullOrUndefined } from "~/utils/utils";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export async function clientAction({ request }: Route.ActionArgs) {
  let response = undefined;
  const data = await request.json();
  response = await ProfileService.editInfo(data);

  if (isNullOrUndefined(response)) {
    return { message: "Something went wrong" };
  }

  return response;
}

export default function Profile() {
  const { user } = useLoaderData<typeof clientLoader>();
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      <ProfileHeader username={user?.username}></ProfileHeader>
      <ProfileContent>
        <div className="w-6/12 justify-self-center">
          <ProfileForm person={user}></ProfileForm>
        </div>
      </ProfileContent>
    </div>
  );
}
