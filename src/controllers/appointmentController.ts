import { Request, Response } from "express";
import Appointment, { IAppointment } from "../models/Appointment";
import mongoose from "mongoose";

export const createAppointment = async (req: Request, res: Response) => {
  const { patientId, doctorId, date, time } = req.body;

  try {
    if (!patientId || !doctorId || !date || !time) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ error: "ID do paciente inválido." });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ error: "ID do médico inválido." });
    }

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
    });

    const savedAppointment = await newAppointment.save();
    res
      .status(201)
      .json({ message: "Consulta criada com sucesso.", savedAppointment });
  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    res.status(500).json({ error: "Erro ao criar consulta." });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Consulta não encontrada." });
    }

    res.status(200).json({
      message: "Consulta atualizada com sucesso.",
      updatedAppointment,
    });
  } catch (error) {
    console.error("Erro ao atualizar consulta:", error);
    res.status(500).json({ error: "Erro ao atualizar consulta." });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ error: "Consulta não encontrada." });
    }

    res
      .status(200)
      .json({ message: "Consulta excluída com sucesso.", deletedAppointment });
  } catch (error) {
    console.error("Erro ao excluir consulta:", error);
    res.status(500).json({ error: "Erro ao excluir consulta." });
  }
};

export const getAppointmentsByPatient = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId })
      .populate("patientId", "name email")
      .populate("doctorId", "name email")
      .sort({ date: 1, time: 1 });

    if (!appointments || appointments.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Erro ao buscar consultas do paciente:", error);
    res.status(500).json({ error: "Erro ao buscar consultas." });
  }
};

export const getAppointmentsByDoctor = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email")
      .sort({ date: 1, time: 1 });

    if (!appointments || appointments.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Erro ao buscar consultas do médico:", error);
    res.status(500).json({ error: "Erro ao buscar consultas." });
  }
};
