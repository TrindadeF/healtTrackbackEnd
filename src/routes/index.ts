import express from "express";
import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";
import diagnosisRoutes from "./diagnosisRoutes";
import appointment from "./appointment";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", usersRoutes);
router.use("/diagnoses", diagnosisRoutes);
router.use("/appointment", appointment);

export default router;
