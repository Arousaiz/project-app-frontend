import { MenuButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function FilterDropDownButton({children}: React.PropsWithChildren){
    return(
        <div>
        <MenuButton className="h-8 min-w-16 inline-flex w-full justify-center rounded-3xl bg-blue-600 dark:bg-gray-600 px-2 py-1 me-2 text-sm font-semibold text-white shadow ring-blue-300 ring-inset hover:bg-blue-800 dark:hover:bg-gray-400 dark:focus:bg-gray-400">
          {children}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5" />
        </MenuButton>
      </div>
    )
}
