import express from "express";
import {
  createDiagnosis,
  getDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} from "../controllers/diagnosisController";

const router = express.Router();
router.post("/", createDiagnosis);
router.get("/:patientId", getDiagnosis);
router.put("/:id", updateDiagnosis);
router.delete("/:id", deleteDiagnosis);

export default router;
