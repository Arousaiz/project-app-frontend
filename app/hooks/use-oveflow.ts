import { useLayoutEffect, useRef, useState } from "react";
import { useResizeObserver } from "./use-resize";
import { useIsMobile } from "./use-mobile";

const GAP_SIZE = 16;

type UseOverflowButtonsOptions<T extends { id: string }> = {
  items?: T[];
};

export function useOverflowButtons<T extends { id: string }>({
  items,
}: UseOverflowButtonsOptions<T>) {
  const isMobile = useIsMobile();

  const [hiddenItems, setHiddenItems] = useState<Record<string, boolean>>({});
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useResizeObserver(containerRef, (entries) => {
    const entry = entries[0];
    if (containerWidth === entry.contentRect.width) {
      return;
    }
    setContainerWidth(entry.contentRect.width);
    setHiddenItems({});
  });

  useLayoutEffect(() => {
    if (isMobile) {
      if (Object.keys(hiddenItems).length > 0) {
        setHiddenItems({});
      }
      return;
    }

    const containerElement = containerRef.current;
    const containerChildren = containerElement?.children;

    if (!containerChildren) {
      return;
    }

    const elementWidths: number[] = [];
    let dropdownMenuWidth = 0;
    let filterButtonWidth = 0;
    let filter2ButtonWidth = 0;

    for (let i = 0, l = containerChildren.length; i < l; i++) {
      const child = containerChildren[i];
      const clientRect = child.getBoundingClientRect();
      const { width } = clientRect;
      const totalWidth = GAP_SIZE + width;

      const dataAttr = child.getAttribute("data-element");
      if (dataAttr === "dropdown") {
        dropdownMenuWidth = totalWidth;
      } else if (dataAttr === "filter") {
        filterButtonWidth = totalWidth;
      } else if (dataAttr === "filter2") {
        filter2ButtonWidth = totalWidth;
      } else {
        elementWidths.push(totalWidth);
      }
    }

    const hiddenItemsMap: Record<string, boolean> = {};
    let remainingContainerWidth =
      containerWidth -
      dropdownMenuWidth -
      filterButtonWidth -
      filter2ButtonWidth;

    items?.forEach((item, index) => {
      const itemWidth = elementWidths[index];
      if (itemWidth <= remainingContainerWidth) {
        remainingContainerWidth -= itemWidth;
      } else {
        hiddenItemsMap[item.id] = true;
      }
    });

    setHiddenItems((prevHiddenItems) => {
      const prevKeys = Object.keys(prevHiddenItems);
      const newKeys = Object.keys(hiddenItemsMap);

      if (prevKeys.length !== newKeys.length) {
        return hiddenItemsMap;
      }

      for (const key of newKeys) {
        if (prevHiddenItems[key] !== hiddenItemsMap[key]) {
          return hiddenItemsMap;
        }
      }

      return prevHiddenItems;
    });
  }, [items, containerWidth, isMobile]);

  return {
    containerRef,
    hiddenItems,
  };
}
