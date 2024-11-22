import express from "express";
import {
  createDiagnosis,
  getDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} from "../controllers/diagnosisController";

const router = express.Router();

router.post("/diagnosis", createDiagnosis);
router.get("/diagnosis/:patientId", getDiagnosis);
router.put("/diagnosis/:id", updateDiagnosis);
router.delete("/diagnosis/:id", deleteDiagnosis);

export default router;
