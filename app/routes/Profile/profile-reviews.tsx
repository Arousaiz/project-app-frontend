import { useLoaderData } from "react-router";
import ReviewCard from "~/components/Card/ReviewCard";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import { ReviewService } from "~/api/api.review";
import type { Review } from "~/types/review";
import { ProfileService } from "~/api/api.profile";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  const reviews: Review[] = await ReviewService.fetchReviews();
  return { user, reviews };
}

export default function ProfileReviews() {
  const { user, reviews } = useLoaderData<typeof clientLoader>();
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
