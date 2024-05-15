import { configDefaults, defineConfig } from "vitest/config";
import { join } from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src/demo",
  base: "/demo/",
  build: {
    outDir: join(import.meta.dirname, "docs/demo"),
    emptyOutDir: true,
  },
  test: {
    root: ".",
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest-setup.js"],
    exclude: [...configDefaults.exclude, "./src/demo/**"],
    coverage: {
      provider: "v8",
      exclude: ["dist/**", "docs/**", "src/demo/**"],
      reporter: ["cobertura", "text"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
