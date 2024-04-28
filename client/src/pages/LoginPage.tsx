import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function LoginPage() {
  return (
    <div>
      <Card className="m-4 rounded-md">
        <CardContent>
          <div>Login</div>
          <Label htmlFor="username">Username</Label>
          <Input placeholder="Username" />
          <Label htmlFor="password">Password</Label>
          <Input placeholder="Password" />
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginPage;
