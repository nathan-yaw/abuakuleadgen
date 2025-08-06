import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const LogoutButton = ({
  className,
  variant = "default",
}: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    try {
      await axios.post(
        "http://localhost:8000/api/auth/logout/",
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // Clear all auth-related storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Optional: show toast notification
    }
  };

  return (
    <Button
      style={{ cursor: "pointer" }}
      onClick={handleLogout}
      variant={variant}
      className={className}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
