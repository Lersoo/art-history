import type { Artist, Movement, Work } from "../types"
import { ArtistCard } from "./ArtistCard"
import { WorkCard } from "./WorkCard"

interface MovementPanelProps {
  movement: Movement
  index: number
  total: number
  onNavigate: (index: number) => void
  onArtistClick: (artist: Artist) => void
  onWorkClick: (work: Work) => void
}

export function MovementPanel({
  movement: m,
  index,
  total,
  onNavigate,
  onArtistClick,
  onWorkClick,
}: MovementPanelProps) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6 pb-5 border-b border-border">
        <div className="font-mono text-[0.65rem] text-accent tracking-[0.14em] uppercase mb-1">
          {m.era}
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-text leading-tight">
          {m.name}
        </h2>
        <div className="font-mono text-xs text-muted mt-1">{m.dates}</div>
      </div>

      {/* Intro */}
      <p className="text-base leading-relaxed border-l-[3px] border-l-accent pl-5 my-5 italic font-serif text-text">
        {m.intro}
      </p>

      {/* Detail */}
      <SectionLabel>Contexte & analyse</SectionLabel>
      <div
        className="text-sm leading-relaxed text-text mb-4 [&_p]:mb-3 [&_strong]:text-accent [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: m.detail }}
      />

      {/* Notions */}
      <SectionLabel>Notions clés</SectionLabel>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {m.notions.map((n) => (
          <span
            key={n}
            className="bg-surface2 border border-border text-text px-3 py-1 text-[0.78rem] rounded transition-colors hover:border-accent"
          >
            {n}
          </span>
        ))}
      </div>

      {/* Artists */}
      <SectionLabel>
        Artistes majeurs{" "}
        <span className="text-muted font-light text-[0.6rem] tracking-normal normal-case ml-2">
          — cliquez pour la biographie
        </span>
      </SectionLabel>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(185px,1fr))] gap-3 mb-5">
        {m.artists.map((a) => (
          <ArtistCard key={a.name} artist={a} onClick={() => onArtistClick(a)} />
        ))}
      </div>

      {/* Works */}
      <SectionLabel>
        Œuvres majeures{" "}
        <span className="text-muted font-light text-[0.6rem] tracking-normal normal-case ml-2">
          — cliquez pour agrandir
        </span>
      </SectionLabel>
      <ul className="list-none grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mb-5">
        {m.works.map((w) => (
          <WorkCard key={w.title} work={w} onClick={() => onWorkClick(w)} />
        ))}
      </ul>

      {/* Navigation */}
      <div className="flex gap-4 mt-10 pt-5 border-t border-border">
        <NavButton onClick={() => onNavigate(index - 1)} disabled={index === 0}>
          ← Précédent
        </NavButton>
        <NavButton onClick={() => onNavigate(index + 1)} disabled={index === total - 1}>
          Suivant →
        </NavButton>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-accent mt-7 mb-3">
      {children}
    </div>
  )
}

function NavButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-surface border border-border text-text px-4 py-2 cursor-pointer font-sans text-sm rounded transition-all hover:enabled:bg-accent hover:enabled:text-bg hover:enabled:border-accent disabled:opacity-25 disabled:cursor-default"
    >
      {children}
    </button>
  )
}
