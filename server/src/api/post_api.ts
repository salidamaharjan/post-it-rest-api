import express, { Response, Request } from "express";
const router = express.Router();
import Post from "../models/Post";

router.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.get("/posts/:id", async (req: Request, res: Response) => {
  try {
    const postById = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.post("/posts", async (req: Request, res: Response) => {
  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json({ message: "New post added!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/posts/:id", async (req: Request, res: Response) => {
  try {
    await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/posts/:id", async (req: Request, res: Response) => {
  try {
    Post.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Post Deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
export default router;
