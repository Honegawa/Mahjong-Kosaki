import express from "express";
import {
  getAll,
  getById,
  getGamesById,
  signup,
  signin,
  updateById,
  deleteById,
} from "../controllers/member.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/:id/games", getGamesById);
router.post("/", signup);
router.post("/signin", signin)
router.put("/:id", verifyToken, updateById)
router.delete("/:id", verifyAdmin, deleteById);

export default router;
