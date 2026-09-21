# CODEX NOCTURNUM

A production-ready Next.js archive experience for historical witchcraft, folklore, ritual, botanical lore, divination, and European folk traditions.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Content architecture

All editorial content is driven by `data/codex.ts`. Add a new entry once and it becomes available to archive filters, search, LIBER pages, related-entry links, and static route generation.

Editorial labels deliberately distinguish historical documentation, folklore, oral tradition, modern reconstruction, and contemporary practice. Prototype entries are editorial demonstrations, not a substitute for final scholarly fact-checking and citation at publication time.
