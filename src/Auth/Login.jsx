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
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useAuth } from "../routingP/BrowserRouter"; // NOTE: Unused, removed
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

// Removed unused _dataSet comment

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Removed unused isTrue state
  const [hiddenPassword, setHiddenPassword] = useState(true);
  // Removed unused useAuth hook
  const navigate = useNavigate(); // Renamed for consistency (was Navigate)
  const timeoutRef = useRef(null);

  // Removed unused handleInvalidSubmit (can add back if needed for UX)

  const handleGoogleLogin = async (e) => {
    const provider = new GoogleAuthProvider();
    console.log("google handler is working");
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      localStorage.setItem("auth-token", token);
    } catch (err) {
      console.log(err);
      setError(`Error: ${err.message} - ${err.code}`);
      setLoading(false);
    }
    //here we will add the user to the firestore database
    const userUid = user.uid;
    const userDocRef = doc(db, "users", userUid);
    await setDoc(userDocRef, {
      uid: userUid,
      username: user.displayName,
      email: user.email,
      imageURL: user.photoURL,
      emailUpdates: "off",
      phone: null,
      country: null,
      phoneCode: null,
      firstName: user.displayName.split(" ")[0],
      lastName: user.displayName.split(" ")[1] || "",
    });
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
      const authToken = await user.getIdToken();
      localStorage.setItem("auth-token", authToken);
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
    }

    if (targetId === "signIn-form") {
      setLoading(true); // Set loading early for better UX

      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      // Fixed: Negate the regex to validate properly
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Use state directly instead of FormData for simplicity
      const dataObject = { email, password };
      console.log("Login Email:", dataObject.email);

      const documentId = await signInFirebase(dataObject, setError, setLoading);
      if (!documentId) {
        setError("Unable to fetch user! Try again later");
        return;
      }

      // Fetch user info from Firestore and save to localStorage
      const docRef = doc(db, "users", documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const {
          firstName,
          lastName,
          email: userEmail,
          username,
          uid,
        } = docSnap.data();
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            firstName,
            lastName,
            email: userEmail,
            username,
            userId: uid,
          })
        );
      } else {
        // Fixed: Handle missing doc explicitly
        setError("User profile not found. Please contact support.");
        return;
      }

      // Navigation moved inside success path for email flow
      if (localStorage.getItem("auth-token")) {
        try {
          const userInfoString = localStorage.getItem("user-info");
          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            navigate(`/${userInfo.username}`, { replace: true });
          } else {
            console.warn(
              "User authenticated, but local profile info is missing."
            );
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.error("Navigation error", error); // Fixed typo: errror → error
          setError("Login successful, but navigation failed.");
        }
      } else {
        setError("Login successful, but navigation failed.");
        navigate("../login", { replace: true });
      }
    }
  };

  // Removed unused handlePasswordVisibilityToggle (inline handler used)

  const handleRoutingToSignUp = (event) => {
    event.preventDefault();
    navigate("../signup", { replace: true });
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
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("Google successfully retrieved the user", result.user);
          // Fixed: Use getIdToken() for proper ID token
          const authToken = await result.user.getIdToken();
          localStorage.setItem("auth-token", authToken);

          const { isNewUser } = getAdditionalUserInfo(result);
          let { uid, displayName, email, photoURL } = result.user;
          let docRef = doc(db, "users", uid);

          if (isNewUser) {
            await setDoc(docRef, {
              firstName: displayName.split(" ")[0],
              lastName: displayName.split(" ")[1] || "", // Handle single-name edge case
              email: email,
              photoURL: photoURL,
              uid: uid,
              phone: null,
              username: email.split("@")[0], // Note: Potential collision; consider uniqueness logic
              country: null,
              phoneCode: null,
              emailUpdates: "off",
            });
            localStorage.setItem(
              "user-info",
              JSON.stringify({
                firstName: displayName.split(" ")[0],
                lastName: displayName.split(" ")[1] || "",
                email: email,
                username: email.split("@")[0],
                userId: uid,
              })
            );
          } else {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const {
                firstName,
                lastName,
                email: userEmail,
                username,
                uid,
              } = docSnap.data();
              localStorage.setItem(
                "user-info",
                JSON.stringify({
                  firstName,
                  lastName,
                  email: userEmail,
                  username,
                  userId: uid,
                })
              );
            } else {
              // Added: Handle missing doc for existing users (rare, but consistent)
              setError("User profile not found. Please contact support.");
              return;
            }
          }

          const userInfo = JSON.parse(localStorage.getItem("user-info"));
          navigate(`/${userInfo.username}`, { replace: true });
        }
      } catch (error) {
        console.error("Redirect check error:", error);
        setError("Google login failed. Please try again.");
      }
    };
    checkRedirect();
  }, [navigate]);

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
          minWidth: { md: 400, xs: "100%" }, // Fixed typo: sx → xs
          minHeight: { md: 580, xs: "auto" },
          overflow: "hidden",
          gap: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        {/* Fixed: Show any error, not just "Login failed" */}
        {error && <Alert severity="error">{error}</Alert>}
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
                // Removed onKeyDown if unused
              />
              <TextField
                label="Password"
                type={hiddenPassword ? "password" : "text"}
                placeholder="***********"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Removed onKeyDown if unused
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" cursor="pointer">
                        <IconButton
                          edge="end"
                          tabIndex={-1} // Fixed: tabIndex={0} → -1 to avoid focus issues in MUI
                          onClick={() => setHiddenPassword(!hiddenPassword)} // Inline, no need for separate handler
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
              <Button
                variant="contained"
                type="submit"
                color="success"
                disabled={loading} // Added: Disable during loading
              >
                {loading ? "Signing In..." : "Sign In"}
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
            disabled={loading} // Added: Disable during loading
          >
            Sign in with Google
          </Button>
          <Button variant="outlined" startIcon={<PhoneIcon />}>
            Sign in with Phone No.
          </Button>
          <Typography>
            New User?{" "}
            <Button variant="text" onClick={handleRoutingToSignUp}>
              Create an Account
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
