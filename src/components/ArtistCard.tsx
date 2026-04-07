import type { Artist } from "../types"
import { useEffect, useRef, useState } from "react"
import { fetchWikiThumb } from "../lib/wikipedia"

interface ArtistCardProps {
  artist: Artist
  onClick: () => void
}

export function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(artist._portraitUrl ?? null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!artist.wiki || imgUrl) return
    fetchWikiThumb(artist.wiki).then((url) => {
      if (url) {
        artist._portraitUrl = url
        setImgUrl(url)
      }
    })
  }, [artist, imgUrl])

  return (
    <div
      onClick={onClick}
      className="group bg-surface border border-border rounded-[5px] cursor-pointer transition-all overflow-hidden flex flex-col relative hover:border-accent hover:bg-surface2"
    >
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 transition-transform group-hover:scale-x-100" />
      <div className="h-28 overflow-hidden relative bg-surface2 shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-2xl text-border">
          ◈
        </div>
        {imgUrl && (
          <img
            ref={imgRef}
            src={imgUrl}
            alt={artist.name}
            onLoad={() => imgRef.current?.classList.add("!opacity-100")}
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            className="w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 block relative"
          />
        )}
      </div>
      <div className="p-3">
        <div className="font-semibold text-sm text-accent">{artist.name}</div>
        <div className="font-mono text-[0.67rem] text-muted mt-0.5">
          {artist.dates}
        </div>
        <div className="text-xs text-muted mt-1 leading-snug">
          {artist.note ?? artist.movement}
        </div>
        <div className="text-[0.68rem] text-border mt-2 font-mono transition-colors group-hover:text-accent">
          ↗ Voir la biographie
        </div>
      </div>
    </div>
  )
}
