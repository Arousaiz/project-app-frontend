import type { MenuItems } from "~/types/menuItem";
import Modal from "../Modal/Modal";
import CounterButton from "../Buttons/CounterButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import { PlusIcon } from "lucide-react";
import { useCart } from "~/providers/cartContext";
import { useEffect, useState } from "react";
import { useIsMobile } from "~/utils/use-mobile";

export default function ProductModal({
  item,
  restaurantId,
  onClose,
}: {
  item: MenuItems | null;
  restaurantId: string;
  onClose: () => void;
}) {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    isItemInCart,
  } = useCart();
  const isMobile = useIsMobile();

  const [quantity, setQuantity] = useState(1);
  const currentCount = item ? cart.items[item.id]?.count ?? 0 : 0;
  useEffect(() => {
    setQuantity(1);
  }, [item]);

  if (!item) return null;

  return (
    <Modal open={!!item} onClose={onClose} size="xl">
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[800px] relative">
        <div className="w-full lg:w-1/2 h-64 sm:h-auto">
          <img
            src={item?.img_url || "/app/assets/placeholder-image.jpg"}
            alt={item?.name}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col lg:h-[calc(100vh-200px)] ">
          <div className="overflow-y-auto pr-2 space-y-2">
            <h3 className="text-xl font-bold">{item?.name}</h3>
            <p className="font-semibold text-base">{item.price} руб.</p>
            <p className="text-base text-muted-foreground">
              {item?.description}
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              tenetur est reprehenderit doloremque voluptatibus laborum quasi,
              iure architecto, enim consequuntur facilis, quidem culpa fugiat
              nihil vitae cumque harum dolorem odio. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Minus aliquid, minima sapiente sunt
              recusandae id expedita cumque totam quas similique maxime at sequi
              quae! Repudiandae officiis velit unde quisquam debitis. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Iste nesciunt
              eos similique. Similique provident fuga quis explicabo corporis
              laborum cupiditate reprehenderit corrupti perspiciatis, sed quo
              repudiandae, possimus veritatis aut earum. Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Ullam architecto dolorum
              maiores? Blanditiis, voluptate sit eligendi alias omnis molestias.
              Asperiores illo vel, magni expedita mollitia voluptatibus officiis
              rerum unde deleniti. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Esse animi reiciendis beatae eos error placeat
              maxime, alias, eveniet ea quaerat eum est quo veniam, officiis
              aliquam sapiente architecto? Ad, accusamus. Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Praesentium, hic quaerat
              quisquam consequatur numquam vel nihil nulla harum doloremque
              blanditiis, tempora eveniet sed nisi cupiditate dolore quo magni
              non ad. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium, cumque maxime tempore enim voluptatem, dignissimos
              totam dolorem incidunt culpa magnam explicabo, quas voluptatum nam
              veniam. Reprehenderit sunt incidunt adipisci repellendus? Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Earum iste
              assumenda commodi est incidunt illum voluptas harum enim ullam
              odit. Totam ipsum exercitationem ab eius officia nesciunt quasi
              quisquam eos. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Dicta ratione ea quos consectetur fugit ullam neque unde
              nihil nemo tenetur, cum numquam ipsa animi facilis, eos sint.
              Repudiandae, voluptas blanditiis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Possimus illum, corrupti rem
              exercitationem enim distinctio animi necessitatibus quos officiis
              laborum omnis fugiat sed explicabo porro incidunt sint vel
              repellendus reiciendis! Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Vel, commodi itaque. Voluptatum aliquam officia
              fugit quod porro expedita dolorum ab tempora enim repellat, ipsam
              saepe tenetur quis rem minima quam! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Fugiat nobis dolore facere magnam
              non! Eum iusto eveniet distinctio neque placeat suscipit,
              quibusdam possimus, harum quo impedit nam dolore architecto
              reprehenderit! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Molestiae, velit labore, omnis numquam est fugit quae
              cupiditate distinctio doloribus ipsa praesentium, sit consectetur
              recusandae accusamus nam. Nisi necessitatibus reiciendis magnam.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              quidem illum accusamus enim impedit nesciunt numquam placeat quos
              culpa nulla iure, ex voluptate repellendus atque rem dolore,
              praesentium cum sequi? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veniam, facilis! Et magni ratione itaque
              accusamus debitis nisi, quos aliquid error, quo odit quis tempore
              commodi ducimus. Maxime nesciunt eveniet obcaecati! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Aliquid, recusandae
              dignissimos. Earum quod ut ad deserunt beatae exercitationem eius,
              distinctio impedit nihil dolorem? Esse, fugit. Dolores, fugit!
              Nesciunt, sit quidem? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Delectus eveniet non culpa eos odio nemo eaque
              quaerat, maxime sunt illo quo dolorem sequi consectetur
              repellendus ab dolores et fugit optio.
            </p>

            {item?.rating !== null && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Рейтинг:</span>
                <span className="text-green-600 font-bold">{item?.rating}</span>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-sm">
                Категория: <strong>{item?.category.name}</strong>
              </p>
              <p className="text-sm">
                Доступность:{" "}
                <span
                  className={
                    item?.isAvailable ? "text-green-600" : "text-red-500"
                  }
                >
                  {item?.isAvailable ? "В наличии" : "Нет в наличии"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-auto sticky -bottom-6 bg-background lg:static flex items-center justify-between space-x-3 py-4 border-t border-border">
            {isItemInCart(item.id) ? (
              <div className="">
                <CounterButton
                  count={currentCount}
                  minusClick={() => decreaseQuantity(item.id)}
                  plusClick={() => increaseQuantity(item.id)}
                  deleteFromCart={() => removeFromCart(item.id)}
                />
              </div>
            ) : (
              <div className="flex w-full items-center justify-between ">
                <CounterButton
                  count={quantity}
                  minusClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  plusClick={() => setQuantity((q) => q + 1)}
                  deleteFromCart={() => {}}
                ></CounterButton>
                <PrimaryButton
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item, restaurantId, quantity);
                    onClose();
                  }}
                  className=""
                >
                  {isMobile ? (
                    <PlusIcon className="w-5 h-5" />
                  ) : (
                    `Добавить в корзину`
                  )}
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
