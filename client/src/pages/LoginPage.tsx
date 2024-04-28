import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginPage;
