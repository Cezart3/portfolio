# cezart3.vercel.app

Personal site and work index for Cezar Tocaciu — backend and machine-learning
engineer, Cluj-Napoca.

Every project entry carries the kind of confidence that stands behind it and the
artefact that pins it: automated tests, an out-of-sample validation, a client
using it daily, a maintainer who reviewed and merged it.

## Stack

Next.js 16 (App Router, fully static), TypeScript strict, Tailwind v4 for
layout with hand-written CSS for the design system. Three typefaces: Archivo for
display, Newsreader for body, JetBrains Mono for data.

## Local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## Layout

```
app/          routes, and the CSS layers (tokens -> base -> chrome -> specimen)
components/   header, footer, work index, evidence chip, hero specimen
content/      the site's data: profile, stack, projects and their case studies
public/       CV
```

Content lives in `content/`, typed. Adding a project means adding one object to
`content/projects.ts`; the index row and its case-study page are generated from it.
