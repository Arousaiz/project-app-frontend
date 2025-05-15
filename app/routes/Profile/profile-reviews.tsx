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
import { ReviewService } from "~/api/api.review";
import type { Review } from "~/types/review";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuthCookie(request);
  const user = await fetchUser(request);
  const reviews: Review[] = await ReviewService.fetchReviews(token);
  return { user, reviews };
}

export default function ProfileReviews() {
  const { user, reviews } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      <ProfileHeader username={user?.username}></ProfileHeader>
      <ProfileContent>
        {reviews.map((item) => (
          <ReviewCard review={item}></ReviewCard>
        ))}
      </ProfileContent>
    </div>
  );
}
