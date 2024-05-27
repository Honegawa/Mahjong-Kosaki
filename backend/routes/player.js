import express from "express";
import {
  getAll,
  getByIdG,
  getByIdM,
  getByIdMAndIdG,
  create,
  deleteByIdMAndIdG,
} from "../controllers/player.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/game/:idG", getByIdG);
router.get("/member/:idM", getByIdM);
router.get("/member/:idM/game/:idG", getByIdMAndIdG);
router.post("/", verifyAdmin, create);
router.delete("/member/:idM/game/:idG", verifyAdmin, deleteByIdMAndIdG);

export default router;
