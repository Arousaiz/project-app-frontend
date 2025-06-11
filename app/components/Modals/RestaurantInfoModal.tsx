import type { Restaurants } from "~/types/restaurant";
import Modal from "../Modal/Modal";
import {
  ComputerDesktopIcon,
  CreditCardIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "~/api/api.restaurant";

export default function RestaurantInfoModal({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["restaurantInfo"],
    queryFn: () => RestaurantService.findRestaurant(id),
  });

  const workingHours = `${data?.data.openTime.toString()}-
            ${data?.data.closeTime.toString()}`;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col">
        <p className="text-3xl font-bold text-center">{data?.data.name}</p>
        <hr className="w-[50%] place-self-center my-2"></hr>
        <p className="text-center text-xl font-bold">Режим работы</p>
        <div className="mx-4">
          <p>Понедельник: {workingHours}</p>
          <p>Вторник: {workingHours}</p>
          <p>Среда: {workingHours}</p>
          <p>Четверг: {workingHours}</p>
          <p>Пятница: {workingHours}</p>
          <p>Суббота: {workingHours}</p>
          <p>Воскресенье: {workingHours}</p>
        </div>
        <hr className="w-[50%] place-self-center my-2"></hr>
        <p className="text-center text-xl font-bold">Адрес</p>
        <div className="mx-4">
          <p>
            {data?.data.address.city +
              ", " +
              data?.data.address.street +
              ", " +
              data?.data.address.house}
          </p>
        </div>
        <hr className="w-[50%] place-self-center my-2"></hr>
        <p className="text-center text-xl font-bold">Оплата</p>
        <div className="flex mx-auto text-center justify-center">
          <div className="flex-col flex w-32 items-center">
            <ComputerDesktopIcon className="size-12"></ComputerDesktopIcon>
            <p>Онлайн - банковской картой</p>
          </div>
          <div className="flex-col flex w-32 items-center">
            <WalletIcon className="size-12"></WalletIcon>
            <p>Наличными</p>
          </div>
          <div className="flex-col flex w-32 items-center">
            <CreditCardIcon className="size-12"></CreditCardIcon>
            <p>Банковской картой при получении</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
