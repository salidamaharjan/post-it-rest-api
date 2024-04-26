import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Client } from "./models/index";
import { Request, Response } from "express";

export const authorizedUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Client.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      res.status(200).json({ message: "User not found" });
    }
    const passwordValid = await bcrypt.compare(password, user!.password);
    if (!passwordValid) {
      return res
        .status(404)
        .json("Incorrect username and password combination");
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
};
