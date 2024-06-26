import "./App.css";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { SignedIn } from "./components/reactComponent/SignedIn";
import { SignedOut } from "./components/reactComponent/SignedOut";
import { Toaster } from "./components/ui/toaster";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const userLoggedInState = useContext(UserContext);
  function handleLogout() {
    userLoggedInState?.setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }
  // console.log("location.pathname", location.pathname);
  return (
    <div>
      <Tabs defaultValue="/" value={location.pathname}>
        <div className="flex flex-col">
          <TabsList>
            <TabsTrigger value="/">
              <Link to="/">Posts</Link>
            </TabsTrigger>
            <SignedIn>
              <TabsTrigger value="/logout" onClick={handleLogout}>
                Logout
              </TabsTrigger>
            </SignedIn>
            <SignedOut>
              {location.pathname === "/login" || location.pathname === "/" ? (
                <TabsTrigger value="/login">
                  <Link to="/login">Login</Link>
                </TabsTrigger>
              ) : (
                <TabsTrigger value="/signup">
                  <Link to="/signup">Signup</Link>
                </TabsTrigger>
              )}
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
