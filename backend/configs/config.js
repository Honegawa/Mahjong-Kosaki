import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  TOKEN: process.env.TOKEN,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_TYPE: process.env.DB_TYPE,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_FROM: process.env.MAIL_FROM,
  DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD,
};
