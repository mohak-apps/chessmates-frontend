import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Landing from "./screens/Landing";
import Game from "./screens/Game";
import ErrorPage from "./screens/ErrorPage";
import RootPage from "./screens/RootPage";
import ProtectedRoutes from "./utils/protectedRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import Register from "./screens/Register";

const router = createBrowserRouter([
  {
    element: <RootPage />,
    children: [
      {
        path: "login",
        element: (
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}
          >
            <Login />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      { 
        element: <ProtectedRoutes />,
        children: [
          {
            path: "landing",
            element: <Landing />,
          },
          {
            path: "game",
            element: <Game />,
          },
          {
            path: "logout",
          },
        ],
      },

      // Catch-all route
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
