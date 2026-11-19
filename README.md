# 1203-biosim-3

Public deploy of the **Flow Lenia** biosim (`shader-biosim-cursor`).

The live site opens the instrument immediately — no gallery, no approach picker.

| | |
|---|---|
| **App** | WebGPU Flow Lenia specimen instrument |
| **Source** | sibling repo `../shader-biosim-cursor` |
| **Host** | Cloudflare Workers (static assets) |

## Develop

Work in the source app:

```bash
cd ../shader-biosim-cursor
npm run dev   # http://127.0.0.1:5188
```

## Deploy

From this repo (sibling `shader-biosim-cursor` must exist):

```bash
npm install --include=optional
npm run deploy    # build + wrangler deploy
```

Preview:

```bash
npm run preview
```

Needs Chrome/Edge 113+ (or Safari 26+) with WebGPU.
