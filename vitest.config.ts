import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: ["packages/*/vitest.config.ts"],
    include: ["**/*.test.ts", "**/*.test-d.ts"],
    reporters: [["default", { summary: false }]],
  },
});
