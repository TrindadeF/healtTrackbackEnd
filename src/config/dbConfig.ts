import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const dbUri = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
