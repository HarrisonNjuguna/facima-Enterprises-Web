import { useRef, useState } from 'react'

const MAX_IMAGES = 8
const MAX_FILE_MB = 3

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return
    setError(null)
    setBusy(true)
    const next = [...images]

    for (const file of Array.from(fileList)) {
      if (next.length >= MAX_IMAGES) {
        setError(`Maximum ${MAX_IMAGES} photos per listing.`)
        break
      }
      if (!file.type.startsWith('image/')) {
        setError('Only image files are accepted.')
        continue
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`Each image must be under ${MAX_FILE_MB} MB.`)
        continue
      }
      const dataUrl = await readAsDataUrl(file)
      next.push(dataUrl)
    }

    onChange(next)
    setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="image-uploader">
      <ImageGrid images={images} onChange={onChange} />
      <div className="image-uploader__actions">
        <button
          type="button"
          className="btn btn--secondary"
          disabled={busy || images.length >= MAX_IMAGES}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Processing…' : 'Add photos from device'}
        </button>
        <span className="muted">
          {images.length}/{MAX_IMAGES} — JPG/PNG, max {MAX_FILE_MB} MB each
        </span>
      </div>
      {error && <p className="form-error">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}

function ImageGrid({
  images,
  onChange,
}: {
  images: string[]
  onChange: (images: string[]) => void
}) {
  if (images.length === 0) {
    return (
      <p className="image-uploader__empty muted">
        No photos yet — add at least one image before publishing.
      </p>
    )
  }

  return (
    <ul className="image-uploader__grid">
      {images.map((src, index) => (
        <li key={`${index}-${src.slice(0, 24)}`}>
          <img src={src} alt={`Upload preview ${index + 1}`} loading="lazy" />
          <div className="image-uploader__tools">
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              disabled={index === 0}
              onClick={() => {
                const next = [...images]
                ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
                onChange(next)
              }}
            >
              ↑
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => onChange(images.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}