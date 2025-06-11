import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";
import { Children, createElement } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselButtons";

export default function Carousel({
  children,
  options,
  className,
}: React.PropsWithChildren<{
  options?: EmblaOptionsType;
  className?: string;
}>) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative z-10 embla">
      <div
        className={`embla__viewport select-none ${className}`}
        ref={emblaRef}
      >
        <div className="embla__container">
          {Children.map(children, (child: any) => {
            if (!child) return null;

            return (
              <div className="embla__slide" key={child.key || undefined}>
                {child.props.name
                  ? createElement(child.type, {
                      ...child.props,
                    })
                  : child}
              </div>
            );
          })}
        </div>
        {!prevBtnDisabled && (
          <div className="absolute -start-4 top-5/12">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          </div>
        )}
        {!nextBtnDisabled && (
          <div className="absolute -end-4 top-5/12">
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
}
