import { Request, Response } from "express";
import { auth } from "../config/firebaseAdmin";
import User from "../models/User";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role, name, hospital } = req.body;

  console.log("Recebendo dados para registro:", req.body);

  try {
    const existingUserInDB = await User.findOne({ email });
    if (existingUserInDB) {
      res
        .status(400)
        .json({ error: "Este e-mail já está em uso no nosso sistema." });
      return;
    }

    const existingUserInFirebase = await auth
      .getUserByEmail(email)
      .catch(() => null);
    if (existingUserInFirebase) {
      res
        .status(400)
        .json({ error: "Este e-mail já está registrado no Firebase." });
      return;
    }

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
        await auth.deleteUser(firebaseUser.uid).catch(() => {
          console.error("Erro ao reverter usuário no Firebase.");
        });
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
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({ message: "Token ausente." });
      return;
    }

    const decodedToken = await auth.verifyIdToken(idToken);

    const firebaseUid = decodedToken.uid;
    console.log("UID do Firebase:", firebaseUid);

    const user = await User.findOne({ uid: firebaseUid });

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
    res.status(500).json({ message: "Erro ao processar a autenticação." });
  }
};
