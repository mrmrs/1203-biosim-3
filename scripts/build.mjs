#!/usr/bin/env node
/**
 * Production build of shader-biosim-cursor → ./dist (site root).
 * Sibling path: ../shader-biosim-cursor
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const src = path.resolve(root, '../shader-biosim-cursor');

if (!fs.existsSync(src)) {
  console.error(`Missing app source: ${src}`);
  process.exit(1);
}

fs.rmSync(dist, { recursive: true, force: true });

console.log(`› vite build → ${dist}`);
const r = spawnSync(
  'npx',
  ['vite', 'build', '--base', '/', '--outDir', dist, '--emptyOutDir'],
  { cwd: src, stdio: 'inherit', env: process.env },
);
if (r.status !== 0) process.exit(r.status ?? 1);

const size = spawnSync('du', ['-sh', dist], { encoding: 'utf8' });
console.log(`✓ ${dist} (${(size.stdout || '').trim()})`);
