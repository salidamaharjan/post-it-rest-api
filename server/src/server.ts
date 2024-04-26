import express, { Request, Response } from "express";
import { sequelize } from "./connection";
import {postRoute, clientRoute} from "./api/index";
import { Post, Client } from "./models/index";
import { authorizedUser } from "./auth";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", postRoute, clientRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

(async () => {
  await sequelize.sync({ force: true });
  console.log("Model synchronized successfully");
  await Post.create({
    title: "Hello all",
    content: "",
  });
  await Client.create({
    username: "user1",
    password: "password",
  });
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
})();
