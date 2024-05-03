import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { post } from "../../lib/http";
import { useToast } from "@/components/ui/use-toast";

type AddPostCardProps = {
  onAdd: () => void;
};

export function AddPostCard({ onAdd }: AddPostCardProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  async function addPost() {
    try {
      const result = await post("http://localhost:3000/api/posts", {
        title,
        content,
      });
      console.log("result", result);
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
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card className="flex flex-col p-4 gap-2">
      <CardTitle>Add a Post</CardTitle>
      <Label htmlFor="title" className="text-green-700 text-lg font-bold">
        Title
      </Label>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></Input>
      <Label htmlFor="content" className="text-green-700 text-lg font-bold">
        Content
      </Label>
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></Textarea>

      <Button className="bg-green-600 w-[100px]" onClick={handleAddOnclick}>
        Add
      </Button>
    </Card>
  );
}
