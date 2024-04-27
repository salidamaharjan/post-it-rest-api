import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Client } from "../models/index";
import { Request, Response } from "express";
import express from "express";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Client.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      res.status(200).json({ message: "User not found" });
      return;
    }

    const checkPasswordValid = await bcrypt.compare(password, user!.password);
    // console.log(passwordValid);
    if (!checkPasswordValid) {
      res
        .status(400)
        .json({ message: "Incorrect username and password combination" });
      return;
    }

    const token = jwt.sign({ id: user!.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    res.status(200).send({
      id: user!.id,
      username: user!.username,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default router;
