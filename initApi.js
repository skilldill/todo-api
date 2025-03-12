import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v4 as uuid } from "uuid";


export function initApi() {
  dotenv.config();
  const port = process.env.PORT || 4000;

  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("DB connected"))
    .catch(err => console.error("connection error to DB:", err));

  const api = express();

  api.use(cors());
  api.use(express.json());
  api.use(cookieParser());

  // Задаем уникальный userKey для каждого уникального пользователя
  api.use((req, res, next) => {
    if (!req.cookies.userKey) {
      const userKeyId = uuid();
      res.cookie("userKey", userKeyId, { httpOnly: true, sameSite: "Strict" });
      req.userKey = userKeyId;
    } else {
      req.userKey = req.cookies.userKey;
    }
    next();
  });

  api.listen(port, () => {
    console.log(`API STARTED ON ${port} PORT`);
  });

  return api;
}
