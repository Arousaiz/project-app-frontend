import type { Restaurant } from "~/types/restaurant";
import Modal from "../Modal/Modal";
import {
  ComputerDesktopIcon,
  CreditCardIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";

export default function RestaurantInfoModal({
  open,
  onClose,
  restaurant,
}: {
  open: boolean;
  onClose: () => void;
  restaurant: Restaurant;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col">
        <p className="text-3xl font-bold text-center">{restaurant.name}</p>
        <hr className="w-[50%] place-self-center my-2"></hr>
        <p className="text-center text-xl font-bold">Режим работы</p>
        <div className="mx-4">
          <p>Понедельник: {restaurant.operatingHours}</p>
          <p>Вторник: {restaurant.operatingHours}</p>
          <p>Среда: {restaurant.operatingHours}</p>
          <p>Четверг: {restaurant.operatingHours}</p>
          <p>Пятница: {restaurant.operatingHours}</p>
          <p>Суббота: {restaurant.operatingHours}</p>
          <p>Воскресенье: {restaurant.operatingHours}</p>
        </div>
        <hr className="w-[50%] place-self-center my-2"></hr>
        <p className="text-center text-xl font-bold">Адрес</p>
        <div className="mx-4">
          <p>
            {restaurant.address.city +
              ", " +
              restaurant.address.street +
              ", " +
              restaurant.address.house}
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
