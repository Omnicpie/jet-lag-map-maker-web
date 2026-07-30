import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
  base: "/jet-lag-map-maker-web/",
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
