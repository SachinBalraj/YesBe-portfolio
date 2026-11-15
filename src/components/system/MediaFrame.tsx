import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface FrameImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width?: number;
  height?: number;
  position?: string;
}

interface MediaFrameProps {
  image?: FrameImage;
  video?: {
    src: string;
    poster: string;
    type?: string;
  };
  ratio?: string;
  className?: string;
  mediaClassName?: string;
  priority?: boolean;
  zoom?: boolean;
  caption?: ReactNode;
  overlay?: ReactNode;
  children?: ReactNode;
}

export function MediaFrame({
  image,
  video,
  ratio = "aspect-[4/3]",
  className,
  mediaClassName,
  priority = false,
  zoom = true,
  caption,
  overlay,
  children,
}: MediaFrameProps) {
  return (
    <figure className={cn("m-0", className)}>
      <div className={cn("media-frame", ratio, zoom && "media-zoom group", mediaClassName)}>
        {image && (
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="size-full"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        )}

        {video && (
          <video
            muted
            loop
            playsInline
            preload="none"
            poster={video.poster}
            aria-hidden="true"
            className="size-full"
          >
            <source src={video.src} type={video.type ?? "video/mp4"} />
          </video>
        )}

        {overlay}
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-body">{caption}</figcaption>
      )}
    </figure>
  );
}
