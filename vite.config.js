import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://mern-auth-backend-doyv.onrender.com', // Your backend URL on Render
    },
  },
});
