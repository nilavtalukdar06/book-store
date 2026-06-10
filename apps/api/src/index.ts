import "dotenv/config";
import express, { Application, Request, Response } from "express";
import logger from "./config/logger";
import { env } from "./config/env";

const app: Application = express();
const port = env.port || 3000;

app.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({ message: "api is running" });
});

app.listen(port, () => {
  logger.info("server is running on port", port);
});
