import express from "express";
import {
  getAll,
  create,
  deleteById,
  getById,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.delete("/:id", deleteById);

export default router;
