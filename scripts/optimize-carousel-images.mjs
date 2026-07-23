// Script una tantum: ridimensiona e converte in WebP le foto pesanti del
// carosello (public/studio, public/ritual). Le foto originali erano scatti
// diretti da fotocamera/telefono (8-13MB l'una) serviti senza alcuna
// ottimizzazione perché vivono in public/ e bypassano vite-plugin-image-optimizer
// (che processa solo gli asset importati nel build, non i file statici in public/).
import sharp from 'sharp'
import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'

const MAX_WIDTH = 1600 // sufficiente per l'elemento più largo del carosello (~31vw) anche a 2x DPR
const QUALITY = 75

const targets = [
  { dir: 'public/studio', files: null }, // null = tutti i jpg/png nella cartella
  { dir: 'public/ritual', files: ['primadopo.jpg', 'volantino.png'] },
]

async function run() {
  for (const { dir, files } of targets) {
    const names = files ?? (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f))
    for (const name of names) {
      const src = path.join(dir, name)
      const base = name.replace(/\.[^.]+$/, '')
      const dest = path.join(dir, `${base}.webp`)

      const before = (await stat(src)).size
      await sharp(src)
        .rotate() // rispetta l'orientamento EXIF prima di ridimensionare
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest)
      const after = (await stat(dest)).size

      await unlink(src)
      console.log(
        `${name} -> ${base}.webp  ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB`,
      )
    }
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
