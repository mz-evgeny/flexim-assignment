import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/index.ts"],
  esbuildPlugins: [],
  format: "cjs",
  minify: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
});
