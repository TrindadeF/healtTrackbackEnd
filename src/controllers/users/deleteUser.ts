import { Request, Response } from "express";
import User from "../../models/User";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json({
      message: "Usuário deletado com sucesso",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};
