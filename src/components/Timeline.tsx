import type { Movement } from "../types"
import { useEffect, useRef } from "react"

interface TimelineProps {
  movements: Movement[]
  currentIndex: number
  onSelect: (index: number) => void
}

export function Timeline({ movements, currentIndex, onSelect }: TimelineProps) {
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [currentIndex])

  return (
    <nav className="w-60 shrink-0 py-6 border-r border-border sticky top-[120px] h-[calc(100vh-120px)] overflow-y-auto hidden md:block scrollbar-thin">
      {movements.map((m, i) => (
        <div
          key={m.id}
          ref={i === currentIndex ? activeRef : undefined}
          onClick={() => onSelect(i)}
          className={`flex items-start gap-3 py-2 px-5 cursor-pointer border-l-2 -ml-px transition-colors ${
            i === currentIndex
              ? "border-l-accent bg-surface"
              : "border-l-transparent hover:bg-surface"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full shrink-0 mt-2 transition-colors ${
              i === currentIndex ? "bg-accent" : "bg-border"
            }`}
          />
          <div>
            <div className="font-mono text-[0.62rem] text-muted tracking-wide">
              {m.dates.split("—")[0].trim()}
            </div>
            <div className="text-sm text-text leading-tight">{m.name}</div>
          </div>
        </div>
      ))}
    </nav>
  )
}
