import { useLoaderData } from "react-router";
import ReviewCard from "~/components/Card/ReviewCard";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import { ReviewService } from "~/api/api.review";
import type { Reviews } from "~/types/review";
import { ProfileService } from "~/api/api.profile";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ApiData } from "~/utils/query-utils";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export default function ProfileReviews() {
  const { user } = useLoaderData<typeof clientLoader>();
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<ApiData<Reviews>, unknown, Reviews[], [string], number>({
    queryKey: ["profileReviews"],
    queryFn: ({ pageParam = 0 }) => ReviewService.fetchReviews(50, pageParam),
    getNextPageParam: (lastPage) => {
      const { offset, limit, total_records } = lastPage.paginated;
      const nextOffset = offset + limit;
      return nextOffset < total_records ? nextOffset : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      <ProfileHeader username={user.username} />
      <ProfileContent>
        {isLoading && <p>Loading...</p>}

        {reviews && reviews.length > 0
          ? reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          : !isLoading && (
              <p className="text-center text-muted-foreground">
                Отзывов не найдено
              </p>
            )}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn mt-4"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </ProfileContent>
    </div>
  );
}
