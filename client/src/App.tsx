import "./App.css";
import { Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
function App() {
  const userLoggedInState = useContext(UserContext);
  return (
    <div>
      <Tabs defaultValue="account">
        <div className="flex flex-col">
          {userLoggedInState?.isLoggedIn === true ? (
            <TabsList>
              <TabsTrigger value="posts">
                <Link to="/">Posts</Link>
              </TabsTrigger>
              <TabsTrigger value="logout">Logout</TabsTrigger>
            </TabsList>
          ) : (
            <TabsList>
              <TabsTrigger value="posts">
                <Link to="/">Posts</Link>
              </TabsTrigger>
              <TabsTrigger value="login">
                <Link to="/login">Login</Link>
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        <Outlet />
      </Tabs>
    </div>
  );
}

export default App;
