import { Request, Response } from "express";
import User, { IUser } from "../../models/User";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { uid } = req.query;

  try {
    let user: IUser | null;

    if (id) {
      user = await User.findById(id);
    } else if (uid) {
      user = await User.findOne({ uid });
    } else {
      return res.status(400).json({
        error: "Por favor, forneça um 'id' ou 'uid' para buscar o usuário.",
      });
    }

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json({
      id: user._id,
      uid: user.uid,
      email: user.email,
      name: user.name,
      role: user.role,
      ...(user.role === "medico" && { hospital: user.hospital }),
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await User.find({ role: "paciente" }).select(
      "_id uid name email hospital"
    );

    const formattedPatients = patients.map((patient) => ({
      id: patient._id,
      uid: patient.uid,
      name: patient.name,
      email: patient.email,
      hospital: patient.hospital,
    }));

    res.status(200).json(formattedPatients);
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    res.status(500).json({ error: "Erro ao buscar pacientes." });
  }
};

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await User.find({ role: "medico" }).select(
      "_id uid name email hospital"
    );

    const formattedDoctors = doctors.map((doctor) => ({
      id: doctor._id,
      uid: doctor.uid,
      name: doctor.name,
      email: doctor.email,
      hospital: doctor.hospital,
    }));

    res.status(200).json(formattedDoctors);
  } catch (error) {
    console.error("Erro ao buscar médicos:", error);
    res.status(500).json({ error: "Erro ao buscar médicos." });
  }
};
