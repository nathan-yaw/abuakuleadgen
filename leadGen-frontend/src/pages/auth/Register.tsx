import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    business_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8000/api/auth/register/", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.message);
          setSuccess(true);
        })
        .then(() => {
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        });
    } catch (error) {
      console.error(error);
      console.log(formData);
    }
  };
  return (
    <>
      {success ? (
        <div className="m-5">
          <Alert style={{ borderColor: "green", color: "green" }}>
            <AlertTitle>User successfully registered!</AlertTitle>
            <AlertDescription style={{ color: "green" }}>
              Thanks for choosing us! Redirecting you to the login page..
            </AlertDescription>
          </Alert>
        </div>
      ) : null}

      <div className="flex flex-col  m-10">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <span className="grid grid-cols-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="fName">First name:</Label>
                    <Input
                      value={formData.first_name}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;
                        setFormData((formData) => ({
                          ...formData,
                          first_name: value,
                        }));
                      }}
                      id="fName"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="lName">Last name:</Label>
                    <Input
                      value={formData.last_name}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;
                        setFormData((formData) => ({
                          ...formData,
                          last_name: value,
                        }));
                      }}
                      id="lName"
                      placeholder="Last Name"
                    />
                  </div>
                </span>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="business_name">Business name:</Label>
                  <Input
                    value={formData.business_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value;
                      setFormData((formData) => ({
                        ...formData,
                        business_name: value,
                      }));
                    }}
                    id="business-name"
                    placeholder="Business Name"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    value={formData.email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value;
                      setFormData((formData) => ({
                        ...formData,
                        email: value,
                      }));
                    }}
                    id="email"
                    placeholder="Email address"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password:</Label>
                  <Input
                    value={formData.password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value;
                      setFormData((formData) => ({
                        ...formData,
                        password: value,
                      }));
                    }}
                    id="password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm password:</Label>
                  <Input
                    value={formData.password2}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value;
                      setFormData((formData) => ({
                        ...formData,
                        password2: value,
                      }));
                    }}
                    id="password2"
                    placeholder="Confirm password"
                    type="password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button style={{ cursor: "pointer" }} type="submit">
                    Register
                  </Button>
                  <br></br>
                  <small style={{ textAlign: "center" }}>
                    <a href="/login">Have an account? Login.</a>
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

export default Register;
