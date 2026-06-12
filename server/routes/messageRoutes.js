import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getConversation, getMessage, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);

router.get("/conversation", protectRoute, getConversation);

router.get("/:otherUserId", protectRoute, getMessage);

export default router;