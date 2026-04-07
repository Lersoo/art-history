# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive art history course for the French **ATEAP 2e classe** civil service exam (Arts Plastiques).

## Stack

- **Runtime / Package manager**: Bun
- **Build / Dev server**: Vite
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (configured via `@theme` in `src/index.css`)

## Commands

```bash
bun install        # install dependencies
bun run dev        # start dev server (Vite HMR)
bun run build      # type-check (tsc) + production build
bun run preview    # preview production build locally
```

## Architecture

```
src/
  types.ts                  # Movement, Artist, Work interfaces
  data/movements.ts         # all course content as a typed array
  lib/wikipedia.ts          # fetchWikiThumb() — Wikipedia API + in-memory cache
  components/
    SearchBar.tsx            # search input, triggers first-match navigation
    Timeline.tsx             # sidebar nav with era dots, sticky + scrolls active into view
    MovementPanel.tsx        # main content: intro, detail, notions, artist grid, work grid, nav buttons
    ArtistCard.tsx           # card with lazy-loaded Wikipedia portrait
    WorkCard.tsx             # card with lazy-loaded Wikipedia artwork thumbnail
    BioModal.tsx             # artist biography overlay (Escape / click-outside to close)
    ArtworkModal.tsx         # artwork viewer overlay with Wikipedia link
  App.tsx                    # root — state for current movement index + modal management
  main.tsx                   # React entry point
```

## Content Language

All content and UI text is in **French**. Wikipedia API calls use **English** slugs (`wiki` field) for image lookup.

## Key Patterns

- **Image loading**: all images are fetched at runtime from Wikipedia (`en.wikipedia.org/w/api.php?action=query&prop=pageimages`), never stored locally. Results are cached in a `Map` inside `lib/wikipedia.ts`.
- **Theme**: dark palette defined as Tailwind `@theme` custom colors (`bg`, `surface`, `surface2`, `border`, `text`, `muted`, `accent`). Fonts: Playfair Display (serif headings), DM Sans (body), DM Mono (dates/labels).
- **Data model**: each movement has `artists[]` and `works[]`. Artists have `bio` (HTML string), `highlight` (pull quote), `works` (string list), and an optional `wiki` slug. Works have `title`, `artist`, and optional `wiki` slug.
- **Search**: simple first-match substring across movement names, artist names/bios, work titles, and notion tags.
- **Mobile**: timeline sidebar hidden below `md` breakpoint.
