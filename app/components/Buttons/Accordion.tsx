import { ArrowDownCircleIcon, ArrowDownIcon, ArrowDownTrayIcon, BarsArrowDownIcon, ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react"

export default function Accordion({children, label, id} : React.PropsWithChildren<{label: string, id: string}>) {
    const [open, setOpen] = useState(false);

    return(
        <div className="my-4">
            <input
            id={id}
            type="checkbox"
            className="peer sr-only"/>
            <label
            htmlFor={id}
            className="w-96 md:w-[640px] lg:w-[800px] select-none flex justify-between items-center bg-neutral-100 dark:bg-gray-400/30 p-4 rounded-2xl peer-checked:rounded-b-[0px] peer-checked:border-b border-0 border-gray-300 dark:border-gray-700 mt-5 text-gray-950 hover:text-gray-500 dark:text-white"
            onClick={() => setOpen(!open)}>
                {label}
                <ChevronDownIcon className={`size-6 ${open ? 'rotate-180' : '' } justify-self-end`}></ChevronDownIcon>
            </label>
            <div className="hidden peer-checked:h-[200px] md:peer-checked:h-[150px] peer-checked:flex transition-[height] w-96 md:w-[640px] lg:w-[800px] duration-1000 ease-in-out bg-gray-200 dark:bg-gray-900 rounded-b-3xl p-6">
                {children}
            </div>
        </div>
    )
}