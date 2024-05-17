import express from "express";
import {
  getAll,
  create,
  deleteById,
  getById,
} from "../controllers/contact.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.delete("/:id", verifyToken, verifyAdmin, deleteById);

export default router;
