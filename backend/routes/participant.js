import express from "express";
import {
  getAll,
  getByIdTAndIdM,
  getByTournamentId,
  create,
  deleteByIdTAndIdM,
} from "../controllers/participant.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/tournament/:idT/member/:idM", getByIdTAndIdM);
router.get("/tournament/:idT", getByTournamentId);
router.post("/", verifyToken, create);
router.delete("/tournament/:idT/member/:idM", verifyToken, deleteByIdTAndIdM);

export default router;
