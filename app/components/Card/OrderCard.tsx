import { formatDistanceToNow } from "date-fns";
import { Card } from "./Card";
import type { Orders } from "~/types/order";
import { ru } from "date-fns/locale";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "~/api/api.order";
import { toast } from "sonner";
import type { Reviews } from "~/types/review";

export type OrderReceived = {
  id: string;
  restaurant: { id: string; name: string; reviews: Reviews[] };
  orderTime: string | Date;
  orderStatus: string;
  orderItems: {
    id: string;
    price: number;
    count: number;
    menuItem: {
      id: string;
      name: string;
      reviews: Reviews[];
    };
  }[];
  price: number;
  discount?: number;
  deliveryDetails?: { deliveryStatus: string };
};

export type OrderCardProps = {
  order: OrderReceived;
  setSelectedOrder: (order: Orders) => void;
};

const getOrderStatusStyle = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-600 text-white";
    case "accepted":
      return "bg-blue-500 text-white";
    case "placed":
      return "bg-yellow-500 text-black";
    case "cancelled":
      return "bg-red-600 text-white";
    case "returned":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const getOrderStatusLabel = (status: string): string => {
  switch (status) {
    case "completed":
      return "Завершён";
    case "accepted":
      return "Принят";
    case "placed":
      return "Оформлен";
    case "cancelled":
      return "Отменён";
    case "returned":
      return "Возвращён";
    default:
      return status;
  }
};

const getDeliveryStatusStyle = (status: string) => {
  switch (status) {
    case "awaiting confirmation":
      return "bg-yellow-500 text-black";
    case "in transit":
      return "bg-blue-500 text-white";
    case "delivered":
      return "bg-green-600 text-white";
    case "cancelled":
      return "bg-red-600 text-white";
    case "returned":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const getDeliveryStatusLabel = (status: string): string => {
  switch (status) {
    case "awaiting confirmation":
      return "Ожидает подтверждения";
    case "in transit":
      return "В пути";
    case "delivered":
      return "Доставлен";
    case "cancelled":
      return "Отменён";
    case "returned":
      return "Возвращён";
    default:
      return status;
  }
};

export default function OrderCard({ order, setSelectedOrder }: OrderCardProps) {
  const totalItemsPrice = order.orderItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const deliveryCost = 0;
  const totalPrice = totalItemsPrice + deliveryCost;
  const discount = order.discount ?? 0;
  const finalPrice = totalPrice - discount;

  const hasRestaurantReview = order.restaurant.reviews?.length > 0;

  const hasAllMenuItemReviews = order.orderItems.every(
    (item) => item.menuItem.reviews?.length > 0
  );

  const shouldShowLeaveReviewButton =
    !hasRestaurantReview || !hasAllMenuItemReviews;

  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) => OrderService.cancelOrder(id),
    onSuccess: () => {
      toast.info("Успешно отменен");
      queryClient.invalidateQueries({ queryKey: ["profileOrders"] });
    },
    onError: (error: any) => {
      toast.error("Произошла ошибка при отмене заказа");
    },
  });

  const handleCancelOrder = () => {
    cancelOrderMutation.mutate(order.id);
  };

  const handleRateOrder = () => {
    setSelectedOrder(order as Orders);
  };

  return (
    <Card className="w-full md:w-9/12 mx-auto my-4 rounded-lg shadow p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{order.restaurant.name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(order.orderTime), {
              addSuffix: true,
              locale: ru,
            })}
          </p>
        </div>
        <span
          className={`text-sm px-3 py-1 rounded font-semibold capitalize ${getOrderStatusStyle(
            order.orderStatus
          )}`}
        >
          {getOrderStatusLabel(order.orderStatus)}
        </span>
      </div>

      <div className="space-y-1 text-sm">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="text-muted-foreground">{item.menuItem.name}</span>
            <span>
              {item.price}p × {item.count}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Продукты</span>
          <span>{totalItemsPrice}p</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Доставка</span>
          <span>{deliveryCost}p</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-700 font-medium">
            <span>Скидка</span>
            <span>-{discount}p</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-base">
          <span>Итого</span>
          <span>{finalPrice}p</span>
        </div>
      </div>

      {order.deliveryDetails?.deliveryStatus && (
        <div>
          <span>Статус доставки: </span>
          <span
            className={`text-sm px-3 py-1 rounded font-semibold capitalize ${getDeliveryStatusStyle(
              order.deliveryDetails.deliveryStatus
            )}`}
          >
            {getDeliveryStatusLabel(order.deliveryDetails.deliveryStatus)}
          </span>
        </div>
      )}

      <div className="pt-3 flex justify-end gap-3">
        {order.orderStatus === "placed" && (
          <PrimaryButton variant="destructive" onClick={handleCancelOrder}>
            Отменить заказ
          </PrimaryButton>
        )}
        {order.orderStatus === "completed" && shouldShowLeaveReviewButton && (
          <PrimaryButton onClick={handleRateOrder}>Оценить заказ</PrimaryButton>
        )}
      </div>
    </Card>
  );
}
