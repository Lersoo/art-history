import type { Artist, Movement } from "../types"
import { useEffect, useRef, useState } from "react"
import { fetchWikiThumb } from "../lib/wikipedia"

interface BioModalProps {
  artist: Artist
  movement: Movement
  onClose: () => void
}

export function BioModal({ artist, movement, onClose }: BioModalProps) {
  const [portraitUrl, setPortraitUrl] = useState<string | null>(artist._portraitUrl ?? null)
  const portraitRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!artist.wiki || portraitUrl) return
    fetchWikiThumb(artist.wiki).then((url) => {
      if (url) {
        artist._portraitUrl = url
        setPortraitUrl(url)
      }
    })
  }, [artist, portraitUrl])

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
          className="absolute top-4 right-4 bg-surface2 border border-border text-muted w-8 h-8 rounded-full cursor-pointer text-base flex items-center justify-center transition-all hover:text-text hover:border-accent"
        >
          ✕
        </button>
        <div className="px-8 pt-7 pb-4 border-b border-border overflow-hidden">
          {portraitUrl && (
            <img
              ref={portraitRef}
              src={portraitUrl}
              alt={artist.name}
              onLoad={() => portraitRef.current?.classList.add("!opacity-100")}
              className="w-20 h-20 rounded object-cover object-top float-right ml-4 mb-2 border border-border opacity-0 transition-opacity duration-500"
            />
          )}
          <div className="font-mono text-[0.62rem] text-accent tracking-widest uppercase">
            {movement.era} · {artist.movement}
          </div>
          <div className="font-serif text-[1.7rem] text-text mt-1">{artist.name}</div>
          <div className="font-mono text-[0.72rem] text-muted mt-0.5">{artist.dates}</div>
        </div>
        <div className="px-8 pt-5 pb-8">
          <h4 className="font-mono text-[0.62rem] tracking-widest uppercase text-accent mb-2 mt-0">
            Biographie
          </h4>
          <div
            className="text-sm leading-relaxed text-text [&_p]:mb-3 [&_strong]:text-accent [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: artist.bio }}
          />
          {artist.highlight && (
            <div className="bg-surface2 border-l-[3px] border-l-accent px-4 py-3 text-[0.85rem] italic font-serif my-3 leading-relaxed">
              {artist.highlight}
            </div>
          )}
          <h4 className="font-mono text-[0.62rem] tracking-widest uppercase text-accent mb-2 mt-5">
            Œuvres majeures
          </h4>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {artist.works.map((w) => (
              <span
                key={w}
                className="bg-bg border border-border px-2.5 py-1 text-xs rounded italic"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
