import express from "express";
import {
  getAll,
  getById,
  deleteById,
} from "../controllers/person.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id", verifyAdmin, deleteById);

export default router;
