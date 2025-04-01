import express from "express";
import next from "next";
import routes from "./routes";
import { authMiddleware } from './middleware'

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./src" }); // Point Next.js to src/
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(() => {
  const server = express();

  // Use API routes
  server.use("/api", routes, authMiddleware);

  // Handle all other routes with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});