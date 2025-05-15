import { InformationCircleIcon, StarIcon } from "@heroicons/react/20/solid";
import InfoButton from "../Buttons/InfoButton";
import { TruckIcon } from "@heroicons/react/20/solid";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import type { Review } from "~/types/review";

export default function RestaurantHeaderCard({
  onSubmit,
  reviews,
}: {
  onSubmit?: () => void;
  reviews?: Review[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 w-full h-80">
      <div className="relative h-72">
        <img
          src="/app/assets/orig.jpg"
          className="rounded-4xl w-full h-72 object-cover object-center absolute"
        ></img>
        <div className="absolute bottom-4 left-4 flex flex-row">
          <InfoButton
            onSubmit={onSubmit}
            icon={
              <InformationCircleIcon className="size-6"></InformationCircleIcon>
            }
            label={"Info"}
          ></InfoButton>
          <InfoButton
            onSubmit={() => setOpen(true)}
            icon={<StarIcon className="size-6"></StarIcon>}
            label={"Rating"}
          ></InfoButton>
          <InfoButton
            icon={<TruckIcon className="size-6"></TruckIcon>}
            label={"Delivery"}
          ></InfoButton>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="max-w-[72rem] lg:min-w-3xl">
          <p className="text-3xl font-bold text-center">
            Отзывы от пользователей
          </p>
          {reviews?.length != 0 ? (
            <div>
              {reviews?.map((item) => (
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
