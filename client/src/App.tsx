import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

type Post = {
  id: number;
  title: string;
  content: string;
  clientId: number;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  useEffect(() => {
    // fetchData();
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
  function handleOnClick() {
    fetchData();
  }
  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="text-green-600 text-lg font-bold">Posts</div>
      <Button className="w-[100px]" onClick={handleOnClick}>
        Get All Posts
      </Button>
      <div>
        {allPosts.map((post) => {
          return (
            <div key={post.id}>
              <div>{post.id}</div>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.createdAt}</div>
              <div>{post.updatedAt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
