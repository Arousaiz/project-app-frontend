import type { Promotions } from "~/types/promotions";
import Modal from "../Modal/Modal";
import ImageWithLoadingAndFallback from "../Card/ImageWithFallback";

export default function PromotionModal({
  selectedPromo,
  onClose,
}: {
  selectedPromo: Promotions | null;
  onClose: () => void;
}) {
  return (
    <Modal open={!!selectedPromo} onClose={onClose}>
      {selectedPromo && (
        <div className="space-y-4">
          <ImageWithLoadingAndFallback
            src="/app/assets/placeholder-image.jpg"
            fallbackSrc="/app/assets/placeholder-image.jpg"
            alt={`Изображение акции ${selectedPromo?.title}`}
            className="rounded-xl h-full"
            isInCard={true}
          ></ImageWithLoadingAndFallback>
          <h2 className="text-xl font-bold">{selectedPromo.title}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedPromo.description}
          </p>
          {/* Добавь больше информации, если нужно */}
        </div>
      )}
    </Modal>
  );
}
