import { UserCircleIcon, LogOut, type LucideIcon } from "lucide-react";
import NavigationLink from "~/components/Header/NavigationLink";
import {
  MenuDropDown,
  MenuDropDownButton,
  MenuDropDownItems,
  MenuDropDownItem,
  MenuItemSeparator,
} from "../Menu";
import PrimaryButton from "~/components/Buttons/PrimaryButton";

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
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:border-ring focus:ring-[3px] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:ring-accent/75 hover:scale-115 peer">
          <UserCircleIcon className="size-8"></UserCircleIcon>
        </div>
      </MenuDropDownButton>
      <MenuDropDownItems className="w-52">
        {nav?.length ? (
          nav.map((link) => (
            <MenuDropDownItem>
              <NavigationLink to={link.to} className="flex justify-between">
                {link.title}
                {link.icon && <link.icon />}
              </NavigationLink>
            </MenuDropDownItem>
          ))
        ) : (
          <div></div>
        )}
        <MenuItemSeparator />
        <MenuDropDownItem>
          <button className="w-full" onClick={() => handleLogout()}>
            <div className="flex justify-between text-md/6 font-semibold hover:text-primary cursor-pointer">
              <p className="">Выйти</p>
              <LogOut />
            </div>
          </button>
        </MenuDropDownItem>
      </MenuDropDownItems>
    </MenuDropDown>
  );
}
