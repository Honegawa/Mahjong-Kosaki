import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { env } from "./configs/config.js";
import ContactRouter from "./routes/contact.router.js";
import BookingRouter from "./routes/booking.router.js";
import PersonRouter from "./routes/person.router.js";
import ArticleRouter from "./routes/article.router.js";
import ArticlePictureRouter from "./routes/articlePicture.router.js";
import TournamentRouter from "./routes/tournament.router.js";
import ParticipantRouter from "./routes/participant.router.js";
import GameRouter from "./routes/game.router.js";
import RoundRouter from "./routes/round.router.js";
import PlayerRoundRouter from "./routes/playerRound.router.js";
import DownloadRouter from "./routes/download.router.js";
import "./models/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: env.CLIENT_ORIGIN || "http://localhost:8081",
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Route Middleware
app.use("/api/contact", ContactRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/person", PersonRouter);
app.use("/api/article", ArticleRouter);
app.use("/api/articlePicture", ArticlePictureRouter);
app.use("/api/tournament", TournamentRouter);
app.use("/api/participant", ParticipantRouter);
app.use("/api/game", GameRouter);
app.use("/api/round", RoundRouter);
app.use("/api/playerRound", PlayerRoundRouter);
app.use("/api/download", DownloadRouter);
app.use("/images", express.static(path.join(__dirname, "images")));
export default app;
