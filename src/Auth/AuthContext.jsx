import { Outlet, useLocation } from "react-router"; // Added a a holder to for nested pages

export default function AuthContext() {
  const location = useLocation(); // location is an object  that contains infomation about the present location or the parent component is being rendered at
  console.log(location);
  return (
    <>
      {location.pathname === "/Auth" && <h1> AuthContext is Mounted </h1>}
      <Outlet />{" "}
    </>
  );
}
