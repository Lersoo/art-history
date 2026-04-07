import type { Work } from "../types"
import { useEffect, useState } from "react"
import { fetchWikiThumb } from "../lib/wikipedia"

interface ArtworkModalProps {
  work: Work
  onClose: () => void
}

export function ArtworkModal({ work, onClose }: ArtworkModalProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(work._imgUrl ?? null)

  useEffect(() => {
    if (!work.wiki || imgUrl) return
    fetchWikiThumb(work.wiki).then((url) => {
      if (url) {
        work._imgUrl = url
        setImgUrl(url)
      }
    })
  }, [work, imgUrl])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/[0.88] z-[1000] flex items-center justify-center p-6 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface border border-border rounded-lg w-full max-w-[650px] max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-surface2 border border-border text-muted w-8 h-8 rounded-full cursor-pointer text-base flex items-center justify-center transition-all hover:text-text hover:border-accent z-10"
        >
          ✕
        </button>
        {imgUrl && (
          <img
            src={imgUrl}
            alt={work.title}
            className="w-full max-h-[60vh] object-contain block bg-bg"
          />
        )}
        <div className="px-6 pt-4 pb-6">
          <div className="font-serif text-xl text-text">{work.title}</div>
          <div className="font-mono text-xs text-accent mt-1">{work.artist}</div>
          {work.wiki && (
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(work.wiki)}`}
              target="_blank"
              rel="noopener"
              className="inline-block mt-3 text-xs text-muted border border-border px-3 py-1.5 rounded font-mono no-underline transition-all hover:text-accent hover:border-accent"
            >
              ↗ Voir sur Wikipedia
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
