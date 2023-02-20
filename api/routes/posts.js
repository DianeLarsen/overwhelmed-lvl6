import express from "express";
import { getUserPosts, getAllPosts, getPost, deletePost, updatePost, createPost } from "../controllers/post.js";

const router = express.Router();

router.get("/timeline/:userId", getAllPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.get("/:id", getPost);
router.get("/profile/:username", getUserPosts)

export default router;
