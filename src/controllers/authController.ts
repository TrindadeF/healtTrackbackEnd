import { Request, Response } from "express";
import { auth } from "../config/firebaseAdmin";
import User from "../models/User";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role, name, hospital } = req.body;

  console.log("Recebendo dados para registro:", req.body);

  try {
    const firebaseUser = await auth.createUser({ email, password });
    console.log("Usuário criado no Firebase:", firebaseUser);

    const newUser = new User({
      uid: firebaseUser.uid,
      email,
      name,
      role,
      hospital: role === "medico" ? hospital : undefined,
    });

    const savedUser = await newUser.save();
    console.log("Usuário salvo no MongoDB:", savedUser);

    res.status(201).json({
      message: "Usuário registrado com sucesso.",
      user: {
        uid: savedUser.uid,
        email: savedUser.email,
        name: savedUser.name,
        role: savedUser.role,
        hospital: savedUser.hospital,
      },
    });
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error);
    if (error instanceof mongoose.Error || error.message.includes("MongoDB")) {
      const { email } = req.body;
      const firebaseUser = await auth.getUserByEmail(email).catch(() => null);

      if (firebaseUser) {
        await auth
          .deleteUser(firebaseUser.uid)
          .catch(() => console.error("Erro ao reverter usuário no Firebase."));
      }

      res.status(500).json({
        error:
          "Erro ao salvar usuário no banco de dados. Registro foi desfeito.",
      });
    } else {
      res.status(400).json({ error: "Erro ao registrar usuário no Firebase." });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, idToken } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ message: "Email inválido ou ausente." });
    return;
  }

  if (!idToken) {
    res.status(400).json({ message: "Token ausente." });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log("Token decodificado:", decodedToken);

    const firebaseUser = await auth.getUserByEmail(email);
    if (!firebaseUser || firebaseUser.uid !== decodedToken.uid) {
      res.status(401).json({
        message: "Token inválido ou não corresponde ao usuário.",
      });
      return;
    }

    const user = await User.findOne({ uid: firebaseUser.uid });
    if (!user) {
      res.status(404).json({ message: "Usuário não registrado no sistema." });
      return;
    }

    res.status(200).json({
      message: "Login realizado com sucesso.",
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        role: user.role,
        hospital: user.hospital,
      },
    });
  } catch (error: any) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(400).json({ error: error.message });
  }
};
