import express from "express";
import { followUnfollowUser, login, logout, signupUser } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",login);
router.post("/logout",logout);
router.post("/follow/:id",protectRoute,followUnfollowUser);

export default router;