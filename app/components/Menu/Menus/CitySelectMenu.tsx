import { ChevronDownIcon } from "lucide-react";
import { cities } from "~/components/Header/Header";
import {
  MenuDropDown,
  MenuDropDownButton,
  MenuDropDownItems,
  MenuDropDownItem,
} from "../Menu";
import PrimaryButton from "~/components/Buttons/PrimaryButton";

export default function CitySelectMenu({
  city,
  setCity,
}: {
  setCity: (city: string) => void;
  city: string | null;
}) {
  return (
    <MenuDropDown className="mx-4">
      <MenuDropDownButton className="rounded-lg">
        <div className="inline-flex items-center justify-center gap-2 p-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:border-ring focus:ring-[3px] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:ring-accent/75 peer">
          <p>{city}</p>
          <ChevronDownIcon aria-hidden="true" className="ml-1 my-0.5 size-5" />
        </div>
      </MenuDropDownButton>
      <MenuDropDownItems className="h-52 min-w-52">
        {cities?.length ? (
          cities.map((name) => (
            <MenuDropDownItem className="border-b border-border">
              <button
                onClick={(e) => {
                  localStorage.setItem("city", name);
                  setCity(name);
                }}
              >
                <span
                  className={city === name ? "font-semibold text-primary" : ""}
                >
                  {name}
                </span>
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
