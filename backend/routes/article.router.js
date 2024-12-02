import express from "express";
import {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} from "../controllers/article.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { configurationStorage } from "../middlewares/multer.js";

const router = express.Router();
const multer = configurationStorage();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", verifyAdmin, multer.array("uploads[]", 5), create);
router.put("/:id", verifyAdmin, multer.array("uploads[]", 5), updateById);
router.delete("/:id", verifyAdmin, deleteById);

export default router;
