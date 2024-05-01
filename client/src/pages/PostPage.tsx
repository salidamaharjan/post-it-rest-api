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
import { Button } from "@/components/ui/button";

type Post = {
  id: number;
  title: string;
  content: string;
  clientId: number;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
};

function PostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [likeCount, setLikeCount] = useState(1);

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

  async function addLike(id: number) {
    try {
      const result = await post("http://localhost:3000/api/likes", {
        postId: id,
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

  async function handleDeleteOnclick() {
    alert("clicked");
  }

  return (
    <div className="flex flex-col p-6 gap-2">
      <SignedIn>
        <AddPostCard
          title={title}
          content={content}
          setContent={setContent}
          setTitle={setTitle}
          onClick={handleAddOnclick}
        />
      </SignedIn>

      <div className="text-green-600 text-2xl text-center font-bold">Posts</div>
      <div className="flex flex-col gap-4">
        {allPosts.map((post) => {
          return (
            <Card key={post.id} className="pb-4">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>By id {post.clientId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-green-700 text-lg font-bold">Content</div>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between text-center">
                <p>Created at {post.createdAt}</p>
                <p>Updated at {post.updatedAt}</p>
              </CardFooter>
              <div className="flex justify-between pl-2 pr-4">
                <div className="flex items-center">
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      addLike(post.id);
                      setLikeCount(post.likeCount++);
                      // console.log(
                      //   "post.id=> ",
                      //   post.id,
                      //   "likeCount=> ",
                      //   likeCount
                      // );
                    }}
                  >
                    👍
                  </Button>
                  <div>{post.likeCount}</div>
                </div>
                <Button
                  variant={"destructive"}
                  className="w-[100px]"
                  onClick={handleDeleteOnclick}
                >
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default PostPage;
