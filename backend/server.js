import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./configs/config.js";
import ContactRouter from "./routes/contact.js";
import BookingRouter from "./routes/booking.js";
import MemberRouter from "./routes/member.js";
import PersonRouter from "./routes/person.js";
import ArticleRouter from "./routes/article.js";
import ArticlePictureRouter from "./routes/articlePicture.js";
import TournamentRouter from "./routes/tournament.js";
import ParticipantRouter from "./routes/participant.js";
import GameRouter from "./routes/game.js";
import RoundRouter from "./routes/round.js";
import PlayerRouter from "./routes/player.js";
import PlayerRoundRouter from "./routes/playerRound.js";
import "./models/index.js";

const app = express();

const corsOptions = {
  origin: env.CLIENT_ORIGIN || "http://localhost:8081",
};

const PORT = env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Route Middleware
app.use("/api/contact", ContactRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/member", MemberRouter);
app.use("/api/person", PersonRouter);
app.use("/api/article", ArticleRouter);
app.use("/api/articlePicture", ArticlePictureRouter);
app.use("/api/tournament", TournamentRouter);
app.use("/api/participant", ParticipantRouter);
app.use("/api/game", GameRouter);
app.use("/api/round", RoundRouter);
app.use("/api/player", PlayerRouter);
app.use("/api/playerRound", PlayerRoundRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
