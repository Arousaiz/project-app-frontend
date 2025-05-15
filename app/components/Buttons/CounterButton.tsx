import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function CounterButton({
  count,
  minusClick,
  plusClick,
  deleteFromCart,
}: {
  count: number;
  minusClick: () => void;
  plusClick: () => void;
  deleteFromCart: () => void;
}) {
  return (
    <div className="relative flex items-center max-w-20 rounded-lg text-white dark:text-white">
      <button
        type="button"
        onClick={() => plusClick()}
        className="bg-blue-700 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-gray-700 focus:ring-gray-400 focus:ring h-8 rounded-s-lg border border-r border-blue-500 dark:border-gray-900"
      >
        <PlusIcon className="size-6 p-1"></PlusIcon>
      </button>
      <input
        type="text"
        className="bg-blue-700 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-gray-700  h-8 w-full block py-2.5 text-center border-t border-b border-blue-500 dark:border-gray-900"
        pattern="/^[0-9]*$/"
        value={count}
      ></input>
      <button
        type="button"
        onClick={() => {
          if (count === 1) {
            return deleteFromCart();
          } else {
            return minusClick();
          }
        }}
        className="bg-blue-700 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-gray-700 focus:ring-gray-400 focus:ring h-8 rounded-e-lg border border-l border-blue-500 dark:border-gray-900"
      >
        <MinusIcon className="size-6 p-1"></MinusIcon>
      </button>
    </div>
  );
}
