import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Board, Forms, List, Pages, Summary, Timeline } from "../pages/index";
import { Login, SignUp, AuthContext } from "../Auth/auth";
import WelcomePage from "../WelcomePage.jsx";
import App from "../App";
import { userCredential } from "../Auth/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth",
        element: <AuthContext />,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
      {
        path: ":userName",
        element: <WelcomePage />,

        children: [
          { index: true, element: <Navigate to="board" replace /> },
          { path: "board", element: <Board /> },
          { path: "forms", element: <Forms /> },
          { path: "List", element: <List /> },
          { path: "pages", element: <Pages /> },
          { path: "summary", element: <Summary /> },
          { path: "timeline", element: <Timeline /> },
        ],
      },
    ],
  },
]);

export default function BrowserRouter() {
  return <RouterProvider router={router} />;
}
