import { useEffect, useState } from "react";
import { Image } from "lucide-react";
import { cn } from "~/utils/utils";

type Props = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  size?: string;
  isInCard?: boolean;
  rounded?: boolean;
};

export default function ImageWithLoadingAndFallback({
  src,
  fallbackSrc,
  alt,
  className = "",
  size = "w-full h-full",
  isInCard = false,
  rounded = true,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  // 🔥 обновляем изображение при изменении src
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setLoading(true); // показать прелоадер снова
    }
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", size)}>
      {loading && (
        <div className="flex items-center justify-center absolute inset-0 bg-gray-400 animate-pulse rounded-md">
          <Image />
        </div>
      )}

      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
          setLoading(false);
        }}
        className={cn(
          "object-cover transition-opacity duration-300",
          rounded && (isInCard ? "rounded-t-xl" : "rounded-md"),
          loading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
}
