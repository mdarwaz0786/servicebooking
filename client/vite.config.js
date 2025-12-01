import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  base: "/",
  server: {
    host: true,
    https: {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  plugins: [react()],
});
