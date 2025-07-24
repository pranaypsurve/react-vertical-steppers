// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "index.tsx", // ✅ Update this line
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: false,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    url({
      include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.gif", "**/*.scss"],
      limit: 0, // Forces files to be copied rather than inlined
      fileName: "[name][extname]", // Keep original file names
      destDir: "dist/assets", // Where to output the copied assets
    }),
    terser(),
  ],
};
