import type { Cuisines, Restaurants } from "~/types/restaurant";
import Modal from "../ui/Modal";
import {
  ComputerDesktopIcon,
  CreditCardIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "~/api/api.restaurant";
import { useState } from "react";
import { RadioGroup } from "../ui/Buttons/Radio";
import { CheckBoxGroup } from "../ui/Buttons/Checkbox";

const options = [
  { value: "rating", label: "Рейтинг" },
  { value: "id", label: "Популярность" },
  { value: "name", label: "Быстрая Доставка" },
];

const options1 = [
  { value: "Акции", label: "Акции" },
  { value: "Открытые", label: "Открытые" },
  { value: "Предзаказ", label: "Навынос" },
];

const options2 = [
  { value: "Картой курьеру", label: "Картой курьеру" },
  { value: "Картой онлайн", label: "Картой онлайн" },
  { value: "Наличными", label: "Наличными" },
];

export default function RestaurantFilters({
  open,
  onClose,
  id,
  cuisines,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
  cuisines?: Cuisines[];
  selectedCategory: string;
  sortBy: string;
  setSelectedCategory: (str: string) => void;
  setSortBy: (str: string) => void;
}) {
  const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>(
    []
  );

  return (
    <Modal open={open} onClose={onClose}>
      <h2>Сортировать по</h2>
      <RadioGroup
        name="my-radio"
        options={options}
        value={sortBy}
        onChange={setSortBy}
      />

      <h2>Опции</h2>
      <CheckBoxGroup
        name="my-radio"
        options={options1}
        values={activeCategoryFilters}
        onChange={setActiveCategoryFilters}
      />

      <h2>Варианты оплаты</h2>
      <CheckBoxGroup
        name="my-radio"
        options={options2}
        values={activeCategoryFilters}
        onChange={setActiveCategoryFilters}
      />
      {cuisines && (
        <div>
          <h2>В меню</h2>
          <RadioGroup
            options={cuisines?.map((cuisine) => {
              return { value: cuisine.name, label: cuisine.name };
            })}
            name=""
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      )}
    </Modal>
  );
}
