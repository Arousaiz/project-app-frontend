import { InformationCircleIcon, StarIcon } from "@heroicons/react/20/solid";
import { TruckIcon } from "@heroicons/react/20/solid";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import type { Reviews } from "~/types/review";
import PrimaryButton from "../Buttons/PrimaryButton";
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
  const { data, isLoading } = useQuery({
    queryKey: ["restaurantInfo"],
    queryFn: () => RestaurantService.findRestaurant(id),
  });
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[16/7] lg:aspect-[16/4] shadow-xl">
        <ImageWithLoadingAndFallback
          size="w-full h-full"
          src="/app/assets/placeholder-image.jpg"
          fallbackSrc="/app/assets/placeholder-image.jpg"
          alt={`Изображение ресторана`}
          className="w-full h-full object-cover"
        ></ImageWithLoadingAndFallback>
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
        <div className="max-w-[72rem] lg:min-w-3xl">
          <p className="text-3xl font-bold text-center">
            Отзывы от пользователей
          </p>
          {data?.data.reviews?.length != 0 ? (
            <div>
              {data?.data.reviews?.map((item) => (
                <ReviewCard review={item}></ReviewCard>
              ))}
            </div>
          ) : (
            <div className="mt-10 mb-10 text-3xl font-bold text-center">
              Отзывы отсутствуют. Будьте первым!
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
