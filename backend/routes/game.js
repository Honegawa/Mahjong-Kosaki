import express from "express";
import {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByIdT,
} from "../controllers/game.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/tournament/:idT", getByIdT)
router.post("/", verifyAdmin, create);
router.put("/:id", verifyAdmin, updateById)
router.delete("/:id", verifyAdmin, deleteById);

export default router;
