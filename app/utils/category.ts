import { useEffect, useRef } from "react";

type UseCategoryIntersectionObserverParams = {
  refs: React.RefObject<Record<string, HTMLElement | null>>;
  onIntersect: (category: string) => void;
  threshold?: number;
  headerHeight?: number;
};

export function useCategoryIntersectionObserver({
  refs,
  onIntersect,
  threshold = 0,
  headerHeight = 50,
}: UseCategoryIntersectionObserverParams) {
  const lastCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const entries = Object.entries(refs.current);

      for (const [category, el] of entries) {
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= headerHeight && rect.bottom > headerHeight) {
          if (category !== lastCategoryRef.current) {
            lastCategoryRef.current = category;
            onIntersect(category);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refs, onIntersect, headerHeight]);
}
