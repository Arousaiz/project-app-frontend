import {
  ArrowDownCircleIcon,
  ArrowDownIcon,
  ArrowDownTrayIcon,
  BarsArrowDownIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { useState } from "react";

type AccordionGroupProps = {
  children: React.ReactElement<AccordionProps>[];
  singleOpen?: boolean;
  title: string;
};

type AccordionProps = {
  label: string;
  className?: string;
  id: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

// export default function Accordion({
//   children,
//   label,
//   id,
//   isOpen,
//   onToggle,
// }: React.PropsWithChildren<{
//   label: string;
//   id: string;
//   isOpen: boolean;
//   onToggle: () => void;
// }>) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="my-4">
//       <input
//         id={id}
//         type="checkbox"
//         onChange={() => {}}
//         checked={isOpen}
//         className="peer sr-only"
//       />
//       <label
//         htmlFor={id}
//         className="w-96 md:w-[640px] lg:w-[800px] select-none flex justify-between items-center bg-accent p-4 rounded-2xl peer-checked:rounded-b-[0px] peer-checked:border-b border-0"
//         onClick={() => setOpen(!open)}
//       >
//         {label}
//         <ChevronDownIcon
//           className={`size-6 ${open ? "rotate-180" : ""} justify-self-end`}
//         ></ChevronDownIcon>
//       </label>
//       <div
//         className={`${
//           isOpen ? "flex" : "hidden"
//         } bg-accent/50 transition-[height] w-96 md:w-[640px] lg:w-[800px] duration-1000 ease-in-out rounded-b-3xl p-6`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

export function Accordion({
  label,
  id,
  children,
  isOpen,
  onToggle,
  className,
}: AccordionProps) {
  return (
    <div
      className={`w-96 md:w-[640px] lg:w-[800px] max-w-3xl my-2 ${className}`}
    >
      <button
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        onClick={onToggle}
        className="w-full select-none flex justify-between items-center bg-secondary hover:bg-accent/60 p-4 rounded-2xl data-[open=true]:rounded-b-[0px] data-[open=true]:border-b border-0"
        data-open={isOpen}
      >
        <span className="text-left font-medium truncate">{label}</span>
        <ChevronDownIcon
          className={`size-6 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`${id}-content`}
        className={`bg-secondary/50 transition duration-300 overflow-hidden ${
          isOpen ? "block" : "hidden"
        } rounded-b-3xl p-6`}
      >
        {children}
      </div>
    </div>
  );
}

export function AccordionGroup({
  children,
  singleOpen = true,
  title,
}: AccordionGroupProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (singleOpen) newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="    ">
      <p className="indent-4 text-3xl font-bold my-2">{title}</p>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen: openIds.has(child.props.id),
          onToggle: () => handleToggle(child.props.id),
        })
      )}
    </div>
  );
}
