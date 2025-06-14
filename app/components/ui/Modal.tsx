import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { cn } from "~/utils/utils";
import { createPortal } from "react-dom";
import PrimaryButton from "./Buttons/PrimaryButton";
import { useIsMobile } from "~/hooks/use-mobile";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-4xl",
  full: "max-w-full",
};

export default function Modal({
  open,
  noBlur,
  onClose,
  children,
  size = "lg",
}: {
  open: boolean;
  noBlur?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}) {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      requestAnimationFrame(() => setIsAnimating(true));
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "";
      return () => clearTimeout(timeout);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!isVisible) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-[1000] sm:items-center items-end justify-center flex transition-all duration-300",
        size === "full" ? "h-screen top-0 " : "",
        isAnimating ? "bg-background/40 " : "bg-background/0",
        noBlur && "backdrop-blur-none"
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "relative sm:rounded-xl w-full sm:p-4 sm:overflow-visible overflow-hidden",
          size !== "full" && "rounded-t-xl sm:rounded-xl",
          size === "full" ? "h-full max-w-full" : "max-h-[90vh]",
          !isMobile && sizeClasses[size]
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "bg-popover sm:rounded-xl text-popover-foreground shadow p-4 sm:p-6 w-full transform transition-all duration-300 overflow-y-auto overflow-x-hidden",
            size === "full" ? "h-full max-w-full" : "max-h-[90vh] rounded-t-xl",
            isAnimating
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <PrimaryButton
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-2 sm:right-2 sm:p-1 rounded-md transition z-[100]"
            aria-label="Закрыть модальное окно"
          >
            <XMarkIcon className="size-6" />
          </PrimaryButton>
          <div className="pt-10 px-4 pb-6 sm:py-0 h-full">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
