import type { Promotions } from "~/types/promotions";
import Modal from "../ui/Modal";
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
            src={`https://pub-96480823ba5d4f44bb4d8cd67febd2f1.r2.dev/${selectedPromo?.img_url}`}
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
