import type { Work } from "../types"
import { useEffect, useRef, useState } from "react"
import { fetchWikiThumb } from "../lib/wikipedia"

interface WorkCardProps {
  work: Work
  onClick: () => void
}

export function WorkCard({ work, onClick }: WorkCardProps) {
  const [imgUrl, setImgUrl] = useState<string | null>(work._imgUrl ?? null)
  const [loading, setLoading] = useState(!!work.wiki)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!work.wiki || imgUrl) {
      setLoading(false)
      return
    }
    fetchWikiThumb(work.wiki).then((url) => {
      if (url) {
        work._imgUrl = url
        setImgUrl(url)
      }
      setLoading(false)
    })
  }, [work, imgUrl])

  return (
    <li
      onClick={onClick}
      className="bg-surface border border-border rounded-[5px] overflow-hidden transition-colors cursor-pointer hover:border-accent"
    >
      <div className="h-32 overflow-hidden relative bg-surface2">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[18px] h-[18px] border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        )}
        {!loading && !imgUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-border text-[0.65rem] font-mono tracking-wide text-center p-2">
            image non disponible
          </div>
        )}
        {imgUrl && (
          <img
            ref={imgRef}
            src={imgUrl}
            alt={work.title}
            onLoad={() => imgRef.current?.classList.add("!opacity-100")}
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            className="w-full h-full object-cover opacity-0 transition-opacity duration-500 block"
          />
        )}
      </div>
      <div className="px-3 py-2">
        <div className="italic text-text text-sm leading-tight">{work.title}</div>
        <div className="font-mono text-[0.67rem] text-muted mt-1">{work.artist}</div>
      </div>
    </li>
  )
}
