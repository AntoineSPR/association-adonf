import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = express();

// Set up static files. This bypasses the node standalone adapter issue
app.use(express.static("dist/client/"));

// Let Astro handle all the other routes
app.use(ssrHandler);

const PORT = process.env.PORT || 4321;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
