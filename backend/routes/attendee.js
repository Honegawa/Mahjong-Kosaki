import express from "express";
import {
  getAll,
  getByIdB,
  getByIdBAndIdP,
  create,
  deleteByIdBAndIdP,
} from "../controllers/attendee.controller.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/booking/:idB", getByIdB);
router.get("/booking/:idB/person/:idP", getByIdBAndIdP);
router.post("/", create);
router.delete("/booking/:idB/person/:idP", verifyAdmin, deleteByIdBAndIdP);

export default router;
