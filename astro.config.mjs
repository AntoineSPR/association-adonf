import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: isProd ? "https://associationadonf.fr" : "http://localhost:4321",
  base: "/",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  trailingSlash: isProd ? "always" : "ignore",
});
