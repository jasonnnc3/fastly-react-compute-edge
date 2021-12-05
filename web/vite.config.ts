import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      fastly: resolve(__dirname, 'fastly'),
      vite: resolve(__dirname, 'vite'),
    },
  },
});
