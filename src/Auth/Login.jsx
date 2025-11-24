import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "./firebaseConfig";
import { useAuth } from "../routingP/BrowserRouter";
import { Container, Paper, Typography, Box, Button, TextField, Divider, Alert } from "@mui/material";
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
    const Navigate = useNavigate();

    //methods for handlers
    const handleAuthAction = async (e) => {
        e.preventDefault();
    };
    const handleGoogleLogin = (e) => {
        e.preventDefault();
    };
    const handlePhoneLogin = (e) => {
        e.preventDefault();
    };
    const handleLogin = async (event) => {
        // code to trigger the authorization request and the firebase will send back the userCredential to the callback function
        event.preventDefault();

        try {
            const userName = "DummyUserName";
            Navigate(`/${userName}`, { replace: true });
        } catch (error) {
            alert("Login failed:", error);
            setError("Login failed");
            Navigate("");
        }
    };
    const handleRoutingToSignUp = (event) => {
        event.preventDefault();

        Navigate("../signup", { replace: true });
        // Navigate("signup", { replace: true });
    };
    const userUid = userCredential.user.uid; // will be null if the user is not successfully logged  will provide the authContext to the protected routes

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
                    component="form"
                    onSubmit={handleAuthAction}
                    noValidate
                    gap={3}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mt: 1,
                        width: "80%",
                    }}
                >
                    <TextField label="Email" type="email" placeholder="sahilvishnani25@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}>
                        {" "}
                    </TextField>
                    <TextField label="Password" type="password" placeholder="***********" value={password} onChange={(e) => setPassword(e.target.value)}>
                        {" "}
                    </TextField>
                    <Button variant="contained" type="submit" onClick={handleLogin} color="success">
                        {" "}
                        Sign In
                    </Button>

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
                            Create an Account{" "}
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
export function userCredential() {
    const userCredenial = useContext(AuthContext);
}
