#!/usr/bin/env node
/**
 * Assemble a public gallery from the three sibling biosim prototypes.
 * Sources (siblings of this repo):
 *   ../shader-biosim         → /specimens/   (WebGL sculpture gallery)
 *   ../shader-biosim-claude  → /organisms/   (WebGL fauna instrument)
 *   ../shader-biosim-cursor  → /flow/        (WebGPU Flow Lenia)
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const parent = path.resolve(root, '..');

const apps = [
  { id: 'specimens', src: 'shader-biosim', base: '/specimens/', strip: ['moments'] },
  { id: 'organisms', src: 'shader-biosim-claude', base: '/organisms/' },
  { id: 'flow', src: 'shader-biosim-cursor', base: '/flow/' },
];

function run(cmd, args, cwd) {
  console.log(`\n› ${cmd} ${args.join(' ')}  (${path.basename(cwd)})`);
  const r = spawnSync(cmd, args, { cwd, stdio: 'inherit', env: process.env });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function copyHub() {
  const hub = path.join(root, 'hub');
  for (const name of fs.readdirSync(hub)) {
    fs.cpSync(path.join(hub, name), path.join(dist, name), { recursive: true });
  }
}

rmrf(dist);
fs.mkdirSync(dist, { recursive: true });

for (const app of apps) {
  const srcDir = path.join(parent, app.src);
  if (!fs.existsSync(srcDir)) {
    console.error(`Missing source app: ${srcDir}`);
    process.exit(1);
  }
  const outDir = path.join(dist, app.id);
  // Fresh production build into our dist/<id>
  run(
    'npx',
    ['vite', 'build', '--base', app.base, '--outDir', outDir, '--emptyOutDir'],
    srcDir,
  );
  for (const s of app.strip ?? []) {
    const p = path.join(outDir, s);
    if (fs.existsSync(p)) {
      console.log(`  strip ${app.id}/${s}`);
      rmrf(p);
    }
  }
}

copyHub();

// Lightweight 404
fs.writeFileSync(
  path.join(dist, '404.html'),
  `<!doctype html><meta charset="utf-8"><title>Not found — 1203</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  html,body{margin:0;min-height:100%;background:#070809;color:#e8e4dc;font:16px/1.5 "IBM Plex Sans",system-ui,sans-serif}
  main{max-width:36rem;margin:20vh auto;padding:0 1.5rem}
  a{color:#c4a574}
</style>
<main><p>Nothing here.</p><p><a href="/">← 1203 biosim³</a></p></main>`,
);

const size = spawnSync('du', ['-sh', dist], { encoding: 'utf8' });
console.log(`\n✓ assembled ${dist} (${(size.stdout || '').trim()})`);
