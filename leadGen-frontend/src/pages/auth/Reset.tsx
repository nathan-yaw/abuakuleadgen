import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Reset() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Email address" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password..."
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button>Login</Button>
                  <br></br>
                  <small>
                    <a href="#">Forgotten password?</a>
                  </small>

                  <small>
                    <a href="#">Don't have an account? Create one.</a>
                  </small>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Reset;
