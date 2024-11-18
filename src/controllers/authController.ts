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
