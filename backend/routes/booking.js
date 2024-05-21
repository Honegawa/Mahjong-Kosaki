import express from "express";
import {
  getAll,
  create,
  deleteById,
  getById,
  updateById,
} from "../controllers/booking.controller.js";
import { optionalVerify, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", verifyAdmin, updateById);
router.delete("/:id", optionalVerify, deleteById);

export default router;
