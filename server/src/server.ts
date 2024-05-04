import express, { Request, Response } from "express";
import { sequelize } from "./connection";
import {
  postRoute,
  clientRoute,
  loginRoute,
  likeRoute,
  signupRoute,
} from "./api/index";
import cors from "cors";
import loggedInUserIdMiddleware from "./loggedInUserId";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(loggedInUserIdMiddleware);
app.use("/api", postRoute, clientRoute, loginRoute, likeRoute, signupRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

(async () => {
  await sequelize.sync({ force: false });
  console.log("Model synchronized successfully");
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
})();
