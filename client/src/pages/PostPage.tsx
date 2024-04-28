import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Post = {
  id: number;
  title: string;
  content: string;
  clientId: number;
  createdAt: string;
  updatedAt: string;
};
function PostPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      const result = await response.json();
      setAllPosts(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col p-4 gap-2">
     
      <div className="text-green-600 text-2xl text-center font-bold">Posts</div>
      <div className="flex flex-col gap-4">
        {allPosts.map((post) => {
          return (
            <Card>
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
