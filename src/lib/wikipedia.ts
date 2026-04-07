const cache = new Map<string, string | null>()

export async function fetchWikiThumb(title: string): Promise<string | null> {
  if (cache.has(title)) return cache.get(title)!

  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=400&origin=*`
    const res = await fetch(url)
    const data = await res.json()
    const pages = data.query.pages
    const page = Object.values(pages)[0] as { thumbnail?: { source: string } }
    const thumb = page.thumbnail?.source ?? null
    cache.set(title, thumb)
    return thumb
  } catch {
    cache.set(title, null)
    return null
  }
}
