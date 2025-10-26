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
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

function cssVarMinifier() {
  const variableReplacements: Array<[string, string]> = [
    ["--rdmt-size", "--rdmts"],
    ["--rdmt-padding", "--rdmtp"],
    ["--rdmt-bg-light", "--rdmtbgl"],
    ["--rdmt-bg-dark", "--rdmtbgd"],
    ["--rdmt-radius", "--rdmtr"],
    ["--rdmt-color-light", "--rdmtcl"],
    ["--rdmt-color-dark", "--rdmtcd"],
    ["--rdmt-color-hover-light", "--rdmtchl"],
    ["--rdmt-color-hover-dark", "--rdmtchd"],
    ["--rdmt-ease-in", "--rdmtei"],
    ["--rdmt-ease-elastic-1", "--rdmtee1"],
    ["--rdmt-ease-elastic-2", "--rdmtee2"],
    ["--rdmt-ease-out", "--rdmteo"],
    ["--rdmt-icon-fill", "--rdmtif"],
    ["--rdmt-icon-fill-hover", "--rdmtifh"],
  ];

  // const classReplacements: Array<[string, string]> = [
  //   ["rdmt_moon_mask", "rmm"],
  //   ["rdmt_sunandmoon", "rsm"],
  //   ["rdmt_toggle", "rt"],
  //   ["rdmt_sun", "rs"],
  //   ["rdmt_beams", "rb"],
  //   ["rdmt_moon", "rm"],
  //   ["rdmt", "r"],
  // ];

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
        for (const [from, to] of variableReplacements) {
          if (code.includes(from)) {
            code = code.split(from).join(to);
            mutated = true;
          }
        }
        // for (const [from, to] of classReplacements) {
        //   if (code.includes(from)) {
        //     code = code.split(from).join(to);
        //     mutated = true;
        //   }
        // }
        if (mutated) {
          (chunk as any).code = code;
        }
      }
    },
  };
}
