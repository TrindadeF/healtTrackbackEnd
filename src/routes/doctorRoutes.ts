import express from "express";
import * as doctorController from "../controllers/doctorController";
import { validateData } from "../middleware/validateData";
import { authenticateUser } from "../middleware/authenticateUser";
import { authorizeRole } from "../middleware/authorizeRole";
import { doctorSchema } from "../schemas/doctorSchema";

const router = express.Router();

router.post(
  "/register",
  authenticateUser,
  authorizeRole("doctor"),
  validateData(doctorSchema),
  doctorController.createDoctor
);

router.get(
  "/profile",
  authenticateUser,
  authorizeRole("doctor"),
  doctorController.getDoctorProfile
);

export default router;
