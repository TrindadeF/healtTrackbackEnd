import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseAdmin";

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string;
    role: string;
  };
}

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token de autenticação não fornecido." });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);

    (req as AuthenticatedRequest).user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      role: decodedToken.role || "user",
    };

    next();
  } catch (error) {
    console.error("Erro ao autenticar o usuário:", error);
    res.status(401).json({ message: "Token inválido." });
  }
};

export default authenticateUser;
