import { useLoaderData } from "react-router";
import OrderCard from "~/components/Card/OrderCard";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import type { Route } from "../../+types/root";
import ProfileContent from "~/components/Profile/ProfileContent";
import { ProfileService } from "~/api/api.profile";
import type { ApiData } from "~/utils/query-utils";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import type { Orders } from "~/types/order";
import type { AxiosError } from "axios";
import { OrderService } from "~/api/api.order";
import ReviewModal from "~/components/Modals/ReviewModal";
import { useState } from "react";
import { isNullOrUndefined } from "~/utils/utils";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";

const LIMIT = 10;

export async function clientLoader({ request }: Route.LoaderArgs) {
  const user = await ProfileService.fetchProfile();
  return { user };
}

export default function ProfileOrders() {
  const { user } = useLoaderData<typeof clientLoader>();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      ApiData<Orders>,
      AxiosError,
      Orders[],
      [_: string],
      number
    >({
      queryKey: ["profileOrders"],
      queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
        OrderService.fetchOrders(LIMIT, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const { offset, limit, total_records } = lastPage.paginated;
        const nextOffset = offset + limit;
        return nextOffset < total_records ? nextOffset : undefined;
      },
      select: (data) => data.pages.flatMap((page) => page.data),
      staleTime: 1000 * 60 * 5,
      initialPageParam: 0,
    });

  const [selectedOrder, setSelectedOrder] = useState<Orders | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      <ProfileHeader username={user?.username} />

      <ProfileContent>
        {!isLoading && data && data.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data.flat().map((item) => (
              <OrderCard
                key={item.id}
                order={item}
                setSelectedOrder={setSelectedOrder}
              />
            ))}

            {hasNextPage && (
              <PrimaryButton
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="mt-4 mx-auto"
              >
                {isFetchingNextPage ? "Загрузка..." : "Показать ещё"}
              </PrimaryButton>
            )}
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-muted-foreground">
              No orders found.
            </p>
          )
        )}
      </ProfileContent>

      <ReviewModal
        open={!isNullOrUndefined(selectedOrder)}
        onClose={() => {
          setSelectedOrder(undefined);
        }}
        order={selectedOrder}
      ></ReviewModal>
    </div>
  );
}
