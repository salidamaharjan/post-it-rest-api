import express, { Request, Response } from "express";
import { sequelize } from "./connection";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

(async () => {
  await sequelize.sync({ force: true });
  console.log("Model synchronized successfully");
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
})();

//post id content title