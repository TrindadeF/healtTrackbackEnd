import express from "express";
import * as patientController from "../controllers/patientController";
import { validateData } from "../middleware/validateData";
import { authenticateUser } from "../middleware/authenticateUser";
import { authorizeRole } from "../middleware/authorizeRole";
import { patientSchema } from "../schemas/patientSchema";

const router = express.Router();

router.post(
  "/register",
  authenticateUser,
  authorizeRole("patient"),
  validateData(patientSchema),
  patientController.createPatient
);

router.get(
  "/profile",
  authenticateUser,
  authorizeRole("patient"),
  patientController.getPatientProfile
);

export default router;
