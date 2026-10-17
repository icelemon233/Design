import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/cinna-design/' : '/',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@cinna-design/react/style.css',
        replacement: fileURLToPath(
          new URL('../../packages/react/src/styles/index.css', import.meta.url),
        ),
      },
      {
        find: '@cinna-design/react',
        replacement: fileURLToPath(new URL('../../packages/react/src/index.ts', import.meta.url)),
      },
    ],
  },
  server: {
    port: 5173,
  },
}));
