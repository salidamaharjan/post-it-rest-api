import express, { Response, Request } from "express";
const router = express.Router();
import Post from "../models/Post";
import authMiddleware from "../auth";
import { Like, Client } from "../models";

router.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Like }, { model: Client }],
    });

    const refinedPost = posts.map((post: any) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        clientId: post.clientId,
        username: post.client.username,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likeCount: post.likes.length,
        hasCurrentUserLiked: (req as any).user?.id
          ? post.likes.some((like: any) => {
              return like.clientId === (req as any).user.id;
            })
          : false,
      };
    });
    res.status(200).json(refinedPost);
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

router.post("/posts", authMiddleware, async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const authorizedId = loggedInUser.id;
  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      clientId: authorizedId,
    });
    res.status(200).json({ message: "New post added!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put(
  "/posts/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const loggedInUser = (req as any).user;
      const authorizedId = loggedInUser.id;
      const clientPost = await Post.findOne({ where: { id: req.params.id } });
      const idOfClientPost = clientPost?.clientId;
      // console.log("clientPost", clientPost);
      // console.log("idOfClientPost", idOfClientPost);
      if (authorizedId !== idOfClientPost) {
        console.log("inside if", authorizedId, idOfClientPost);
        res.status(400).json({ message: "User not authorized" });
        return;
      }
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
      res.status(400).json({ message: "User not authorized" });
    }
  }
);

router.delete(
  "/posts/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const loggedInUser = (req as any).user;
      const authorizedId = loggedInUser.id;
      const clientPost = await Post.findOne({ where: { id: req.params.id } });
      const idOfClientPost = clientPost?.clientId;
      // console.log("clientPost", clientPost);
      // console.log("idOfClientPost", idOfClientPost);
      if (authorizedId !== idOfClientPost) {
        // console.log("inside if", authorizedId, idOfClientPost);
        res.status(400).json({ message: "User not authorized" });
        return;
      }
      Post.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Post Deleted" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);
export default router;
