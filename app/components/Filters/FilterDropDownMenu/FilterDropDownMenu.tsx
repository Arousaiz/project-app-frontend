import { MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import PrimaryButton from "~/components/Buttons/PrimaryButton";
import {
  MenuDropDown,
  MenuDropDownButton,
  MenuDropDownItem,
  MenuDropDownItems,
} from "~/components/Menu/Menu";
import type { Categories } from "~/types/category";
import type { Cuisines } from "~/types/restaurant";

type FilterDropDownMenuProps = {
  value: string | null;
  categories?: string[];
  onClick: (category: string) => void;
  isActive?: boolean;
};

export default function FilterDropDownMenu({
  value,
  categories,
  onClick,
  isActive = false,
}: FilterDropDownMenuProps) {
  return (
    <MenuDropDown>
      <MenuDropDownButton className="rounded-3xl">
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:border-ring focus:ring-[3px] bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 focus:ring-secondary/75 peer">
          <p>{value}</p>
          <ChevronDownIcon
            aria-hidden="true"
            className="ml-1 my-0.5 size-5 peer:data-open:rotate-180"
          />
        </div>
      </MenuDropDownButton>
      <MenuDropDownItems>
        {categories?.length ? (
          categories.map((category) => (
            <MenuDropDownItem>
              <button onClick={() => onClick(category)}>
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
