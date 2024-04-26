import express, { Request, Response } from "express";
import { sequelize } from "./connection";
import router from "./api/post_api";
import Post from "./models/Post";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", router);
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
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
})();
