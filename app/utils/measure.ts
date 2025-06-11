type MeasureOverflowOptions = {
  container: HTMLElement;
  itemSelector: string;
  staticElementSelector?: string; // Например, фильтр
  getItemKey: (el: HTMLElement) => string;
};

export function measureOverflowItems({
  container,
  itemSelector,
  staticElementSelector,
  getItemKey,
}: MeasureOverflowOptions): {
  visible: string[];
  overflow: string[];
} {
  const buttons = Array.from(container.querySelectorAll(itemSelector));
  const staticElement = staticElementSelector
    ? container.querySelector(staticElementSelector)
    : null;

  const containerWidth = container.clientWidth;
  let usedWidth = staticElement?.clientWidth || 0;

  const visible: string[] = [];
  const overflow: string[] = [];

  for (const el of buttons) {
    const element = el as HTMLElement;
    const width = element.clientWidth;
    const key = getItemKey(element);
    if (usedWidth + width <= containerWidth) {
      visible.push(key);
      usedWidth += width;
    } else {
      overflow.push(key);
    }
  }

  return { visible, overflow };
}

import { useEffect, useState } from "react";

export function useOverflowCategories(
  containerRef: React.RefObject<HTMLElement | null>,
  categorySelector = ".category-button",
  staticSelector = ".filter-button"
) {
  const [visible, setVisible] = useState<string[]>([]);
  const [overflow, setOverflow] = useState<string[]>([]);

  const isMobile = () => window.innerWidth <= 768;

  const measure = () => {
    const container = containerRef.current;
    if (!container) return;

    const allButtons = Array.from(container.querySelectorAll(categorySelector));
    const allKeys = allButtons
      .map((el) => (el as HTMLElement).dataset.category)
      .filter(Boolean) as string[];

    if (isMobile()) {
      setVisible(allKeys);
      setOverflow([]);
    } else {
      const result = measureOverflowItems({
        container,
        itemSelector: categorySelector,
        staticElementSelector: staticSelector,
        getItemKey: (el) => el.dataset.category!,
      });

      setVisible(result.visible);
      setOverflow(result.overflow);
    }
  };

  useEffect(() => {
    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { visibleCategories: visible, overflowCategories: overflow, measure };
}
