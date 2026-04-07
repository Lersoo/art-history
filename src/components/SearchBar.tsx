interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="mt-3">
      <input
        type="text"
        placeholder="Artiste, œuvre, notion, mouvement…"
        onChange={(e) => onSearch(e.target.value)}
        className="bg-surface border border-border text-text px-4 py-2 font-sans text-sm rounded outline-none w-[300px] transition-colors focus:border-accent placeholder:text-muted"
      />
    </div>
  )
}
