import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; // Make sure you have this context

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from your auth context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verify response structure matches what you expect
      if (response.data && response.data.tokens && response.data.email) {
        // Call your auth context's login function
        login({
          tokens: response.data.tokens,
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          business_name: response.data.business_name,
        });

        // Redirect to dashboard
        navigate("/app/dashboard");
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  id="email"
                  placeholder="Email address"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  id="password"
                  placeholder="Password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button
                  style={{ cursor: "pointer" }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm mt-2">
                  <a href="#" className="text-muted-foreground hover:underline">
                    Forgot password?
                  </a>
                  <span className="mx-2">•</span>
                  <a
                    href="/register"
                    className="text-muted-foreground hover:underline"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
