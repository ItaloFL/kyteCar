import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import path from "path";
import cors from "cors";
import { kyteRoutes } from "./routes/routes";
import { AppError } from "./errors/AppError/AppError";

const app = express();
app.use(express.json());
app.use(cors());
app.use(kyteRoutes);
app.use(
  "/file",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(express.urlencoded({ extended: true }));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.code).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `Server Error, ${err.message}`,
    });
  }
);

app.listen("3333", () => {
  console.log("Server is running on port 3333 🔥");
});
