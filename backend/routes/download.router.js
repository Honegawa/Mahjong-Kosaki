import express from "express";
import { downloadForm } from "../controllers/download.controller.js";

const router = express.Router();

router.get("/form", downloadForm);

export default router;
