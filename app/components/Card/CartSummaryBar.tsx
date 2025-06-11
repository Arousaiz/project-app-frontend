import { useCart } from "~/providers/cartContext";
import { ArrowUpIcon } from "@heroicons/react/20/solid";

export default function CartSummaryBar({ onClick }: { onClick: () => void }) {
  const { totalPrice, cart } = useCart();
  const totalCount = Object.values(cart.items).reduce(
    (acc, item) => acc + item.count,
    0
  );

  if (totalCount === 0) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 z-[1000] left-0 right-0 bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center shadow-t-md w-full max-w-screen cursor-pointer border-border rounded-t-2xl"
      onClick={onClick}
    >
      <div>
        <p className="text-sm">Товаров: {totalCount}</p>
        <p className="font-bold text-lg">{totalPrice} Р</p>
      </div>
      <ArrowUpIcon className="h-6 w-6" />
    </div>
  );
}
