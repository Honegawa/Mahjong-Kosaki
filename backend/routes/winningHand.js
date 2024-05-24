import express from "express";
import {
  getAll,
  getByIdRAndIdM,
  getByIdG,
  getByIdGAndIdR,
  getByIdM,
  create,
  updateByIdRAndIdM,
  deleteByIdRAndIdM,
} from "../controllers/winningHand.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/round/:idR/member/:idM", getByIdRAndIdM);
router.get("/game/:idG", getByIdG);
router.get("/game/:idG/round/:idR", getByIdGAndIdR);
router.get("/member/:idM", getByIdM);
router.post("/", verifyAdmin, create);
router.put("/round/:idR/member/:idM", verifyAdmin, updateByIdRAndIdM);
router.delete("/round/:idR/member/:idM", verifyAdmin, deleteByIdRAndIdM);

export default router;
