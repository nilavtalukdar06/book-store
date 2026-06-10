import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ message: "api is running" });
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
