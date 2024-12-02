import express from "express";
import {
  getAll,
  getById,
  signup,
  signin,
  create,
  updateById,
  deleteById,
} from "../controllers/person.controller.js";
import {
  verifyAdmin,
  verifySelfOrAdmin,
  verifyToken,
} from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", signup);
router.post("/signin", signin);
router.post("/create", verifyAdmin, create);
router.put("/:id", verifyToken, updateById);
router.delete("/:id", verifySelfOrAdmin, deleteById);

export default router;
