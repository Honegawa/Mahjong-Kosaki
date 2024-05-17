import express from "express";
import {
  getAll,
  create,
  deleteById,
  getById,
  updateById,
} from "../controllers/booking.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", verifyToken, verifyAdmin, updateById);
router.delete("/:id", deleteById);

export default router;
