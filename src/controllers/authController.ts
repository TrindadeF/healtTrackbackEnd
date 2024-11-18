import { Request, Response } from "express";
import admin from "../config/firebaseAdmin";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;
  try {
    const user = await admin.auth().createUser({ email, password });
    res.status(201).json({ uid: user.uid });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const customToken = await admin.auth().createCustomToken(user.uid);

    res.status(200).json({ token: customToken });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao autenticar usuário", error: error.message });
  }
};
