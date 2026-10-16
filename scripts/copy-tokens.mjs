import { copyFile, mkdir } from 'node:fs/promises';
const packageRoot = new URL('../packages/tokens/', import.meta.url);
await mkdir(new URL('dist/', packageRoot), { recursive: true });
await copyFile(new URL('src/tokens.css', packageRoot), new URL('dist/tokens.css', packageRoot));
