import { Request, Response } from "express";
import Doctor from "../models/Doctor";

export const createDoctor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nome, cpf, crm, hospitalVinculado, email } = req.body;
  try {
    const newDoctor = await Doctor.create({
      nome,
      cpf,
      crm,
      hospitalVinculado,
      email,
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
