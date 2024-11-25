import { Request, Response } from "express";
import { auth } from "../config/firebaseAdmin";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role, name, hospital } = req.body;

  try {
    console.log("Recebendo dados para registro:", req.body);

    const firebaseUser = await auth.createUser({ email, password });
    console.log("Usuário criado no Firebase:", firebaseUser);

    try {
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
    } catch (mongoError) {
      console.error(
        "Erro ao salvar usuário no MongoDB, revertendo Firebase:",
        mongoError
      );

      await auth.deleteUser(firebaseUser.uid);

      res.status(500).json({
        error:
          "Erro ao salvar usuário no banco de dados. Registro no Firebase foi desfeito.",
      });
    }
  } catch (firebaseError) {
    console.error("Erro ao criar usuário no Firebase:", firebaseError);
    res.status(400).json({
      error: "Erro ao registrar usuário no Firebase.",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const firebaseUser = await auth.getUserByEmail(email);
    if (!firebaseUser) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const user = await User.findOne({ uid: firebaseUser.uid });
    if (!user) {
      res.status(404).json({ message: "Usuário não registrado no sistema." });
      return;
    }

    const customToken = await auth.createCustomToken(firebaseUser.uid);

    res.status(200).json({
      message: "Login realizado com sucesso.",
      token: customToken,
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
