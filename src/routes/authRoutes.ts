import express from "express";
import * as authController from "../controllers/authController";
import { validateData } from "../middleware/validateData";
import { registerSchema } from "../schemas/authSchema";

const router = express.Router();

router.post("/register", validateData(registerSchema), authController.register);
router.post("/login", authController.login);

export default router;
