import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
function LoginPage() {
  return (
    <div>
      <Card className="m-4 rounded-md">
        <CardContent >
          <div>Login</div>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginPage;
