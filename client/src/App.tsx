import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <div>Posts</div>
        <div>Login</div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
