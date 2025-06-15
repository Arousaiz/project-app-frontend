import { InformationCircleIcon, StarIcon } from "@heroicons/react/20/solid";
import { TruckIcon } from "@heroicons/react/20/solid";
import Modal from "../ui/Modal";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import type { Reviews } from "~/types/review";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import ImageWithLoadingAndFallback from "./ImageWithFallback";
import RestaurantInfoModal from "../Modals/RestaurantInfoModal";
import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "~/api/api.restaurant";

export default function RestaurantHeaderCard({
  id,
}: {
  onClick?: () => void;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["restaurantInfo", id],
    queryFn: () => RestaurantService.findRestaurant(id),
    // enabled: open,
  });

  const {
    data: reviewData,
    isLoading: isLoadingReviews,
    isError,
  } = useQuery({
    queryKey: ["restaurantReviews", id],
    queryFn: () => RestaurantService.fetchReviews(id),
    enabled: open1 && !!id,
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[16/7] lg:aspect-[16/4] shadow-xl">
        {data?.data?.img_url ? (
          <ImageWithLoadingAndFallback
            size="w-full h-full"
            src={`https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${data.data.img_url}`}
            fallbackSrc="/app/assets/placeholder-image.jpg"
            alt="Изображение ресторана"
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageWithLoadingAndFallback
            size="w-full h-full"
            src=""
            fallbackSrc="/app/assets/placeholder-image.jpg"
            alt="Изображение ресторана"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-4 left-4 w-[calc(100%-2rem)]">
          <div className="flex gap-2 overflow-x-auto sm:overflow-visible flex-nowrap scrollbar-hide pr-2">
            <PrimaryButton
              onClick={() => setOpen(true)}
              className="flex-shrink-0"
            >
              Информация
              <InformationCircleIcon className="size-5 ml-1" />
            </PrimaryButton>
            <PrimaryButton
              onClick={() => setOpen1(true)}
              className="flex-shrink-0"
            >
              Рейтинг
              <StarIcon className="size-5 ml-1" />
            </PrimaryButton>
            <PrimaryButton className="flex-shrink-0">
              Доставка
              <TruckIcon className="size-5 ml-1" />
            </PrimaryButton>
          </div>
        </div>
      </div>
      <RestaurantInfoModal
        open={open}
        onClose={() => setOpen(false)}
        id={id}
      ></RestaurantInfoModal>
      <Modal open={open1} onClose={() => setOpen1(false)}>
        <div className="w-full">
          <p className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Отзывы от пользователей
          </p>

          {isLoading ? (
            <div className="text-center my-10 text-muted-foreground">
              Загрузка отзывов...
            </div>
          ) : isError ? (
            <div className="text-center my-10 text-red-500">
              Ошибка при загрузке отзывов
            </div>
          ) : reviewData?.data?.length ? (
            <div className="space-y-4">
              {reviewData.data.map((item) => (
                <ReviewCard key={item.id} review={item} />
              ))}
            </div>
          ) : (
            <div className="my-12 text-xl sm:text-2xl font-semibold text-center text-muted-foreground">
              Отзывы отсутствуют. Будьте первым!
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
