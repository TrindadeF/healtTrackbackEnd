import express from "express";
import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";
import diagnosisRoutes from "./diagnosisRoutes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", usersRoutes);
router.use("/diagnoses", diagnosisRoutes);
export default router;
