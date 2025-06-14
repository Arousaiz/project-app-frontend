import { UserCircleIcon, LogOut, type LucideIcon } from "lucide-react";
import {
  MenuDropDown,
  MenuDropDownButton,
  MenuDropDownItems,
  MenuDropDownItem,
  MenuItemSeparator,
} from "../ui/Menu";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";

export default function ProfileMenu({
  nav,
  handleLogout,
}: {
  nav: {
    to: string;
    title: string;
    icon: LucideIcon;
  }[];
  handleLogout: () => void;
}) {
  return (
    <MenuDropDown>
      <MenuDropDownButton className="">
        <PrimaryButton as="div" size="icon" variant="secondary">
          <UserCircleIcon className="size-8"></UserCircleIcon>
        </PrimaryButton>
      </MenuDropDownButton>
      <MenuDropDownItems className="w-52">
        {nav?.length ? (
          nav.map((link) => (
            <MenuDropDownItem>
              <PrimaryLink
                nav={true}
                to={link.to}
                className="flex justify-between w-full"
              >
                {link.title}
                {link.icon && <link.icon />}
              </PrimaryLink>
            </MenuDropDownItem>
          ))
        ) : (
          <div></div>
        )}
        <MenuItemSeparator />
        <MenuDropDownItem>
          <button
            onClick={handleLogout}
            className="flex items-stretch justify-between text-md/6 font-semibold hover:text-primary cursor-pointer"
          >
            <p className="">Выйти </p>
            <p>
              <LogOut />
            </p>
          </button>
        </MenuDropDownItem>
      </MenuDropDownItems>
    </MenuDropDown>
  );
}
