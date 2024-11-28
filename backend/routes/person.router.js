import express from "express";
import {
  getAll,
  getById,
  signup,
  signin,
  updateById,
  deleteById,
} from "../controllers/person.controller.js";
import {
  verifySelfOrAdmin,
  verifyToken,
} from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", signup);
router.post("/signin", signin);
router.put("/:id", verifyToken, updateById);
router.delete("/:id", verifySelfOrAdmin, deleteById);

export default router;
