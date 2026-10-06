const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 8 * 1024 * 1024
const MAX_SIDE = 1600

export class ImageError extends Error {}

export async function processImage(file: File): Promise<string> {
  if (!ALLOWED.includes(file.type)) throw new ImageError('Yalnız JPG, PNG və ya WebP şəkli yükləmək olar.')
  if (file.size > MAX_BYTES) throw new ImageError('Şəkil 8 MB-dan böyük ola bilməz.')

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new ImageError('Fayl şəkil kimi oxunmadı. Başqa şəkil seçin.')
  }

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new ImageError('Brauzer şəkli emal edə bilmədi.')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  return canvas.toDataURL('image/webp', 0.82)
}
