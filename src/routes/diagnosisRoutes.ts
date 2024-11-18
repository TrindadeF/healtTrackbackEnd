import express from "express";
import * as diagnosisController from "../controllers/diagnosisController";
import { validateData } from "../middleware/validateData";
import { authenticateUser } from "../middleware/authenticateUser";
import { authorizeRole } from "../middleware/authorizeRole";
import { diagnosisSchema } from "../schemas/diagnosisSchema";

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRole("doctor"),
  validateData(diagnosisSchema),
  diagnosisController.createDiagnosis
);

router.get(
  "/:patientId",
  authenticateUser,
  authorizeRole("patient"),
  diagnosisController.getDiagnosis
);

export default router;
