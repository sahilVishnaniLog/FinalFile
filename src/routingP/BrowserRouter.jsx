import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Board, Forms, List, Pages, Summary, Timeline } from "../pages/index";
import { Login, SignUp, AuthContext } from "../Auth/auth";
import WelcomePage from "../WelcomePage.jsx";
import App from "../App";
import { useState } from "react";

import { createContext, useContext } from "react";
const AuthContextHook = createContext();

export default function BrowserRouter() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const authLoader = async () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            return new Response(null, {
                status: 302,
                headers: { location: "/login" },
            });
        }
    };

    const router = createBrowserRouter([
        // browser context and it can also work as the wrapper for all the components thatnpm  will decide the routing of the application
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
                    loader: authLoader,
                    hydrateFallbackElement: <div> Loading... </div>,
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

    return (
        <AuthContextHook.Provider value={{ isLoggedIn, setLoggedIn, userInfo, setUserInfo }}>
            <RouterProvider router={router} />
        </AuthContextHook.Provider>
    );
}
export const useAuth = () => {
    const context = useContext(AuthContextHook);
    if (!context) throw new Error("useAuth must be used  within a AuthProvider");
    return context;
};
