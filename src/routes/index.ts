import express from "express";
import authRoutes from "./authRoutes";
import doctorRoutes from "./doctorRoutes";
import patientRoutes from "./patientRoutes";
import diagnosisRoutes from "./diagnosisRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patients", patientRoutes);
router.use("/diagnoses", diagnosisRoutes);

export default router;
