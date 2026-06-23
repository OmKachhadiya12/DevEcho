import express from "express";
import { followUnfollowUser, getUserProfile, login, logout, signupUser, updateprofile ,getSuggestedUsers , freezeAccount } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile/:query",getUserProfile);

router.post("/signup",signupUser);
router.get("/suggested",protectRoute,getSuggestedUsers);
router.post("/login",login);
router.post("/logout",logout);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.put("/update/:id",protectRoute,updateprofile);
router.put("/freeze", protectRoute, freezeAccount);

export default router;