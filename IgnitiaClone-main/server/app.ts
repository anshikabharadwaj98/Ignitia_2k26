import express, { type Request, Response, NextFunction } from "express";
import { storage } from "./storage";

export function createApp() {
  const app = express();

  app.use(express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    }
  }));
  app.use(express.urlencoded({ extended: false }));

  // API Routes
  // Add your API routes here with /api prefix
  // Example routes from your application:
  
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Add more API routes here as you build your application
  // app.get("/api/events", (req, res) => { ... });
  // app.post("/api/contact", (req, res) => { ... });

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  return app;
}
