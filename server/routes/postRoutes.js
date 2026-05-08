import express from "express";
import { createPost, deletePost, getFeedPost, getPost, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const router= express.Router();

router.get("/feed",protectRoute,getFeedPost);
router.get("/:id",getPost);

router.post("/create",protectRoute,createPost);

router.delete("/:id",protectRoute ,deletePost);

router.put("/like/:id",protectRoute,likeUnlikePost);
router.put("/reply/:id",protectRoute,replyToPost);

export default router;