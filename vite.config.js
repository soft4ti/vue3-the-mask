import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command, mode }) => {
  const isDocs = mode === "docs";

  if (isDocs) {
    return {
      root: resolve(__dirname, "src/docs"),
      base: "./",
      plugins: [vue()],
      server: {
        port: 5173,
      },
      build: {
        outDir: resolve(__dirname, "docs"),
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, "src/docs/index.html"),
        },
      },
      test: {
        globals: true,
        environment: "jsdom",
      },
    };
  }

  // Default: library build
  return {
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.js"),
        name: "VueTheMask",
        formats: ["es", "umd"],
        fileName: (format) =>
          format === "umd"
            ? "vue-the-mask.umd.js"
            : `vue-the-mask.${format}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          exports: "named",
          globals: {
            vue: "Vue",
          },
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      include: ["test/**/*.test.js"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: ["src/**/*.{js,vue}"],
        exclude: ["src/index.js", "src/docs/**"],
      },
    },
  };
});
