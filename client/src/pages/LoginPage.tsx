import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { post } from "../lib/http";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userLoggedInState = useContext(UserContext);
  const navigate = useNavigate();
  async function handleOnClick() {
    // alert(`username: ${username} password: ${password}`);
    const data = await post("http://localhost:3000/api/login", {
      username,
      password,
    });
    const token = data.accessToken;
    if (token) {
      userLoggedInState?.setIsLoggedIn(true);
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    }
    setUsername("");
    setPassword("");
  }
  return (
    <div className="flex justify-center mt-6">
      <Card className="m-6 rounded-md p-4 w-[500px]">
        <CardContent className="flex flex-col gap-6">
          <div className="font-bold text-lg text-green-600">Login</div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button
            className="bg-green-500 text-lg font-bold"
            onClick={handleOnClick}
          >
            Login
          </Button>
        </CardContent>
        <div className="text-center">
          Don't have an account,{" "}
          <Link
            to={"/signup"}
            className="underline-offset-2 underline text-blue-400"
          >
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
}
export default LoginPage;
