import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { Children } from "react";

type MenuDropDownProps = {
  value?: string | null;
  children?: React.ReactNode;
  className?: string;
};

function MenuDropDown({ className, children }: MenuDropDownProps) {
  return (
    <Menu as="div" className={`hidden sm:block max-w-25 ${className}`}>
      {children}
    </Menu>
  );
}

function MenuDropDownButton({ className, children }: MenuDropDownProps) {
  return (
    <MenuButton
      className={`inline-flex justify-center  data-hover:bg-accent/50 data-open:bg-accent/25 ${className}`}
    >
      {children}
      {/*  h-8 min-w-16*/}
    </MenuButton>
  );
}

function MenuDropDownItems({ className, children }: MenuDropDownProps) {
  return (
    <MenuItems
      transition
      anchor="bottom end"
      className={`flex flex-col origin-top-right rounded-xl border bg-sidebar text-sidebar-foreground text-sm/6 transition duration-200 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 overflow-y-auto data-open:z-[1000] ${className}`}
    >
      {children}
    </MenuItems>
  );
}

function MenuDropDownItem({ className, children }: MenuDropDownProps) {
  return (
    <MenuItem>
      <div
        className={`font-bold px-4 py-2  data-focus:bg-accent/75 data-focus:outline-hidden ${className}`}
      >
        {children}
      </div>
    </MenuItem>
  );
}

function MenuItemSeparator({ className = "" }: { className?: string }) {
  return <div className={`my-1 h-px bg-border ${className}`} />;
}

export {
  MenuDropDown,
  MenuDropDownButton,
  MenuDropDownItems,
  MenuDropDownItem,
  MenuItemSeparator,
};
