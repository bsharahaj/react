import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite + React setup (requirement R-8).
export default defineConfig({
  plugins: [react()],
});
