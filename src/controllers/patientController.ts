import { Request, Response } from "express";
import Patient from "../models/Patient";

export const createPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nome, cpf, email, hospitalVinculado } = req.body;
  try {
    const newPatient = await Patient.create({
      nome,
      cpf,
      email,
      hospitalVinculado,
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPatientProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const patientId = req.user.uid;
  try {
    const patient = await Patient.findOne({ where: { id: patientId } });
    if (patient) res.json(patient);
    else res.status(404).json({ message: "Paciente não encontrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
