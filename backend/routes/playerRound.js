import express from "express";
import {
  getAll,
  getByIdR,
  getByIdRAndIdM,
  create,
  updateByIdRAndIdM,
  deleteByIdRAndIdM,
} from "../controllers/playerRound.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/round/:idR", getByIdR);
router.get("/round/:idR/member/:idM", getByIdRAndIdM);
router.post("/", verifyAdmin, create);
router.put("/round/:idR/member/:idM", verifyAdmin, updateByIdRAndIdM)
router.delete("/round/:idR/member/:idM", verifyAdmin, deleteByIdRAndIdM);

export default router;
