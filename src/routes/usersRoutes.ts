import express from "express";
import { getUser, getPatients, getDoctors } from "../controllers/users/getUser";
import authenticateUser from "../middleware/authenticateUser";
import { getLoggedUser } from "../controllers/users/getLoggedUser";

const router = express.Router();
router.get("/logged", authenticateUser, getLoggedUser);
router.get("/patients", authenticateUser, getPatients);
router.get("/doctors", authenticateUser, getDoctors);
router.get("/:id", getUser);

export default router;
