import { Request, Response, NextFunction } from "express";

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (userRole !== requiredRole) {
      res.status(403).json({
        message: "Acesso negado: você não tem permissão para acessar esta rota",
      });
      return;
    }

    next();
  };
};
