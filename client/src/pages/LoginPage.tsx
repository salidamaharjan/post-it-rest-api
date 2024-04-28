import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleOnClick() {
    // alert(`username: ${username} password: ${password}`);
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    console.log("data", data);
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
      </Card>
    </div>
  );
}
export default LoginPage;
