import { Post, Client, Like } from "./models/index";
import bcrypt from "bcrypt";
import { sequelize } from "./connection";

async function seed() {
  await sequelize.sync({ force: true });
  console.log("Model synchronized successfully");

  await Client.create({
    username: "user1",
    password: await bcrypt.hash("password", 15),
  });
  await Client.create({
    username: "user2",
    password: await bcrypt.hash("password", 15),
  });
  await Post.create({
    title: "Hello all from user 1",
    content: "fkakgkajgkjakgjakeg",
    clientId: 1,
  });
  await Post.create({
    title: "Hello2 from user 1",
    content: "dfjgajgjakgkjahgkjaegkeebnjkfdn",
    clientId: 1,
  });
  await Post.create({
    title: "Hello from user 2",
    content: "fgjoagkldfgl;kadfgdogadogjaogjegjveijv;vj",
    clientId: 2,
  });
  await Like.create({
    clientId: 1,
    postId: 2,
  });
  await Like.create({
    clientId: 2,
    postId: 1,
  });
  await Like.create({
    clientId: 1,
    postId: 1,
  });
  console.log("Data Seeded");
  await sequelize.close();
}

seed();
