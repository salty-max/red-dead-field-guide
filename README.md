# Red Dead Field Guide

A spoiler-aware, unofficial companion for the original *Red Dead Redemption* campaign. The checklist targets the game’s **Redeemed** 100% stat and works with the original and modern releases of that campaign.

## Run it locally

A React 19 + TypeScript single-page app built with Vite. You need Node 20+ and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # typecheck + production build into dist/
pnpm preview    # serve the production build
pnpm test       # Vitest data, state and app-flow tests
pnpm lint
pnpm icons      # regenerate public/icons
```

Routes are real paths (`/guide/3`, `/checklist/location`, `/dashboard`, `/sources`), so a static host needs a fallback to `index.html`. The app is an installable PWA (vite-plugin-pwa): it precaches the shell, fonts and banners, works offline, and asks before swapping in a new version. Walkthrough content lives in `src/data`; progress state is in `src/store`.

## Deploy

Intended for Vercel from `main`. `vercel.json` sets the build (`pnpm build` → `dist`), a catch-all rewrite to `index.html`, a strict CSP (no inline scripts), security headers and cache rules. Check header changes against a real preview deployment, not just locally.

## Use the guide

- **Guide** starts in New Austin. Reveal chapters as you reach them. Each mission has its own directions and a source link. The order is a practical route through strands that can open in parallel.
- **Checklist** tracks story missions, Stranger tasks, outfits and scraps, challenges, map locations, bounties, hideouts, properties, purchases, jobs and minigames. Each check is shared with the walkthrough. Each group has a **Check all** button (for example, a whole county after reading its map in-game); every check or bulk change shows an **Undo** toast.
- **Progress** lists which categories still cost the most points, lets you enter the game’s own percentage to see how far the estimate is off, and estimates the game’s weighted percentage, with one point at each rank 5 and 10 challenge milestone. Outfit scraps are tracked individually. The completed outfit supplies the in-game credit. Compare your estimate with **Stats → General**.
- The sun or moon in the header switches the theme. Choose **Use device setting** under **Appearance** to follow your system.
- Open **Progress saved** to change spoiler settings or export and import your checklist. Progress is stored for this browser and site address.

The in-game percentage applies to the base campaign. *Undead Nightmare*, multiplayer, mission medals, platform trophies and optional encounters have separate completion goals. Sources and maps are linked inside the app. Directions and counts were compiled from the community guides linked in the app and have not been replayed or independently audited; see [docs/facts-to-verify.md](docs/facts-to-verify.md) for what is still unconfirmed.

## Artwork and fonts

The chapter banners in `src/assets` are decorative. Barlow Condensed and DM Sans are bundled with their licenses in `public/fonts`. *Red Dead Redemption* belongs to Rockstar Games. This is an unofficial guide.
