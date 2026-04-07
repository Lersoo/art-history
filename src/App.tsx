import { useCallback, useState } from "react"
import type { Artist, Work } from "./types"
import { movements } from "./data/movements"
import { SearchBar } from "./components/SearchBar"
import { Timeline } from "./components/Timeline"
import { MovementPanel } from "./components/MovementPanel"
import { BioModal } from "./components/BioModal"
import { ArtworkModal } from "./components/ArtworkModal"

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bioModal, setBioModal] = useState<{ artist: Artist; movementIndex: number } | null>(null)
  const [artModal, setArtModal] = useState<Work | null>(null)

  const showMovement = useCallback((index: number) => {
    if (index < 0 || index >= movements.length) return
    setCurrentIndex(index)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return
    const q = query.toLowerCase()
    const idx = movements.findIndex(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.artists.some(
          (a) => a.name.toLowerCase().includes(q) || a.bio.toLowerCase().includes(q)
        ) ||
        m.works.some(
          (w) => w.title.toLowerCase().includes(q) || w.artist.toLowerCase().includes(q)
        ) ||
        m.notions.some((n) => n.toLowerCase().includes(q))
    )
    if (idx >= 0) showMovement(idx)
  }, [showMovement])

  return (
    <div className="min-h-screen bg-bg text-text font-sans font-light leading-relaxed">
      <header className="px-8 pt-8 pb-4 border-b border-border sticky top-0 bg-bg z-50">
        <h1 className="font-serif text-[clamp(1.4rem,3vw,2rem)] text-accent">
          Histoire de l'Art
        </h1>
        <p className="text-muted font-mono text-[0.7rem] tracking-widest uppercase mt-0.5">
          Concours ATEAP 2e classe · Cliquez sur une œuvre ou un artiste
        </p>
        <SearchBar onSearch={handleSearch} />
      </header>

      <div className="flex min-h-[calc(100vh-120px)]">
        <Timeline movements={movements} currentIndex={currentIndex} onSelect={showMovement} />
        <main className="flex-1 px-6 md:px-12 py-8 max-w-[960px]">
          <MovementPanel
            movement={movements[currentIndex]}
            index={currentIndex}
            total={movements.length}
            onNavigate={showMovement}
            onArtistClick={(artist) => setBioModal({ artist, movementIndex: currentIndex })}
            onWorkClick={setArtModal}
          />
        </main>
      </div>

      {bioModal && (
        <BioModal
          artist={bioModal.artist}
          movement={movements[bioModal.movementIndex]}
          onClose={() => setBioModal(null)}
        />
      )}
      {artModal && <ArtworkModal work={artModal} onClose={() => setArtModal(null)} />}
    </div>
  )
}
