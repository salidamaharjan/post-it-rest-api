import express, { Response, Request } from "express";
const router = express.Router();
import Like from "../models/Like";

router.post("/likes", async (req: Request, res: Response) => {
  try {
    await Like.create({
      clientId: req.body.clientId,
      postId: req.body.postId,
    });
    res.status(200).json({ message: "Liked the post!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default router;
