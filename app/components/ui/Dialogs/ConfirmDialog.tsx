import PrimaryButton from "../Buttons/PrimaryButton";
import Modal from "../Modal";

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <Modal open={open} onClose={() => {}} noBlur={true}>
      <h3 className="font-bold mb-4">{title}</h3>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end gap-4">
        <PrimaryButton variant="ghost" onClick={onCancel} className="">
          Отмена
        </PrimaryButton>
        <PrimaryButton variant="destructive" onClick={onConfirm} className="">
          Подтвердить
        </PrimaryButton>
      </div>
    </Modal>
  );
}
