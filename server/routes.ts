import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createGitHubRepo } from "./github-deploy";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Create GitHub repository
  app.post("/api/create-github-repo", async (req, res) => {
    try {
      const { repoName = "night-word" } = req.body;
      const repoUrl = await createGitHubRepo(repoName);
      res.json({ success: true, repoUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
