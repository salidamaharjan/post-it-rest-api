import bcrypt from "bcrypt";
import express, { Response, Request } from "express";
import { Client } from "../models/index";

const router = express.Router();

router.get("/clients", async (req: Request, res: Response) => {
  try {
    const allUsers = await Client.findAll();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/clients/:id", async (req: Request, res: Response) => {
  try {
    const clientById = await Client.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(clientById);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/clients", async (req: Request, res: Response) => {
  try {
    const clientExist = await Client.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (clientExist) {
      res.status(400).send("Username Already Exists");
    }
    await Client.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 15),
    });
    res.status(200).send(`New User Created`);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/clients/:id", async (req: Request, res: Response) => {
  try {
    await Client.update(
      {
        username: req.body.username,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "User Updated" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/clients/:id", async (req: Request, res: Response) => {
  try {
    await Client.destroy({ where: { id: req.params.id } });
    res.status(200).json("User Deleted");
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default router;
