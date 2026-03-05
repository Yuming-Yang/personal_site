import path from "node:path";
import { defineConfig } from "vitest/config";

const parsedMaxWorkers = Number.parseInt(
  process.env.VITEST_MAX_WORKERS ?? "",
  10,
);
const maxWorkers = Number.isFinite(parsedMaxWorkers) ? parsedMaxWorkers : 1;

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    maxWorkers,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
