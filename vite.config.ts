/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import terser from "@rollup/plugin-terser";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    cssVarMinifier(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactDarkModeToggle",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [terser()],
    },
    // minify: "terser",
    // terserOptions: {
    //   compress: {
    //     passes: 2,
    //     pure_getters: true,
    //     unsafe_comps: true,
    //     unsafe: true,
    //     module: true,
    //   },
    //   mangle: true,
    // },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

function cssVarMinifier() {
  const replacements: Array<[string, string]> = [
    ["--rdmt-size", "--rdmt-s"],
    ["--rdmt-padding", "--rdmt-p"],
    ["--rdmt-bg-light", "--rdmt-bg-l"],
    ["--rdmt-bg-dark", "--rdmt-bg-d"],
    ["--rdmt-radius", "--rdmt-r"],
    ["--rdmt-color-light", "--rdmt-c-l"],
    ["--rdmt-color-dark", "--rdmt-c-d"],
    ["--rdmt-color-hover-light", "--rdmt-c-h-l"],
    ["--rdmt-color-hover-dark", "--rdmt-c-h-d"],
  ];

  return {
    name: "rdmt-css-var-minifier",
    apply: "build" as const,
    generateBundle(_options: unknown, bundle: Record<string, unknown>) {
      for (const chunk of Object.values(bundle)) {
        if (
          !chunk ||
          typeof chunk !== "object" ||
          (chunk as any).type !== "chunk"
        ) {
          continue;
        }
        let code = (chunk as any).code as string;
        let mutated = false;
        for (const [from, to] of replacements) {
          if (code.includes(from)) {
            code = code.split(from).join(to);
            mutated = true;
          }
        }
        if (mutated) {
          (chunk as any).code = code;
        }
      }
    },
  };
}
