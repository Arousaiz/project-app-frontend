import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

type CounterButtonProps = {
  count: number;
  minusClick: () => void;
  plusClick: () => void;
  deleteFromCart: () => void;
};

export default function CounterButton({
  count,
  minusClick,
  plusClick,
  deleteFromCart,
}: CounterButtonProps) {
  return (
    <div className="relative flex items-center max-w-20 rounded-lg">
      <PlusMinusButtons
        onClick={(e) => {
          e.stopPropagation();
          plusClick();
        }}
      >
        <PlusIcon className="size-6 p-1"></PlusIcon>
      </PlusMinusButtons>
      <input
        type="text"
        className="snd-button h-8 w-full block py-2.5 text-center"
        disabled={true}
        pattern="/^[0-9]*$/"
        value={count}
      ></input>
      <PlusMinusButtons
        right={true}
        onClick={(e) => {
          e.stopPropagation();
          if (count === 1) {
            return deleteFromCart();
          } else {
            return minusClick();
          }
        }}
      >
        <MinusIcon className="size-6 p-1"></MinusIcon>
      </PlusMinusButtons>
    </div>
  );
}

export function PlusMinusButtons({
  children,
  onClick,
  className,
  right = false,
}: React.ComponentProps<"button"> & { right?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`snd-button h-8 ${
        right ? "rounded-e-lg " : "rounded-s-lg "
      } ${className}`}
    >
      {children}
    </button>
  );
}
