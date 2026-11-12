/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // "prompt": a new version waits until the reader accepts, so a reload never lands mid-checklist.
      registerType: "prompt",
      includeAssets: ["icons/favicon.svg", "icons/apple-touch-icon.png", "fonts/*.woff2"],
      manifest: {
        id: "/",
        name: "Red Dead Field Guide",
        short_name: "Red Dead",
        description: "A spoiler-aware walkthrough and 100% completion checklist for the original Red Dead Redemption campaign.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        theme_color: "#281b15",
        background_color: "#231812",
        categories: ["games", "utilities"],
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          { src: "icons/favicon.svg", sizes: "any", type: "image/svg+xml" },
        ],
      },
      workbox: {
        // Precache the whole shell, fonts and banners (~1.2 MB) so the guide works offline.
        globPatterns: ["**/*.{js,css,html,webp,woff2,png,svg}"],
        // Client-side routes (/guide/3 …) all resolve to the app shell.
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
      },
      devOptions: { enabled: false },
    }),
  ],
  build: { target: "es2022", sourcemap: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
