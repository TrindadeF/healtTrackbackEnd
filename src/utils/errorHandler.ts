import { Response } from "express";

export const handleError = (
  res: Response,
  error: any,
  statusCode: number = 500
) => {
  console.error("Erro:", error);
  res.status(statusCode).json({
    message: error.message || "Erro interno no servidor",
  });
};
