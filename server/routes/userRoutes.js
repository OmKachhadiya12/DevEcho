import express from "express";
import { login, logout, signupUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",login);
router.post("/logout",logout);

export default router;