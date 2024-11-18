import { Request, Response } from "express";
import Doctor from "../models/Doctor";

// Criação de novo médico
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

export const getDoctorProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const doctorId = req.user.uid;
  try {
    const doctor = await Doctor.findOne({ where: { id: doctorId } });
    if (doctor) res.json(doctor);
    else res.status(404).json({ message: "Médico não encontrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
