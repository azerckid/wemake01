import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    allowedHosts: ["localhost", "127.0.0.1", "0.0.0.0", "palace-payments-wet-vg.trycloudflare.com"],
    hmr: {
      overlay: false
    }
  },
});
