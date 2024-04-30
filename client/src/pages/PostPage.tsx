import { useEffect, useState } from "react";
import { get } from "../lib/http";
import { post } from "../lib/http";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SignedIn } from "@/components/reactComponent/SignedIn";
import { AddPostCard } from "@/components/reactComponent/AppPostCard";

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

  const { toast } = useToast();

  async function fetchData() {
    try {
      const result = await get("http://localhost:3000/api/posts");
      setAllPosts(result);
    } catch (err) {
      console.log(err);
    }
  }
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
    await addPost();
    await fetchData();
    toast({
      variant: "success",
      description: "Your Post Added!",
    });
    setContent("");
    setTitle("");
  }

  return (
    <div className="flex flex-col p-4 gap-2">
      <SignedIn>
        {" "}
        <AddPostCard title={title} content={content} setContent={setContent} setTitle={setTitle} onClick={handleAddOnclick}/>
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
