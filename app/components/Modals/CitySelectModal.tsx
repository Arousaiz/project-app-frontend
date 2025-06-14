import { cities } from "../Header/Header";
import Modal from "../ui/Modal";

export default function CitySelectModal({
  open,
  onClose,
  setCity,
  city,
  id,
}: {
  open: boolean;
  onClose: () => void;
  setCity: (city: string) => void;
  city: string | null;
  id?: string;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Выберите город</h2>
      <div className="space-y-2 max-h-[50vh] overflow-y-auto">
        {cities.map((name) => (
          <button
            key={name}
            onClick={() => {
              localStorage.setItem("city", name);
              setCity(name);
              onClose();
            }}
            className={`block w-full text-left px-4 py-2 rounded ${
              city === name ? "bg-accent font-semibold" : ""
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </Modal>
  );
}
