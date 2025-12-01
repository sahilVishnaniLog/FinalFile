import { useState, useEffect , useRef  } from "react";
import { useNavigate } from "react-router";
import { auth, db, googleProvider } from "./firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, getIdToken, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../routingP/BrowserRouter"; // NOTE : we dont need this we are now handling all this using the token  and saving it to the loal storage and removing it on logout
import { Container, Paper, Typography, Box, Button, TextField, Divider, Alert, Stack ,Modal, InputAdornment, IconButton} from "@mui/material";
import { Google as GoogleIcon, Phone as PhoneIcon, Visibility as VisibilityIcon , VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
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
    const timeoutRef = useRef( null) ; 

    //methods for handlers
    const handleInvalidSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    
    const handleGoogleLogin = async (e) => {
        // TODO : handleGoogleLogin
        e.preventDefault();
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
            const userCredentials = await signInWithEmailAndPassword(auth, dataObject.email, dataObject.password);
            const { user } = userCredentials;
            // update component state/context on success

            // TODO
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // truthy event
                    const authToken = await user.getIdToken(); // API_GET
                    localStorage.setItem("auth-token", authToken); // logout will remove this token where else the loader function will check for this token
                    const documentId = user.uid;
                    const docRef = doc(db, "users", documentId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const { firstName, lastName, email, username } = docSnap.data();
                        localStorage.setItem("user-info", JSON.stringify({ firstName, lastName, email, username })); // this is JSON string which needs to be parsed to be used in the whole app everywhere
                    }
                }
            });
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
        let formElement = document.getElementById("signIn-form");
        let formData = new FormData(formElement);
        let dataObject = Object.fromEntries(formData); // DATABASE

        console.log(dataObject); // LOG ;

        await signInFirebase(dataObject, setError, setLoading);

        if (localStorage.getItem("auth-token")) {
            try {
                const userInfoJSON = localStorage.getItem("user-info");

                const { username } = JSON.parse(localStorage.getItem("user-info"));
                const userName = username;
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
    useEffect ( ()=> { 
        timeoutRef.current = setTimeout(() =>{ 
            setHiddenPassword(true) ; 
        }, 7000 ) ; 
        return () => { 
            if(timeoutRef.current) { 
                clearTimeout(timeoutRef.current)  ; 
            }
        }
    }, [hiddenPassword])


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
                            <TextField label="Email" type='text' 
                             placeholder="sahilvishnani25@gmail.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleInvalidSubmit}/>
                               
                           
                            <TextField label="Password" type={hiddenPassword ? "password": "text" }  placeholder="***********" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleInvalidSubmit}
                                 slotProps={{ input: { 
                                    endAdornment: (<InputAdornment position='end'  cursor='pointer' > 
                                    <IconButton edge='end' onClick={ () => setHiddenPassword(!hiddenPassword) } > 
                                        { hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon/>} 
                                        </IconButton> 
                                        </InputAdornment>)
                                 } 
                                    
                                }} /> 
                            <Button variant="contained" type="submit" onClick={handleLogin} color="success">
                                {" "}
                                Sign In
                            </Button>
                        </Stack>
                    </form>

                    <Divider>or</Divider>

                    <Button variant="contained" startIcon={<FcGoogle />} color='success' onClick={handleGoogleLogin}>
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
