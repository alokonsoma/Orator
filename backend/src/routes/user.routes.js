import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getUserById,
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.get("/:id", getUserById);

export default router;
