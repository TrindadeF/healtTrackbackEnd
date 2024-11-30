import { Request, Response } from "express";
import Diagnosis from "../models/Diagnosis";
import mongoose from "mongoose";

export const createDiagnosis = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { patientId, doctorId, description, medications, exams } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      throw new Error("patientId inválido");
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      throw new Error("doctorId inválido");
    }

    const newDiagnosis = new Diagnosis({
      patientId: new mongoose.Types.ObjectId(patientId),
      doctorId: new mongoose.Types.ObjectId(doctorId),
      description,
      medications,
      exams,
    });

    const savedDiagnosis = await newDiagnosis.save();

    res.status(201).json({
      message: "Diagnóstico criado com sucesso",
      diagnosis: savedDiagnosis,
    });
  } catch (error: any) {
    console.error("Erro ao criar diagnóstico:", error);
    res.status(400).json({ error: error.message });
  }
};
export const getDiagnosis = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { patientId } = req.params;

  try {
    if (!patientId) {
      res.status(400).json({ error: "O ID do paciente é obrigatório." });
    }

    const diagnoses = await Diagnosis.find({ patientId })
      .populate("doctorId", "name email hospital")
      .sort({ createdAt: -1 });

    if (!diagnoses || diagnoses.length === 0) {
      res.status(404).json({ error: "Nenhum diagnóstico encontrado." });
    }

    res.status(200).json(diagnoses);
  } catch (error: any) {
    console.error("Erro ao buscar diagnósticos:", error);
    res.status(500).json({ error: "Erro ao buscar diagnósticos." });
  }
};

export const updateDiagnosis = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedDiagnosis) {
      res.status(404).json({ error: "Diagnóstico não encontrado." });
    }

    res.status(200).json({
      message: "Diagnóstico atualizado com sucesso",
      diagnosis: updatedDiagnosis,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar diagnóstico:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteDiagnosis = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedDiagnosis = await Diagnosis.findByIdAndDelete(id);

    if (!deletedDiagnosis) {
      res.status(404).json({ error: "Diagnóstico não encontrado." });
    }

    res.status(200).json({
      message: "Diagnóstico excluído com sucesso",
      diagnosis: deletedDiagnosis,
    });
  } catch (error: any) {
    console.error("Erro ao excluir diagnóstico:", error);
    res.status(500).json({ error: error.message });
  }
};
