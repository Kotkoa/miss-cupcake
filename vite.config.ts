import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /miss-cupcake/; its workflow sets BASE_PATH. Locally and on a root
  // domain (Vercel) the base stays "/".
  base: process.env.BASE_PATH ?? '/',
})
