import { defineConfig, loadEnv } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_URL_PATH_PREFIX || "/",
    plugins: [topLevelAwait(), react(), svgr()],
  };
});
