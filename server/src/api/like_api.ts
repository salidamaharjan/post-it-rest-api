import express, { Response, Request } from "express";
const router = express.Router();
import authMiddleware from "../auth";
import Like from "../models/Like";

router.post("/likes", authMiddleware, async (req: Request, res: Response) => {
  try {
    const loggedInUser = (req as any).user;
    const authorizedId = loggedInUser.id;

    await Like.create({
      clientId: authorizedId,
      postId: req.body.postId,
    });
    res.status(200).json({ message: "Liked the post!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
router.delete("/likes/:postId", authMiddleware, async (req: Request, res: Response) => {
  try {
    const loggedInUser = (req as any).user;
    const authorizedId = loggedInUser.id;
    await Like.destroy({
      where: {
        clientId: authorizedId,
        postId: req.params.postId,
      },
    });
    res.status(200).json({ message: "Liked Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

export default router;
