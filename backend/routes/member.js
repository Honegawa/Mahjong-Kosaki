import express from "express";
import {
  getAll,
  getById,
  signup,
  updateById,
  deleteById,
} from "../controllers/member.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", signup);
router.put("/:id", updateById)
router.delete("/:id", deleteById);

export default router;
