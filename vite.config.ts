Ximport { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/swarna-jewellers-v3/',
  build: { outDir: 'dist' }
});
