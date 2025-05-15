import { Menu, MenuItems, MenuItem } from "@headlessui/react";
import FilterDropDownButton from "../FilterDropDownButton/FilterDropDownButton";
import { Link } from "react-router";

export default function FilterDropDownMenu({
  children,
  categories,
  onClick,
}: React.PropsWithChildren<{
  categories?: string[];
  onClick: (category: string) => void;
}>) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <FilterDropDownButton>{children}</FilterDropDownButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-gray-300 bg-white dark:border-gray-900 dark:bg-gray-900 text-sm/6 dark:text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="flex flex-col">
          <MenuItem>
            <button onClick={() => onClick("")}>
              <div className="font-bold px-4 py-2 dark:data-focus:bg-gray-100 dark:data-focus:text-gray-900 data-focus:bg-gray-200 data-focus:outline-hidden hover:text-gray-500">
                Все
              </div>
            </button>
          </MenuItem>
          {categories?.length ? (
            categories.map((name) => (
              <MenuItem>
                <button onClick={() => onClick(name)}>
                  <div className="font-bold px-4 py-2 dark:data-focus:bg-gray-100 dark:data-focus:text-gray-900 data-focus:bg-gray-200 data-focus:outline-hidden hover:text-gray-500">
                    {name}
                  </div>
                </button>
              </MenuItem>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}
