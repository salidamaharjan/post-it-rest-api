import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Client } from "../models/index";
import { Request, Response } from "express";
import express from "express";
const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Client.findOne({
      where: {
        username,
      },
    });
    if (user) {
      res.status(200).json({ message: "User already exists" });
      return;
    } else {
      const newUser = await Client.create({
        username,
        password: await bcrypt.hash(password, 15),
      });
      console.log("newUser", newUser);
      const token = jwt.sign({ id: newUser!.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      });

      res.status(200).send({
        id: newUser!.id,
        username: user!.username,
        accessToken: token,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default router;
