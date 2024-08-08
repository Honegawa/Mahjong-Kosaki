import express from "express";
import {
  getAll,
  create,
  deleteById,
  getById,
  updateById,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", verifyToken, create);
router.put("/:id", verifyToken, updateById);
router.delete("/:id", verifyToken, deleteById);

export default router;
