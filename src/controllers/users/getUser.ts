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

export const getUsers = async (req: Request, res: Response) => {
  const { role, email } = req.query;

  try {
    const filters: { [key: string]: any } = {};
    if (role) filters.role = role;
    if (email) filters.email = email;

    const users = await User.find(filters);

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};
