import { ChevronDownIcon } from "lucide-react";
import { cities } from "~/components/Header/Header";
import {
  MenuDropDown,
  MenuDropDownButton,
  MenuDropDownItems,
  MenuDropDownItem,
} from "../ui/Menu";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";

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
        <PrimaryButton as="div" variant="secondary">
          <p>{city}</p>
          <ChevronDownIcon aria-hidden="true" className="ml-1 my-0.5 size-5" />
        </PrimaryButton>
      </MenuDropDownButton>
      <MenuDropDownItems className="h-52 min-w-52">
        {cities?.length ? (
          cities.map((name) => (
            <MenuDropDownItem className="border-b border-border">
              <button
                className="w-full"
                onClick={() => {
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
