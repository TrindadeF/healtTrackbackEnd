import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import connectDB from "./config/dbConfig";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", routes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(500)
      .json({ message: "Erro interno no servidor", error: err.message });
  }
);

export default app;
