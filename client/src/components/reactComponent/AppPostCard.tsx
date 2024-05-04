import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { post } from "../../lib/http";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type AddPostCardProps = {
  onAdd: () => void;
};

export function AddPostCard({ onAdd }: AddPostCardProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dialogOpenOrClose, setDialogOpenOrClose] = useState(false);
  const { toast } = useToast();

  async function addPost() {
    try {
      await post("http://localhost:3000/api/posts", {
        title,
        content,
      });
      // console.log("result", result);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleAddOnclick() {
    try {
      await addPost();
      onAdd();
      toast({
        variant: "success",
        description: "Your Post Added!",
      });
      setContent("");
      setTitle("");
      setDialogOpenOrClose(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Dialog open={dialogOpenOrClose}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setDialogOpenOrClose(true)}
          className="bg-green-600 text-white font-bold"
        >
          Add New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              placeholder="Give a Title"
              className="col-span-3"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Content
            </Label>
            <Textarea
              id="username"
              placeholder="Your content"
              className="col-span-3 "
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddOnclick}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
