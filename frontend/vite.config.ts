import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/// <reference types="vitest" />
/// <reference types="vite/client" />

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/vitest.setup.ts"],
    css: true,
    testTimeout: 5000,
    reporters: ["verbose"],
  },
});
