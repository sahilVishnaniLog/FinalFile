import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../routingP/BrowserRouter"; // CONTEXT
import { Container, Paper, Typography, Box, Button, TextField, Divider, Alert, Stack } from "@mui/material";
import { Google as GoogleIcon, Phone as PhoneIcon } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";

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
const User = {
    uid: "sahilVishnaniUniqueIdentificationCode",
    email: "sahilvishnani25@gmail.com",
    emailVerified: true,
    displayName: "Sahil Vishnani",
    userName: "SahilVishnani2520",
    photoURL: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",

    phone: "+91 7568202959",
};
const DummyUserCredential = {
    user: User,
};
export default function Login() {
    const [userCredential, setUserCredential] = useState(DummyUserCredential);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTrue, setIsTrue] = useState(true);
    const { isLoggedIn, setLoggedIn, userInfo, setUserInfo } = useAuth();
    const Navigate = useNavigate();

    //methods for handlers
    const handleInvalidSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    const handleAuthAction = async (e) => {
        e.preventDefault();
    };
    const handleGoogleLogin = (e) => {
        e.preventDefault();
    };
    const handlePhoneLogin = (e) => {
        e.preventDefault();
    };
    const signInFirebase = async (dataObject, setError, setLoading) => {
        try {
            setError("");
            setLoading(true);
            const userCredentials = await signInWithEmailAndPassword(auth, dataObject.email, dataObject.password);
            // update component state/context on success
            if (userCredentials) {
                setLoggedIn(true);
                const { user } = userCredentials; // API_GET
                const documentId = user.uid; // this is the uid ( which e have used to save the data of the user in our firebase database) in the collection named users
                const docRef = doc(db, "users", documentId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserInfo(userData);
                    console.log(userData);
                }
            }
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (event) => {
        //TODO
        // code to trigger the authorization request and the firebase will send back the userCredential to the callback function
        event.preventDefault();

        console.log("login works");
        if (!email || !password) {
            alert("Please fill in all the fields");
            setError("Please fill in all the fields");
            setLoading(false);
            return;
        }
        const formElement = document.getElementById("signIn-form");
        const formData = new FormData(formElement);
        const dataObject = Object.fromEntries(formData); // DATABASE

        console.log(dataObject); // LOG ;

        await signInFirebase(dataObject, setError, setLoading);

        if (isLoggedIn) {
            try {
                const userName = "DummyUserName";
                Navigate(`/${userName}`, { replace: true });
            } catch (error) {
                alert("Login failed:", error);
                setError("Login failed");
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
                            <TextField label="Email" type="email" placeholder="sahilvishnani25@gmail.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleInvalidSubmit}>
                                {" "}
                            </TextField>
                            <TextField label="Password" type="password" placeholder="***********" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleInvalidSubmit}>
                                {" "}
                            </TextField>
                            <Button variant="contained" type="submit" onClick={handleLogin} color="success">
                                {" "}
                                Sign In
                            </Button>
                        </Stack>
                    </form>

                    <Divider>or</Divider>

                    <Button variant="contained" startIcon={<FcGoogle />} sx={{ bgcolor: "gray" }} onClick={isTrue ? handleGoogleLogin : SignUp}>
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
