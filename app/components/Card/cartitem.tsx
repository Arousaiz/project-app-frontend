import CounterButton from "../Buttons/CounterButton";

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
    <div className="grid grid-cols-3 ">
      <div>
        <p>{name}</p>
        {/* <p className="">Additional info</p> */}
      </div>
      <p className="text-center">{price}p</p>
      <div className="items-center">
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
