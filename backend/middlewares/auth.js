import jwt from "jsonwebtoken";
import { env } from "../configs/config.js";
import { Person } from "../models/index.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(res.status(401).json({ error: "Acces Denied" }));
  }

  jwt.verify(token, env.TOKEN, (err, user) => {
    if (err) {
      return next(
        res.status(403).json({ error: "Token not valid", info: err })
      );
    }
    req.user = user;

    next();
  });
};

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(res.status(401).json({ error: "Acces Denied" }));
  }

  jwt.verify(token, env.TOKEN, (err, user) => {
    if (err) {
      return next(
        res.status(403).json({ error: "Token not valid", info: err })
      );
    }
    req.user = user;
  });

  try {
    const admin = await Person.findByPk(req.user.id);

    if (admin.role !== "admin") {
      return next(
        res.status(403).json({ error: "User doesn't have enough privilege" })
      );
    }

    next();
  } catch (error) {
    return next(
      res.status(500).json({ error: "Can't retrieve user", info: error })
    );
  }
};
