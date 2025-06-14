import { useEffect, useLayoutEffect, useRef } from "react";

function useLatest<T>(val: T) {
  const valueRef = useRef(val);

  useLayoutEffect(() => {
    valueRef.current = val;
  }, [val]);

  return valueRef;
}

export function useResizeObserver(
  elementRef: React.RefObject<Element | null>,
  cb: ResizeObserverCallback
) {
  const latestCb = useLatest(cb);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((...args) => {
      latestCb.current(...args);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [latestCb]);
}
