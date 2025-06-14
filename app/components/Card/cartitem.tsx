import CounterButton from "../ui/Buttons/CounterButton";

export default function CartItem({
  name,
  price,
  count,
  minusClick,
  plusClick,
  deleteFromCart,
}: {
  name: string;
  price: number;
  count: number;
  minusClick: () => void;
  plusClick: () => void;
  deleteFromCart: () => void;
}) {
  return (
    <div className="flex justify-between shadow-sm hover:shadow-md  items-center py-4 border border-border/50  transition-all duration-300 ease-in-out  rounded-lg px-2">
      <div className="flex flex-col">
        <p className="text-base font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{price} руб.</p>
      </div>

      <div className="flex-shrink-0">
        <CounterButton
          count={count}
          minusClick={minusClick}
          plusClick={plusClick}
          deleteFromCart={deleteFromCart}
        />
      </div>
    </div>
  );
}
