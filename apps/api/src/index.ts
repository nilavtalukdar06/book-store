import { env } from "./config/env";
import express, { Application, Request, Response } from "express";
import logger from "./config/logger";
import { ApiResponse } from "./utils/response";
import StatusCodes from "http-status-codes";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/book";
import { corsMiddleware } from "./middlewares/cors";
import { apiRateLimiter } from "./middlewares/rateLimit";

const app: Application = express();
const port = env.PORT || 3000;

app.use(corsMiddleware);
app.use(apiRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.get("/health", (_req: Request, res: Response) => {
  return res
    .status(200)
    .json(new ApiResponse(StatusCodes.OK, true, "api is working"));
});

app.listen(port, () => {
  logger.info(`server is running on ${port}`);
});
