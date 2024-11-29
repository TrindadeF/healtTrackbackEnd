import { Request, Response } from "express";
import User, { IUser } from "../../models/User";

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role: string;
  };
}

export const getLoggedUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { uid } = req.user!;

    const user: IUser | null = await User.findOne({ uid });

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
    console.error("Erro ao buscar usuário logado:", error);
    res.status(500).json({ error: "Erro ao buscar usuário logado." });
  }
};
