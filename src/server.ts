import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Erro interno no servidor:", err.stack);
    res.status(500).json({
      message: "Erro interno no servidor",
      error: err.message,
    });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
