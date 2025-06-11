import { useState } from "react";

type ImageWithLoadingAndFallbackProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className: string;
  isInCard?: boolean;
  size?: string;
};

export default function ImageWithLoadingAndFallback({
  src,
  fallbackSrc,
  alt,
  className,
  isInCard = false,
  size,
  ...props
}: ImageWithLoadingAndFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative ${size}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-600 animate-pulse" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={() => {
          setImgSrc(fallbackSrc);
          setLoading(false);
        }}
        onLoad={() => setLoading(false)}
        className={`w-full h-full ${isInCard ? "rounded-t-xl " : " "} ${
          loading ? "opacity-0" : "opacity-100"
        } object-cover ${className}`}
        {...props}
      />
    </div>
  );
}
