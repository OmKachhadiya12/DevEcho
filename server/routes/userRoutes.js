import express from "express";
import { followUnfollowUser, getUserProfile, login, logout, signupUser, updateprofile } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile/:username",getUserProfile);

router.post("/signup",signupUser);
router.post("/login",login);
router.post("/logout",logout);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.put("/update/:id",protectRoute,updateprofile);

export default router;