const UNSPLASH_HOST = "images.unsplash.com";

function parseSource(source: string): URL | null {
  try {
    const url = new URL(source);
    return url.hostname === UNSPLASH_HOST ? url : null;
  } catch {
    return null;
  }
}

/** Adds explicit delivery parameters without assuming every image is on Unsplash. */
export function imageAt(source: string, width: number, height: number, quality = 78): string {
  const url = parseSource(source);
  if (!url) return source;

  url.searchParams.set("w", String(width));
  url.searchParams.set("h", String(height));
  url.searchParams.set("fit", "crop");
  url.searchParams.set("auto", "format");
  url.searchParams.set("q", String(quality));
  return url.toString();
}

export function imageSrcSet(
  source: string,
  widths: number[],
  ratio: number,
  quality = 78,
): string | undefined {
  if (!parseSource(source)) return undefined;

  return widths
    .map((width) => `${imageAt(source, width, Math.round(width / ratio), quality)} ${width}w`)
    .join(", ");
}

/** Builds a srcset for locally generated responsive variants such as `/images/x-480.webp`. */
export function localSrcSet(source: string, widths: number[]): string | undefined {
  if (!source.startsWith("/images/")) return undefined;
  const dot = source.lastIndexOf(".");
  if (dot === -1) return undefined;
  const base = source.slice(0, dot);
  const extension = source.slice(dot);
  return widths.map((width) => `${base}-${width}${extension} ${width}w`).join(", ");
}
