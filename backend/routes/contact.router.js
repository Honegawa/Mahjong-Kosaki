import express from "express";
import {
  create,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", create);

export default router;
