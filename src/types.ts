export interface Work {
  title: string
  artist: string
  wiki?: string
  _imgUrl?: string
}

export interface Artist {
  name: string
  dates: string
  movement: string
  wiki?: string
  note?: string
  bio: string
  highlight?: string
  works: string[]
  _portraitUrl?: string
}

export interface Movement {
  id: string
  era: string
  name: string
  dates: string
  intro: string
  detail: string
  notions: string[]
  artists: Artist[]
  works: Work[]
}
