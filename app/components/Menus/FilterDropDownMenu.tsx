import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";
import {
  MenuDropDown,
  MenuDropDownButton,
  MenuDropDownItem,
  MenuDropDownItems,
} from "~/components/ui/Menu";
import { cn } from "~/utils/utils";

type FilterDropDownMenuProps = {
  categories: string[];
  onClick: (category: string) => void;
  hidden: boolean;
  activeCategory?: string;
};

export default function FilterDropDownMenu({
  categories,
  onClick,
  hidden = false,
  activeCategory,
}: FilterDropDownMenuProps) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!categories?.length) return;

    if (activeCategory && categories.includes(activeCategory)) {
      setValue(activeCategory);
    } else {
      setValue(categories[0]);
    }
  }, [categories, activeCategory]);

  return (
    <MenuDropDown>
      <MenuDropDownButton
        className={cn(hidden && "invisible pointer-events-none absolute -z-10")}
      >
        <PrimaryButton as="div" variant="secondary">
          <p>{value}</p>
          <ChevronDownIcon
            aria-hidden="true"
            className="ml-1 my-0.5 size-5 peer:data-open:rotate-180"
          />
        </PrimaryButton>
      </MenuDropDownButton>
      <MenuDropDownItems>
        {categories?.length ? (
          categories.map((category) => (
            <MenuDropDownItem>
              <button
                className="w-full"
                onClick={() => {
                  onClick(category);
                  setValue(category);
                }}
              >
                <div className="">{category}</div>
              </button>
            </MenuDropDownItem>
          ))
        ) : (
          <div></div>
        )}
      </MenuDropDownItems>
    </MenuDropDown>
  );
}
