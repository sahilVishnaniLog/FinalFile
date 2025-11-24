import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import countryPhoneCodes from "../assets/countryPhoneCode";
import { Box, TextField, Button, FormControlLabel, Alert, Autocomplete, Typography, Checkbox, Link, Stack, InputAdornment, IconButton, Paper, AppBar } from "@mui/material";
import { ArrowRightAlt as ArrowRightAltIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
// INFO: authentication imports from firebase - project JIRA TEAMS APPLICATION
// INFO:  APPLCATION NAME : TEST
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { useAuth } from "../routingP/BrowserRouter"; // importing the auth context ( vales { isLoggedIn , setLoggedIn, userCredentials, setUserCredentials} )

export default function SignUp() {
    const [isValid, setValid] = useState(false); // wewill use this to check if the username choosen in valid or available ( no conflicts between the usernames  in the database collection over firestore)
    const [isRegistered, setRegistered] = useState(false);
    const [email, setEmail] = useState(""); // FORM_DATA_UPDATE
    const [password, setPassword] = useState(""); // FORM_DATA_UPDATE
    const [country, setCountry] = useState("india"); // FORM_DATA_UPDATE
    const [username, setUsername] = useState(""); // FORM_DATA_UPDATE
    const [name, setName] = useState({ firstName: "", lastName: "" }); // FORM_DATA_UPDATE

    const [phone, setPhone] = useState(""); // FORM_DATA_UPDATE
    const [phoneCode, setPhoneCode] = useState(" "); // FORM_DATA_UPDATE
    const [formDataState, setFormDataState] = useState({}); // DATABASE
    const [hiddenPassword, setHiddenPassword] = useState(true);

    const Navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    const { isLoggedIn, setLoggedIn, userInfo, setUserInfo } = useAuth();

    const customUserData = {
        name,
        username,
        phone,
        phoneCode,
        country,
    };

    // will be triggered on Submit ( from the Form below)
    // we also need to add the Form container to prevent the submission we will let the submit request bubble up to be encountered or to be dealt  by form handler
    // CLEANED
    // NEXT_STEP
    function handleSignupToLogin() {
        Navigate("../login", { replace: true });
    }

    // ADDED : onKeyDown  : prevents the submission on Enter key press
    const handleInvalidSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const signUpFirebase = async (dataObject, setError, setLoading) => {
        try {
            //EVENT_USER
            setError("");
            setLoading(true);
            const signInMethods = await fetchSignInMethodsForEmail(auth, dataObject.email);
            if (signInMethods.length > 0) {
                // INFO : checks if the email is already registered with firebase
                setError("Email already in use, Please login instead");
                setLoading(false);
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, dataObject.email, dataObject.password);

            console.log("user created successfully"); // LOG
        } catch (error) {
            console.log("error signing up user", error);
        }
        try {
            //API_POST

            const { user } = userCredential;
            const userUid = user.uid; // INFO :  DOCUMENT_ID ( WILL BE ) USED TO IDENTIFY THE USER
            const userDocRef = doc(db, "users", userUid);
            await setDoc(userDocRef, dataObject);
            console.log("User data saved to Firestore with UID as document Id", userUid);
            setLoading(false);
        } catch (error) {
            console.log("Error setting user document", error);
        }

        await addDoc(collection(db, "users"), {
            // INFO :  adds the user to the collection named users  in firestore each usre has a unique uid which we will save as the document id of the user document
            uid: userCredential.user.uid,
            ...dataObject,
        });
        setLoading(false);
    };

    // DATA_MODEL
    // EVENT_HANDLER_USER
    const handleSignUp = async (event) => {
        event.preventDefault();

        console.log("create account works "); //LOG
        if (!email || !password || !name || !username || !phone || !country) {
            alert("Please fill in all the fields");
            setError("Please fill  in all the fields");
            return;
        }

        const formElement = document.getElementById("signUp-form");
        const formData = new FormData(formElement);
        const dataObject = Object.fromEntries(formData); // DATABASE

        console.log(dataObject); // LOG

        await signUpFirebase(dataObject, setError, setLoading);

        //dummy run
        try {
            const userName = "DummyUserName";
            Navigate(`/${userName}`, { replace: true });
        } catch (error) {
            console.error("error authenticating , error message", error);
        }
    };

    //this code doesnt belong here

    // try {
    //   const userCredentials = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   ).catch((err) => {
    //     console.error("error signing up user" + err.message);
    //   });
    //   const { user } = userCredentials;

    //   const userDoc = {
    //     uid: user.uid,
    //     email: user.email,
    //     username: customUserData.username ?? user.displayName ?? "",
    //     phone: customUserData.phone ?? "",
    //     phoneCode: customUserData.phoneCode ?? "",
    //     country: customUserData.country ?? "",
    //     name: customUserData.name ?? "",
    //     createdAt: new Date().toUTCString(),
    //     role: user.email === "sahilvishnani25@gmail.com" ? "admin" : "user",
    //   };
    //   await setDoc(doc(db, "users", user.uid), userDoc).catch((err) => {
    //     console.error("error saving user data to firestore " + err.message);
    //   });
    //   console.log("User created and saved to FireStore database");
    //   // const userName = "DummyUserName";
    //   Navigate("/${userName}", { replace: true });

    //   return user;
    // } catch (err) {
    //   alert("error in creating user" + err.message);
    //   Navigate("");
    //   throw err;
    // }

    function handleName(e) {
        const { value, id } = e.target;
        const newName = { ...name };
        if (id === "usersFirstName") {
            newName.firstName = value;
        }
        if (id === "usersLastName") {
            newName.lastName = value;
        }
        setName(newName);
    }

    //CLEANED
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setHiddenPassword(true);
        }, 7000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [hiddenPassword]);

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "appbar.paper", height: "3rem", display: "flex", alignItems: "flex-end" }}>
                <Typography
                    sx={{
                        top: "1rem",
                        right: "1rem",
                        zIndex: 100,
                        color: "text.primary",
                    }}
                >
                    Already have an account ?
                    <Button
                        endIcon={<ArrowRightAltIcon />}
                        sx={{
                            textDecoration: "underline",
                            color: "inherit",
                            color: "text.primary",
                        }}
                        onClick={handleSignupToLogin}
                    >
                        {" "}
                        Sign In
                    </Button>{" "}
                </Typography>
            </AppBar>
            <Paper
                sx={{
                    display: "flex",
                    height: "auto",
                    width: "90%",
                    margin: "5%",
                    borderRadius: "5px",
                    bgcolor: "background.paper",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
                elevation={3}
            >
                {/* <Box>
                    // BUG <img sx={{ width: "50%", maxWidth: "50%", overflow: "hidden", objectFit: "scale-down" }} src="https://images.unsplash.com/photo-1761405378282-e819a65cb493?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"></img>{" "}
                </Box> */}
                <Box
                    sx={{
                        display: "block",
                        width: "100%",
                        maxWidth: "50%",
                        height: "auto",
                        justifyContent: "left",
                        gap: "40px",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", margin: 2 }}>
                        {" "}
                        {/* HACK */}
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 3,
                                fontWeight: "bold",
                                color: "text.primary", // themeUsed
                                zIndex: 10000,
                            }}
                        >
                            {" "}
                            Sign Up
                        </Typography>
                        <form id="signUp-form" onSubmit={handleSignUp}>
                            <Stack direction="column" sx={{ gap: 3 }}>
                                <Stack direction="row" width="100%" gap="2rem">
                                    <TextField name="firstName" value={name.firstName} onChange={(e) => handleName(e)} onKeyDown={handleInvalidSubmit} label="  First Name* " id="usersFirstName" helperText="Please enter first name only" />

                                    <TextField name="lastName" value={name.lastName} onChange={(e) => handleName(e)} onKeyDown={handleInvalidSubmit} label=" Last Name * " id="usersLastName" helperText="Please enter last name only" />
                                </Stack>

                                <TextField name="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email*" id="user-email-signup" helperText={"Please enter a valid email address"} onKeyDown={handleInvalidSubmit}>
                                    {" "}
                                    Email{" "}
                                </TextField>
                                <TextField
                                    name="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleInvalidSubmit}
                                    type={hiddenPassword ? "password" : "text"}
                                    htmlFor="user-password-signup"
                                    helperText={"Password should be at least 8 characters including a number and a specialCharacter."}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end" cursor="pointer">
                                                    <IconButton edge="end" onClick={() => setHiddenPassword(!hiddenPassword)}>
                                                        {hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    label="Set Password"
                                    id="user-password-signup"
                                />
                                <TextField name="username" onKeyDown={handleInvalidSubmit} onChange={(e) => setUsername(e.target.value)} value={username} label="Set Username" id="user-useraName-signup" helperText={"Username should contain only AlphaNumberic characters and shouud not start with a number. "} error={isValid} />
                                {isValid && (
                                    <Alert severity="error" variant="text" sx={{ color: "red" }}>
                                        {" "}
                                        Username should container only alphaNumeric character and should also not start with a number s
                                    </Alert>
                                )}
                                <Autocomplete
                                    options={countryPhoneCodes}
                                    getOptionLabel={(option) => option.country || " "}
                                    onKeyDown={handleInvalidSubmit}
                                    onChange={(event, newValue) => {
                                        event.preventDefault();

                                        if (typeof newValue === "string") setCountry(newValue);
                                        else if (newValue && newValue.country) setCountry(newValue.country);
                                        else setCountry("");
                                    }}
                                    onInputChange={(_event, newInputValue) => {
                                        setCountry(newInputValue);
                                    }}
                                    sx={{ width: "100%", margin: "1rem 0 " }}
                                    renderInput={(params) => (
                                        <TextField
                                            name="country"
                                            value={country}
                                            onSubmit={(e) => e.preventDefault()}
                                            onKeyDown={handleInvalidSubmit}
                                            onChange={(e) => {
                                                setCountry(e.target.value);
                                            }}
                                            {...params}
                                            label="Country/Region"
                                        />
                                    )}
                                ></Autocomplete>
                                <Alert>For compliance reason . we're required to collect country information to send you occasional updates and announcements.</Alert>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: "0rem" }}>
                                    <TextField width="3rem" label={country} name="phoneCode" value={countryPhoneCodes.find((item) => item.country === country)?.code || ""} variant="outlined" sx={{ mr: 2 }} />
                                    <TextField onKeyDown={handleInvalidSubmit} onSubmit={(e) => e.preventDefault()} onChange={(e) => setPhone(e.target.value)} name="phone" value={phone} width="10rem" label="Phone" variant="outlined">
                                        {" "}
                                    </TextField>
                                </Box>

                                <FormControlLabel control={<Checkbox name="emailUpdates" />} label="Receive occasional product updates and announcemennts"></FormControlLabel>
                                <Button sx={{ bgcolor: "#233629" }} variant="contained" type="submit" endIcon={<ArrowRightAltIcon />}>
                                    {" "}
                                    Create Account{" "}
                                </Button>
                            </Stack>
                        </form>
                        <Typography sx={{ fontSize: "0.8rem" }}>
                            By creating an account, you agree to the <Link href="#TermsNServices"> Terms of Services </Link> For more information about our privacy practices, see the{" error "}
                            <Link href="#PrivacyPolicy"> Privacy Policy </Link>. We'll occasionally send you account-related emails.
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </>
    );
}
