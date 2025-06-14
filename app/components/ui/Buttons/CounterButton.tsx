import { Minus, Plus } from "lucide-react";
import React from "react";

type CounterButtonProps = {
  count: number;
  minusClick: () => void;
  plusClick: () => void;
  deleteFromCart: () => void;
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
};

export default function CounterButton({
  count,
  minusClick,
  plusClick,
  deleteFromCart,
  className = "",
  buttonClassName = "",
  inputClassName = "",
}: CounterButtonProps) {
  return (
    <div
      className={`relative flex items-center max-w-20 rounded-lg ${className}`}
    >
      <PlusMinusButtons
        onClick={(e) => {
          e.stopPropagation();
          plusClick();
        }}
        className={`rounded-l-lg ${buttonClassName}`}
        aria-label="Увеличить количество"
      >
        <Plus className="size-6 p-1"></Plus>
      </PlusMinusButtons>
      <input
        type="text"
        className={`snd-button h-8 w-full block py-2.5 text-center ${inputClassName}`}
        disabled={true}
        pattern="/^[0-9]*$/"
        value={count}
      ></input>
      <PlusMinusButtons
        className={`rounded-r-lg ${buttonClassName}`}
        onClick={(e) => {
          e.stopPropagation();
          if (count === 1) {
            return deleteFromCart();
          } else {
            return minusClick();
          }
        }}
        aria-label="Уменьшить количество"
      >
        <Minus className="size-6 p-1"></Minus>
      </PlusMinusButtons>
    </div>
  );
}

export function PlusMinusButtons({
  children,
  onClick,
  className,
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`snd-button h-8 ${className}`}
    >
      {children}
    </button>
  );
}
