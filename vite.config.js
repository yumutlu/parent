import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "parent",
      remotes: {
        // remoteEntry'ların host ve portunu projeniz çalıştırırken kullanın
        child1: "http://localhost:3001/assets/remoteEntry.js",
        child2: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 3000,
  },
});
