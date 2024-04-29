import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import App from "./App";
import PostPage from "./pages/PostPage";
import { UserContextProvider } from "./context/UserContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <App />
      </UserContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <PostPage />,
        index: true,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
