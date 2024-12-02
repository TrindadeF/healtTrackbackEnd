import express from "express";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
} from "../controllers/appointmentController";

const router = express.Router();

router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/patient/:patientId", getAppointmentsByPatient);
router.get("/doctor/:doctorId", getAppointmentsByDoctor);

export default router;
