/**
 * Image path helpers for WebP/AVIF and responsive srcset.
 * Use with <picture> and responsive widths to reduce download size (PageSpeed).
 */

const EXT_RE = /\.(jpe?g|png|webp|avif)$/i

/** Base path without extension (e.g. "/images/sfogliatella_pc") and extension (e.g. "jpg") */
export function getImageBaseAndExt(src: string): { base: string; ext: string } {
  const match = src.match(EXT_RE)
  const ext = match ? match[1].toLowerCase() : 'jpg'
  const base = src.replace(EXT_RE, '')
  return { base, ext }
}

export function toWebp(src: string): string {
  return src.replace(/\.(jpe?g|png)$/i, '.webp')
}

export function toAvif(src: string): string {
  return src.replace(/\.(jpe?g|png|webp)$/i, '.avif')
}

/** Widths used for responsive srcSet (run `npm run generate-images` to create these files). */
export const RESPONSIVE_WIDTHS = [800, 1200, 1920] as const

/** Responsive srcSet string for a given format: "base_800.ext 800w, base_1200.ext 1200w, ..." */
export function getResponsiveSrcSet(
  base: string,
  ext: string,
  widths: number[] = [...RESPONSIVE_WIDTHS]
): string {
  return widths.map((w) => `${base}_${w}.${ext} ${w}w`).join(', ')
}

/** sizes for hero carousel: slot ~1150px on medium viewport, 1920 on large */
export const CAROUSEL_SIZES = '(max-width: 600px) 100vw, (max-width: 1200px) 1150px, 1920px'

/** sizes for content images (e.g. 3:2 blocks) */
export const CONTENT_IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 1200px'
