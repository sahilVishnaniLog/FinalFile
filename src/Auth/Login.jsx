import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { auth, db, googleProvider } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getIdToken,
  signInWithRedirect,
  getRedirectResult,
  getAdditionalUserInfo,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../routingP/BrowserRouter"; // NOTE : we dont need this we are now handling all this using the token  and saving it to the loal storage and removing it on logout
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  Alert,
  Stack,
  Modal,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Phone as PhoneIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { DndContext } from "@dnd-kit/core";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "400px", md: "500px" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// testing Authorization
// const _dataSet = {
//     firstName: "dummyFirstName",
//     lastName: "dummyLastName",
//     email: "dummyEmail",
//     password: "dummyPassword",
//     phone: "dummyPhone",
//     phoneCode: "dummyPhoneCode",
//     username: "dummyUserName; ",

//     photoURL: "notAddedYet",
// };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(true);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  //  const { isLoggedIn, setLoggedIn, userInfo, setUserInfo } = useAuth();
  const Navigate = useNavigate();
  const timeoutRef = useRef(null);

  //methods for handlers
  const handleInvalidSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleGoogleLogin = async (e) => {
    // TODO : handleGoogleLogin

    console.log("google handler is working"); // button is listened to.

    setError("");
    setLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err); // error message from firebase auth
      setError(err.message);
      setLoading(false);
    }
  };

  const signInFirebase = async (dataObject, setError, setLoading) => {
    try {
      setError("");
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        dataObject.email,
        dataObject.password
      );
      const { user } = userCredentials;
      const authToken = await user.getIdToken(); // API_GET
      localStorage.setItem("auth-token", authToken); // logout will remove this token where else the loader function will check for this token
      return user.uid;
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("login works");
    const targetId = event.currentTarget.id || event.target.id;
    if (targetId === "googleLogin") {
      await handleGoogleLogin(event);
      return;
    } else if (targetId === "signIn-form") {
      if (!email || !password) {
        alert("Please fill in all the fields");
        setError("Please fill in all the fields");
        setLoading(false);
        return;
      }
      let formElement = document.getElementById("signIn-form");
      let formData = new FormData(formElement);
      let dataObject = Object.fromEntries(formData); // DATABASE

      console.log(dataObject); // LOG ;

      documentId = await signInFirebase(dataObject, setError, setLoading);
    }
    if (!documentId) return;
    let docRef = doc(db, "users", documentId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { firstName, lastName, email, username } = docSnap.data();
      localStorage.setItem(
        "user-info",
        JSON.stringify({ firstName, lastName, email, username })
      );
    }

    if (localStorage.getItem("auth-token")) {
      try {
        const userInfoString = localStorage.getItem("user-info");
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          Navigate(`/${userInfo.userName}`, { replace: true });
        } else {
          console.warn("user aunterhitate ,but local proife info is missing. ");
          Navigate("/", { replace: true });
        }
      } catch (error) {
        console.errror("navigation error", error);
        setError("Login successful , but navigation failed ");
      }
    } else {
      Navigate("../login", { replace: true });
    }
  };
  const handleRoutingToSignUp = (event) => {
    // CLEANED
    event.preventDefault();

    Navigate("../signup", { replace: true });
    // Navigate("signup", { replace: true });
  };
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setHiddenPassword(true);
    }, 7000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hiddenPassword]);
  useEffect(() => {
    const checkredirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("google successfully retrieved the user", result.user);
          const authToken = result.user.accessToken;
          localStorage.setItem("auth-token", authToken);
          const { isNewUser } = getAdditionalUserInfo(result);
          let { uid, displayName, email, photoURL } = result.user;
          let docRef = doc(db, "users", uid);

          if (isNewUser) {
            await setDoc(docRef, {
              firstName: displayName.split(" ")[0],
              lastName: displayName.split(" ")[1],
              email: email,
              photoURL: photoURL,
              uid: uid,
              phone: null,
              username: email.split("@")[0],
              country: null,
              phoneCode: null,
              emailUpdates: "off",
            });
            localStorage.setItem(
              "user-info",
              JSON.stringify({
                firstName: displayName.split(" ")[0],
                lastName: displayName.split(" ")[1],
                email: email,
                username: email.split("@")[0],
              })
            );
          } else {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const { firstName, lastName, email, username } = docSnap.data();
              localStorage.setItem(
                "user-info",
                JSON.stringify({ firstName, lastName, email, username })
              );
            }
          }

          const userName = JSON.parse(
            localStorage.getItem("user-info")
          ).username;
          Navigate(`/${userName}`, { replace: true });
        }
      } catch (error) {
        console.error("Redirect check error:", error);
      }
    };
    checkredirect();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={2}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
          width: { md: 400, sx: "100%" },
          height: { md: 580, sx: "auto" },
          overflow: "auto",
          gap: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          {" "}
          Log In
        </Typography>
        {error === "Login failed" && <Alert severity="error">{error}</Alert>}
        <Box
          gap={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 1,
            width: "80%",
          }}
        >
          <form id="signIn-form" onSubmit={handleLogin}>
            <Stack direction="column" gap={2}>
              <TextField
                label="Email"
                type="text"
                placeholder="sahilvishnani25@gmail.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleInvalidSubmit}
              />

              <TextField
                label="Password"
                type={hiddenPassword ? "password" : "text"}
                placeholder="***********"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleInvalidSubmit}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" cursor="pointer">
                        <IconButton
                          edge="end"
                          tabIndex={0}
                          onClick={() => setHiddenPassword(!hiddenPassword)}
                        >
                          {hiddenPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button variant="contained" type="submit" color="success">
                {" "}
                Sign In
              </Button>
            </Stack>
          </form>

          <Divider>or</Divider>

          <Button
            variant="contained"
            startIcon={<FcGoogle />}
            color="success"
            onClick={handleLogin}
            id="googleLogin"
          >
            Sign in with Google
          </Button>
          <Button variant="outlined" startIcon={<PhoneIcon />}>
            {" "}
            Sign in with Phone No.{" "}
          </Button>

          <Typography>
            New User ?{" "}
            <Button variant="text" onClick={handleRoutingToSignUp}>
              {" "}
              Create an Account
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
