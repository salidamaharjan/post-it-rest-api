import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { SignedIn } from "./components/reactComponent/SignedIn";
import { SignedOut } from "./components/reactComponent/SignedOut";
import { Toaster } from "./components/ui/toaster";

function App() {
  const navigate = useNavigate();
  const userLoggedInState = useContext(UserContext);
  function handleLogout() {
    userLoggedInState?.setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }
  return (
    <div>
      <Tabs defaultValue="account">
        <div className="flex flex-col">
          <TabsList>
            <TabsTrigger value="posts">
              <Link to="/">Posts</Link>
            </TabsTrigger>
            <SignedIn>
              <TabsTrigger value="logout" onClick={handleLogout}>
                Logout
              </TabsTrigger>
            </SignedIn>
            <SignedOut>
              <TabsTrigger value="login">
                <Link to="/login">Login</Link>
              </TabsTrigger>
            </SignedOut>
          </TabsList>
        </div>
        <Outlet />
        <Toaster />
      </Tabs>
    </div>
  );
}

export default App;
