import express from "express";
import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", usersRoutes);

export default router;
