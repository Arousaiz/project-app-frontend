import { isNullOrUndefined } from "~/utils/utils";
import ReviewForm from "../Forms/ReviewForm";
import Modal from "../ui/Modal";
import type { Orders } from "~/types/order";

export default function ReviewModal({
  open,
  onClose,
  order,
}: {
  open: boolean;
  onClose: () => void;
  order?: Orders;
}) {
  if (!isNullOrUndefined(order) && order != undefined) {
    const dto = {
      id: order.id,
      restaurant: {
        id: order.restaurant.id,
        name: order.restaurant.name,
      },
      orderItems: order.orderItems.map((item) => ({
        id: item.menuItem.id,
        name: item.menuItem.name,
      })),
    };
    return (
      <Modal open={open} onClose={onClose}>
        <div className="min-w-80">
          <ReviewForm order={dto} onClose={onClose} />
        </div>
      </Modal>
    );
  }

  if (!open && isNullOrUndefined(order)) {
    return null;
  }
}
