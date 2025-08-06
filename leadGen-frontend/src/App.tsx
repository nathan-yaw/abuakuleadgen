import { Outlet } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
/**
 * This will control the navbar/global elements
 *
 */
function App() {
  const { user } = useAuth();

  useEffect(() => {
    // Check if auth state is out of sync with localStorage
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      // This handles cases where React state resets but localStorage persists
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }, [user]);

  return (
    <div className="m-10">
      {" "}
      {/* Added a light gray background */}
      <Card>
        <CardHeader>
          <span className="flex flex-row gap-4"></span>
          <br></br>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
