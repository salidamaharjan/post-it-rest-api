import { useEffect, useState } from "react";
import { get } from "../lib/http";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { SignedIn } from "@/components/ui/SignedIn";

type Post = {
  id: number;
  title: string;
  content: string;
  clientId: number;
  createdAt: string;
  updatedAt: string;
};
function PostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const result = await get("http://localhost:3000/api/posts");
      setAllPosts(result);
    } catch (err) {
      console.log(err);
    }
  }
  function handleAddOnclick() {
    alert(`tile: ${title} content: ${content}`);
  }
  return (
    <div className="flex flex-col p-4 gap-2">
      <SignedIn>
        {" "}
        <Card className="flex flex-col p-4 gap-2">
          <CardTitle>Add a Post</CardTitle>
          <Label htmlFor="title" className="text-green-700 text-lg font-bold">
            Title
          </Label>
          <Input
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></Input>
          <Label htmlFor="content" className="text-green-700 text-lg font-bold">
            Content
          </Label>
          <Textarea
            placeholder="Content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></Textarea>
          <Button className="bg-green-600 w-[100px]" onClick={handleAddOnclick}>
            Add
          </Button>
        </Card>
      </SignedIn>
      <div className="text-green-600 text-2xl text-center font-bold">Posts</div>
      <div className="flex flex-col gap-4">
        {allPosts.map((post) => {
          return (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>By id {post.clientId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-green-700 text-lg font-bold">Content</div>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p>Created at {post.createdAt}</p>
                <p>Updated at {post.updatedAt}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default PostPage;
