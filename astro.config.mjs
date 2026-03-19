import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: isProd
    ? "https://antoinespr.github.io/association-adonf/"
    : "http://localhost:4321",
  base: isProd ? "/association-adonf/" : "/",
  output: "static",
  trailingSlash: isProd ? "always" : "ignore",
});
