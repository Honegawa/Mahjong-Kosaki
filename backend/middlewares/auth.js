import jwt from "jsonwebtoken";
import { env } from "../configs/config.js";
import { createError } from "../error.js";
import { Person } from "../models/index.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Acces Denied"));
  }

  jwt.verify(token, env.TOKEN, (err, user) => {
    if (err) {
      return next(createError(403, { message: "Token not valid", error: err }));
    }
    req.user = user;

    next();
  });
};

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Acces Denied"));
  }

  jwt.verify(token, env.TOKEN, (err, user) => {
    if (err) {
      return next(createError(403, { message: "Token not valid", error: err }));
    }
    req.user = user;
  });

  try {
    const admin = await Person.findByPk(req.user.id);

    if (admin.role !== "admin") {
      return next(
        createError(403, { message: "User doesn't have enough privilege" })
      );
    }

    next();
  } catch (error) {
    return next(
      createError(500, { message: "Can't retrieve user", error: error })
    );
  }
};

export const optionalVerify = async (req, res, next) => {
  const token = req.cookies.access_token;

  jwt.verify(token, env.TOKEN, (err, user) => {
    if (err) {
      return next(createError(403, { message: "Token not valid", error: err }));
    }
    req.user = user;

  });
  next()
};