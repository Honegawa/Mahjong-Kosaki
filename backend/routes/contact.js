import express from "express";
import {
  getAll,
  create,
  deleteById,
  getById,
} from "../controllers/contact.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.delete("/:id", verifyAdmin, deleteById);

export default router;
