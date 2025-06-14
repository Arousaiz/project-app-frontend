import type { Restaurants } from "~/types/restaurant";
import Modal from "../ui/Modal";
import {
  ComputerDesktopIcon,
  CreditCardIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "~/api/api.restaurant";
import React from "react";

const formatTime = (time: string) => time.slice(0, 5);

export default function RestaurantInfoModal({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurantInfo", id],
    queryFn: () => RestaurantService.findRestaurant(id),
    enabled: open && !!id,
  });

  if (isLoading) {
    return (
      <Modal open={open} onClose={onClose}>
        <div className="p-8 text-center">Загрузка...</div>
      </Modal>
    );
  }

  if (!data || isError) {
    return (
      <Modal open={open} onClose={onClose}>
        <div className="p-8 text-center text-red-500">
          Ошибка загрузки данных
        </div>
      </Modal>
    );
  }

  const restaurant = data.data;

  const workingHours = `${formatTime(restaurant.openTime.toString())} -
            ${formatTime(restaurant.closeTime.toString())}`;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col p-6 space-y-4">
        <p className="text-3xl font-bold text-center">{restaurant.name}</p>
        <hr className="w-1/2 mx-auto" />

        <section>
          <h3 className="text-xl font-semibold text-center">Режим работы</h3>
          <ul className="grid grid-cols-2 gap-y-1 leading-relaxed">
            {[
              "Понедельник",
              "Вторник",
              "Среда",
              "Четверг",
              "Пятница",
              "Суббота",
              "Воскресенье",
            ].map((day) => (
              <React.Fragment key={day}>
                <li>{day}</li>
                <li className="text-right">{workingHours}</li>
              </React.Fragment>
            ))}
          </ul>
        </section>

        <hr className="w-1/2 mx-auto" />

        <section>
          <h3 className="text-xl font-semibold text-center">Адрес</h3>
          <p className="text-center">
            {`${restaurant.address.city}, ${restaurant.address.street}, ${restaurant.address.house}`}
          </p>
        </section>

        <hr className="w-1/2 mx-auto" />

        <section>
          <h3 className="text-xl font-semibold text-center">Оплата</h3>
          <div className="flex justify-around flex-wrap gap-4 mt-2">
            <div className="flex flex-col items-center w-32 text-center">
              <ComputerDesktopIcon className="w-10 h-10 text-blue-600" />
              <p>Онлайн - картой</p>
            </div>
            <div className="flex flex-col items-center w-32 text-center">
              <WalletIcon className="w-10 h-10 text-green-600" />
              <p>Наличными</p>
            </div>
            <div className="flex flex-col items-center w-32 text-center">
              <CreditCardIcon className="w-10 h-10 text-purple-600" />
              <p>Картой при получении</p>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
}
