import express from "express";
import {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} from "../controllers/tournament.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", verifyAdmin, create);
router.put("/:id", verifyAdmin, updateById)
router.delete("/:id", verifyAdmin, deleteById);

export default router;
