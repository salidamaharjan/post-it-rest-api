import { useEffect, useState } from "react";
import { get, doDelete, post } from "../lib/http";
import { LoggedInUser } from "@/components/reactComponent/LoggedInUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignedIn } from "@/components/reactComponent/SignedIn";
import { AddPostCard } from "@/components/reactComponent/AppPostCard";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

type Post = {
  id: number;
  title: string;
  content: string;
  clientId: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  hasCurrentUserLiked: boolean;
};

function PostPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [likeCount, setLikeCount] = useState(1);

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

  async function addLike(id: number) {
    try {
      await post("http://localhost:3000/api/likes", {
        postId: id,
      });
      console.log("id", id);
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteLike(id: number) {
    try {
      await doDelete(`http://localhost:3000/api/likes/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteAPost(id: number) {
    try {
      await doDelete(`http://localhost:3000/api/posts/${id}`);
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col m-auto p-6 gap-2 max-w-[1200px]">
      <SignedIn>
        <AddPostCard onAdd={fetchData} />
      </SignedIn>

      <div className="text-green-600 text-2xl text-center font-bold">Posts</div>
      <div className="flex flex-col gap-4">
        {allPosts.map((post) => {
          return (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>By id {post.username}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-green-700 text-lg font-bold">Content</div>
                <p className="whitespace-pre-wrap">{post.content}</p>
              </CardContent>
              <CardFooter className="flex flex-col justify-start gap-2 items-stretch">
                <div className="flex justify-between">
                  <span>
                    <span className="text-blue-400 font-bold">Posted at: </span>
                    {dayjs(post.createdAt).format("MM/DD/YYYY HH:mm A")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="flex gap-2 items-center">
                      {post.hasCurrentUserLiked === true ? (
                        <Button
                          variant={"ghost"}
                          className="bg-green-500"
                          onClick={async () => {
                            if (post.hasCurrentUserLiked === true) {
                              await deleteLike(post.id);
                              setLikeCount(post.likeCount--);
                              await fetchData();
                            } else {
                              await addLike(post.id);
                              setLikeCount(post.likeCount++);
                              await fetchData();
                            }
                            post.hasCurrentUserLiked = false;
                          }}
                        >
                          👍
                        </Button>
                      ) : (
                        <Button
                          variant={"ghost"}
                          onClick={async () => {
                            if (post.hasCurrentUserLiked === true) {
                              await deleteLike(post.id);
                              setLikeCount(post.likeCount--);
                              await fetchData();
                            } else {
                              await addLike(post.id);
                              setLikeCount(post.likeCount++);
                              await fetchData();
                            }
                            post.hasCurrentUserLiked = false;
                          }}
                        >
                          👍
                        </Button>
                      )}
                      <div>{post.likeCount}</div>
                    </div>
                  </div>
                  <LoggedInUser clientId={post.clientId}>
                    <div className="flex gap-2">
                      <Button
                        variant={"destructive"}
                        className="w-[100px]"
                        onClick={() => {
                          deleteAPost(post.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </LoggedInUser>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default PostPage;
