import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import App from "./App";
import PostPage from "./pages/PostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
