# Zaki Deza — Portfolio

Personal portfolio for **Zaki Deza** — a fullstack web developer crafting scalable, AI-augmented web experiences. Built as a polished, neon-themed single-page site with case-study sub-pages.

## Stack

- **Framework** — [Next.js 15](https://nextjs.org/) (App Router) + React 19
- **Language** — TypeScript
- **Styling** — Tailwind CSS 3.4 + custom design tokens (CSS variables)
- **Motion** — Framer Motion
- **Carousel** — Embla Carousel
- **Icons** — Lucide React + React Icons (Simple Icons)
- **Fonts** — Inter (display) + JetBrains Mono (monospace)
- **Forms** — Formspree

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Create `.env.local` (optional — defaults to a placeholder):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start dev server           |
| `npm run build` | Production build           |
| `npm run start` | Run the production build   |

## Project structure

```
src/
├─ app/                Next.js App Router (layout, pages, routes)
│  ├─ projects/        Listing + dynamic [slug] case studies
│  └─ globals.css      Design tokens + utility classes
├─ components/
│  ├─ sections/        Hero · About · Projects · Skills · Contact
│  ├─ project/         Card · Carousel · Grid · Modal · Aside
│  └─ ui/              Navbar · Footer · Buttons · Motion helpers · BackToTop
├─ data/               Projects + skills source of truth
├─ lib/                Small utils
└─ types/              Shared types
```

## Deploy

The site is built for [Vercel](https://vercel.com). Push the repo, import in Vercel, and you're live. Image optimisation is enabled by default (AVIF + WebP).
