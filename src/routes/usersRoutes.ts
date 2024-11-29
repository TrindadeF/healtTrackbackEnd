import express from "express";
import { getUser, getUsers } from "../controllers/users/getUser";
import authenticateUser from "../middleware/authenticateUser";
import { getLoggedUser } from "../controllers/users/getLoggedUser";

const router = express.Router();
router.get("/logged", authenticateUser, getLoggedUser);
router.get("/patients", authenticateUser, getUsers);
router.get("/:id", getUser);

export default router;
