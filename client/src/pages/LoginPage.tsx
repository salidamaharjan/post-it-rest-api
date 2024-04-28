import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginPage() {
  return (
    <div className="flex justify-center mt-6">
      <Card className="m-6 rounded-md p-4 w-[500px]">
        <CardContent className="flex flex-col gap-6">
          <div className="font-bold text-lg text-green-600">Login</div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input placeholder="Username" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input placeholder="Password" />
          </div>
          <Button className="bg-green-500 text-lg font-bold">Login</Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginPage;
