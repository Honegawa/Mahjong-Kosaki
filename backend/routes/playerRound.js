import express from "express";
import {
  getAll,
  getByIdR,
  getByIdRAndIdP,
  create,
  updateByIdRAndIdP,
  deleteByIdRAndIdP,
} from "../controllers/playerRound.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/round/:idR", getByIdR);
router.get("/round/:idR/person/:idP", getByIdRAndIdP);
router.post("/", verifyAdmin, create);
router.put("/round/:idR/person/:idP", verifyAdmin, updateByIdRAndIdP)
router.delete("/round/:idR/person/:idP", verifyAdmin, deleteByIdRAndIdP);

export default router;
