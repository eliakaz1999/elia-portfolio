# Elia Portfolio

Personal portfolio site built with React + Vite + Framer Motion.

## Stack

- **React 18** + TypeScript
- **Vite** — dev server and build
- **Framer Motion** — scroll animations and entrance effects
- **CSS Modules** — scoped component styles
- **Lucide React** — icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Background video

Drop a video file named `bg.mp4` into the `public/` folder.
It will be used as the hero background. Recommended: 1080p, under 8MB, muted landscape clip.

If no video is present, the dark gradient fallback shows automatically.

## Customise

All content is defined in the component files:

| File | Content |
|------|---------|
| `src/components/Hero.tsx` | Name, tagline, nav links |
| `src/components/About.tsx` | Bio paragraphs, stats |
| `src/components/CV.tsx` | Experience and education entries |
| `src/components/Projects.tsx` | Project cards |
| `src/components/Blog.tsx` | Blog post list |
| `src/components/Contact.tsx` | LinkedIn/GitHub links |

## Contact form

The contact form is wired to local state. To make it send emails, connect it to one of:

- [Resend](https://resend.com) — recommended, generous free tier
- [Formspree](https://formspree.io) — drop-in, no backend needed
- [EmailJS](https://www.emailjs.com) — client-side only

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework: **Vite** (auto-detected)
4. Hit Deploy

Every `git push` to `main` redeploys automatically.

## Custom domain

In Vercel → Project Settings → Domains, add your domain and follow the DNS instructions.

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```
