import type { Restaurant } from "~/types/restaurant";
import Modal from "../Modal/Modal";
import {
  ComputerDesktopIcon,
  CreditCardIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import ReviewForm from "../Forms/ReviewForm";

export default function ReviewModal({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="min-w-80">
        <ReviewForm id={id}></ReviewForm>
      </div>
    </Modal>
  );
}
