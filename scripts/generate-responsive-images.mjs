/**
 * Generates responsive image variants (800w, 1200w, 1920w) in JPG, WebP, and AVIF.
 * Run before deploy to fix PageSpeed "画像配信を改善する" and "レスポンシブ画像を使用".
 *
 * Usage: npm run generate-images
 * Requires: sharp (npm i -D sharp)
 */

import { readdir, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'public', 'images')
const WIDTHS = [800, 1200, 1920]
const SUPPORTED_EXT = /\.(jpg|jpeg|png)$/i
const ALREADY_RESPONSIVE = /_\d+\.(jpg|jpeg|png|webp|avif)$/i

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('sharp is required. Run: npm i -D sharp')
    process.exit(1)
  }

  const files = await readdir(IMAGES_DIR).catch(() => [])
  const sources = files.filter(
    (f) => SUPPORTED_EXT.test(f) && !ALREADY_RESPONSIVE.test(f)
  )

  if (sources.length === 0) {
    console.log('No source images to process in public/images')
    return
  }

  for (const file of sources) {
    const base = file.replace(SUPPORTED_EXT, '')
    const ext = extname(file).toLowerCase().replace('jpeg', 'jpg')
    const inputPath = join(IMAGES_DIR, file)
    console.log(`Processing ${file}...`)

    for (const w of WIDTHS) {
      const name = `${base}_${w}`
      try {
        const resized = sharp(inputPath).resize(w, null, { withoutEnlargement: true })
        if (ext === '.png') {
          await resized.png({ compressionLevel: 6 }).toFile(join(IMAGES_DIR, `${name}.png`))
        } else {
          await resized.jpeg({ quality: 85 }).toFile(join(IMAGES_DIR, `${name}.jpg`))
        }
        await sharp(inputPath).resize(w, null, { withoutEnlargement: true }).webp({ quality: 85 }).toFile(join(IMAGES_DIR, `${name}.webp`))
        await sharp(inputPath).resize(w, null, { withoutEnlargement: true }).avif({ quality: 60 }).toFile(join(IMAGES_DIR, `${name}.avif`))
      } catch (err) {
        console.error(`  ${name}: ${err.message}`)
      }
    }
  }
  console.log('Done.')
}

main()
