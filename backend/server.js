import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./configs/config.js";
import ContactRouter from "./routes/contact.js";
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
