import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: any;
}) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-100 flex justify-center items-center transition-colors text-black dark:text-white
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950 hover:text-gray-600"
        >
          <XMarkIcon className="size-6"></XMarkIcon>
        </button>
        {children}
      </div>
    </div>
  );
}
