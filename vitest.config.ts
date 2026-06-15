import {defineConfig} from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
    coverage: {
      reporter: ["text", "html"]
    }
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname
    }
  }
});
