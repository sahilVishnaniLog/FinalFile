import { useNavigate, Outlet, useLocation } from "react-router";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleSignIn() {
    navigate("Auth/login");
  }
  function handleSignup() {
    navigate("Auth/signup");
  }
  return (
    <>
      <Outlet />
      {location.pathname === "/" && (
        <div>
          <div> this is the welcome page to the site </div>{" "}
          <button onClick={handleSignIn}> SignIn </button>
          <button onClick={handleSignup}> signUp </button>
        </div>
      )}
    </>
  );
}
