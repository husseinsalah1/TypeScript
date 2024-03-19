import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import Database from "./config/database";
import dotenv from "dotenv";
import ErrorHandler from "./middlewares/ErrorHandler";
import { AppError } from "./AppError";
import userRouter from "./modules/user/userRoutes";
import authRouter from "./modules/user/auth/AuthRoutes";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import categoryRouter from "./modules/category/CategoryRoutes";

dotenv.config();
const app = express();
const URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/Refactor-TS";
const PORT = process.env.PORT || 3000;

Database.connect(URL);
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      "Internal Server Error",
      500,
      `Cannot find this route : ${req.originalUrl}`,
      true
    )
  );
});

const errorHandler = new ErrorHandler();
app.use(errorHandler.HandleExpressErrorsMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
