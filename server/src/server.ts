import express, { Request, Response } from "express";
import { sequelize } from "./connection";
import { postRoute, clientRoute, loginRoute } from "./api/index";
import { Post, Client } from "./models/index";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", postRoute, clientRoute, loginRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

(async () => {
  await sequelize.sync({ force: true });
  console.log("Model synchronized successfully");

  await Client.create({
    username: "user1",
    password: await bcrypt.hash("password", 15)
  });
  await Client.create({
    username: "user2",
    password: await bcrypt.hash("password", 15)
  });
  await Post.create({
    title: "Hello all from user 1",
    content: "",
    clientId: 1,
  });
  await Post.create({
    title: "Hello2 from user 1",
    content: "",
    clientId: 1,
  });
  await Post.create({
    title: "Hello from user 2",
    content: "",
    clientId: 2,
  });
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
})();
