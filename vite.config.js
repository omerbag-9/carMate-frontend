import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/carMate-frontend/', // Make sure the base is set to your repository name
  plugins: [react()],
})
