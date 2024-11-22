import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error("A variável de ambiente DB_URI não está definida!");
}

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
