import express from "express";
import { createComment, deleteComment, toggleLikeComment, updateComment } from "../../controllers/user/comment.controller.js";
import isLoggedIn from "../../middlewares/user/auth.middleware.js";

const router = express.Router();

router.post("/create", createComment);
router.put("/like/:id", isLoggedIn, toggleLikeComment);
router.put("/update/:id", isLoggedIn, updateComment);
router.delete("/delete/:id", isLoggedIn, deleteComment);

export default router;