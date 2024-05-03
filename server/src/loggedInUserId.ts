import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const loggedInUserIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return next();
  }
  const token = authorizationHeader.replace("Bearer ", "");
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return next();
  }
};
export default loggedInUserIdMiddleware;
