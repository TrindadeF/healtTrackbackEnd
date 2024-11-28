import express from "express";
import { getUser, getUsers } from "../controllers/users/getUser";
import authenticateUser from "../middleware/authenticateUser";

const router = express.Router();
router.get("/logged", authenticateUser, getUser);
router.get("/patients", getUsers);

export default router;
