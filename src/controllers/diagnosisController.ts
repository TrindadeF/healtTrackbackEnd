import { Request, Response } from "express";
import Diagnosis from "../models/Diagnosis";

export const createDiagnosis = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { patientId, doctorId, description, medications, exams } = req.body;
  try {
    const newDiagnosis = await Diagnosis.create({
      patientId,
      doctorId,
      description,
      medications,
      exams,
    });
    res.status(201).json(newDiagnosis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDiagnosis = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { patientId } = req.params;
  try {
    const diagnoses = await Diagnosis.findAll({ where: { patientId } });
    res.json(diagnoses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
