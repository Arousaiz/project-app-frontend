import type { Restaurants } from "~/types/restaurant";
import Modal from "../Modal/Modal";
import {
  ComputerDesktopIcon,
  CreditCardIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { RestaurantService } from "~/api/api.restaurant";
import { useState } from "react";
import { RadioGroup } from "../Buttons/Radio";
import { CheckBoxGroup } from "../Buttons/Checkbox";

const options = [
  { value: "Рейтинг", label: "Рейтинг" },
  { value: "Популярность", label: "Популярность" },
  { value: "Быстрая Доставка", label: "Быстрая Доставка" },
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

export const categories = [
  { value: "italian", label: "Итальянская кухня" },
  { value: "japanese", label: "Японская кухня" },
  { value: "chinese", label: "Китайская кухня" },
  { value: "indian", label: "Индийская кухня" },
  { value: "mexican", label: "Мексиканская кухня" },
  { value: "french", label: "Французская кухня" },
  { value: "thai", label: "Тайская кухня" },
  { value: "georgian", label: "Грузинская кухня" },
  { value: "vegan", label: "Веганская кухня" },
  { value: "burger", label: "Бургеры" },
  { value: "pizza", label: "Пицца" },
  { value: "bbq", label: "Барбекю" },
  { value: "sushi", label: "Суши" },
  { value: "seafood", label: "Морепродукты" },
  { value: "korean", label: "Корейская кухня" },
  { value: "russian", label: "Русская кухня" },
  { value: "uzbek", label: "Узбекская кухня" },
  { value: "lebanese", label: "Ливанская кухня" },
  { value: "fastfood", label: "Фастфуд" },
  { value: "desserts", label: "Десерты" },
  { value: "coffee", label: "Кофейни" },
  { value: "bakery", label: "Выпечка" },
  { value: "steakhouse", label: "Стейкхаус" },
  { value: "turkish", label: "Турецкая кухня" },
  { value: "vietnamese", label: "Вьетнамская кухня" },
  { value: "mediterranean", label: "Средиземноморская кухня" },
  { value: "noodles", label: "Лапша" },
  { value: "icecream", label: "Мороженое" },
  { value: "healthy", label: "Здоровое питание" },
];

export default function RestaurantFilters({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  const [activeSortFilters, setActiveSortFilters] = useState<string>("");
  const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>(
    []
  );

  return (
    <Modal open={open} onClose={onClose}>
      <h2>Сортировать по</h2>
      <RadioGroup
        name="my-radio"
        options={options}
        value={activeSortFilters}
        onChange={setActiveSortFilters}
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

      <h2>В меню</h2>
      <RadioGroup
        options={categories}
        name=""
        value={activeSortFilters}
        onChange={setActiveSortFilters}
      />
    </Modal>
  );
}
