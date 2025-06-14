import Modal from "../ui/Modal";
import { useState } from "react";
import { RadioGroup } from "../ui/Buttons/Radio";

const options = [
  { value: "Рейтинг", label: "Рейтинг" },
  { value: "Популярность", label: "Популярность" },
  { value: "Цена", label: "Цена" },
  { value: "Новизна", label: "Новизна" },
];

export default function MenuFilters({
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
    </Modal>
  );
}
