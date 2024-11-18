import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/dbConfig";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
