# 1203 — biosim³

One public URL for three biosim prototypes:

| Path | Source | Stack |
|------|--------|-------|
| `/` | Gallery hub | static |
| `/specimens/` | `shader-biosim` | WebGL2 |
| `/organisms/` | `shader-biosim-claude` | WebGL2 |
| `/flow/` | `shader-biosim-cursor` | WebGPU |

The engines stay separate. This repo is a **presentation shell** that builds each sibling into a subpath and deploys them together on Cloudflare Workers.

## Requirements

Sibling repos must sit next to this folder:

```
p/
  1203-biosim-3/          ← this repo
  shader-biosim/
  shader-biosim-claude/
  shader-biosim-cursor/
```

Node 20+, Cloudflare account (`wrangler` logged in), Chrome for `/flow/`.

## Build & deploy

```bash
npm install
npm run build     # builds all three apps + hub → dist/
npm run deploy    # build + wrangler deploy
```

Preview locally:

```bash
npm run preview
```

## Notes

- Large `moments/` checkpoints from specimens are stripped before upload.
- Flow requires WebGPU; the hub detects support and soft-blocks the link when missing.
