import express from "express";
import authenticate from "../middleware/authenticateUser";
import { authorizeRole } from "../middleware/authorizeRole";
import {
  createDiagnosis,
  getDiagnosis,
} from "../controllers/diagnosisController";
import { getUser } from "../controllers/users/getUser";
import authenticateUser from "../middleware/authenticateUser";

const router = express.Router();
router.post(
  "/diagnosis",
  authenticate,
  authorizeRole("medico"),
  createDiagnosis
);
router.get(
  "/diagnosis/:patientId",
  authenticate,
  authorizeRole("medico"),
  getDiagnosis
);

router.get(
  "/my-diagnoses",
  authenticate,
  authorizeRole("paciente"),
  (req, res) => {
    res.json({ message: "Aqui estão os seus diagnósticos." });
  }
);

router.get("/logged", authenticateUser, getUser);

export default router;
