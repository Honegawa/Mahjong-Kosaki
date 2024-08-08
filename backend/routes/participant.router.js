import express from "express";
import {
  getAll,
  getByIdTAndIdP,
  getByTournamentId,
  create,
  deleteByIdTAndIdP,
} from "../controllers/participant.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/tournament/:idT/person/:idP", getByIdTAndIdP);
router.get("/tournament/:idT", getByTournamentId);
router.post("/", verifyToken, create);
router.delete("/tournament/:idT/person/:idP", verifyToken, deleteByIdTAndIdP);

export default router;
