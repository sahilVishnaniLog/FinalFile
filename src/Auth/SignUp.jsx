import React from "react"; //NOTE
import { useEffect, useState, useRef } from "react"; // themeUsed
import { Form, useNavigate } from "react-router";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import countryPhoneCodes from "../assets/countryPhoneCode";
import { Box, TextField, Button, FormControl, FormControlLabel, InputLabel, FormHelperText, Alert, Autocomplete, Typography, Checkbox, Link, Stack, InputAdornment, IconButton, Paper } from "@mui/material";
import { ArrowRightAlt as ArrowRightAltIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";

export default function SignUp() {
    function signupwithLoggingIn() {
        try {
            const userName = "DummyUserName";
            Navigate(`/${userName}`, { replace: true });
        } catch (error) {
            console.error("error authenticating", error);
        }
        Navigate("");
    }
    // division
    // division // division // division
    // division
    // division
    const [isValid, setValid] = useState(false); // wewill use this to check if the username choosen in valid or available ( no conflicts between the usernames  in the database collection over firestore)
    const [isRegistered, setRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("india");
    const [username, setUsername] = useState("");
    const [name, setName] = useState({ firstName: "", lastName: "" });

    const [phone, setPhone] = useState("");
    const [phoneCode, setPhoneCode] = useState(" ");
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const Navigate = useNavigate();
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    const customUserData = {
        name,
        username,
        phone,
        phoneCode,
        country,
    };

    // will be triggered on Submit ( from the Form below)
    // we also need to add the Form container to prevent the submission we will let the submit request bubble up to be encountered or to be dealt  by form handler

    function handleSignupToLogin() {
        Navigate("../login", { replace: true });
    }

    const signUpUser = (event) => {
        event.preventDefault();

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
        e.preventDefault();
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
    function handleHiddenPassword() {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setHiddenPassword(true);
        timeoutRef.current = setTimeout(() => {
            setHiddenPassword(false);
        }, 2000);

        useEffect(() => {
            return () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }, []);
    }

    return (
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
            <Box>
                {" "}
                <img sx={{ width: "50%", maxWidth: "50%", overflow: "hidden" }} src="https://images.unsplash.com/photo-1761405378282-e819a65cb493?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"></img>{" "}
            </Box>
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
                <Box component="form" sx={{ display: "flex", flexDirection: "column", margin: 2 }} noValidate autoComplete="off">
                    <Typography
                        sx={{
                            position: "fixed",
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
                    <Stack direction="column" sx={{ gap: 3 }}>
                        <FormControl>
                            <Stack direction="row" width="100%" gap="2rem">
                                <TextField value={name.firstName} onChange={(e) => handleName(e)} label="  First Name* " id="usersFirstName" />

                                <TextField value={name.lastName} onChange={(e) => handleName(e)} label=" Last Name * " id="usersLastName" />
                            </Stack>
                            <FormHelperText id="user-name-signup-helperText"> Please enter your first and your last name </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email*" id="user-email-signup">
                                {" "}
                                Email{" "}
                            </TextField>
                            <FormHelperText id="user-email-signup-helperText"> Please enter a valid email address</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={hiddenPassword ? "password" : "text"}
                                htmlFor="user-password-signup"
                                endAdornment={
                                    <InputAdornment position="end" cursor="pointer">
                                        <IconButton edge="end" onClick={handleHiddenPassword}>
                                            {hiddenPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Set Password"
                                id="user-password-signup"
                            >
                                {" "}
                                ********{" "}
                            </TextField>
                            <FormHelperText id="user-password-signup-helperText"> Password should be at least 8 characters including a number and a specialCharacter.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField label="Set Username" id="user-useraName-signup">
                                {" "}
                                ********{" "}
                            </TextField>
                            <FormHelperText id="user-UserName-signup-helperText"> Username should contain only AlphaNumberic characters and shouud not start with a number. </FormHelperText>
                        </FormControl>
                        {isValid && (
                            <Alert severity="error" variant="text" sx={{ color: "red" }}>
                                {" "}
                                Username should container only alphaNumeric character and should also not start with a number s
                            </Alert>
                        )}

                        <Autocomplete
                            options={countryPhoneCodes}
                            getOptionLabel={(option) => option.country || " "}
                            onChange={(event, newValue) => {
                                if (typeof newValue === "string") setCountry(newValue);
                                else if (newValue && newValue.country) setCountry(newValue.country);
                                else setCountry("");
                            }}
                            onInputChange={(event, newInputValue) => {
                                setCountry(newInputValue);
                            }}
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField value={country} onChange={(e) => setCountry(e.target.value)} {...params} label="Country/Region" />}
                        ></Autocomplete>
                        <Alert>For compliance reason . we're required to collect country information to send you occasional updates and announcements.</Alert>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: "0rem" }}>
                            <TextField width="3rem" label={country} value={countryPhoneCodes.find((item) => item.country === country)?.code || ""} variant="outlined" sx={{ mr: 2 }} />
                            <TextField onClick={(e) => e.preventDefault()} width="10rem" label="Phone" variant="outlined">
                                {" "}
                            </TextField>
                        </Box>

                        <Typography sx={{ color: "#1f2328", mt: 2 }}>Email preferences</Typography>
                        <FormControlLabel control={<Checkbox />} label="Receive occasional product updates and announcemennts"></FormControlLabel>
                        <Button sx={{ bgcolor: "#233629" }} variant="contained" type="click" onSubmit={signUpUser} endIcon={<ArrowRightAltIcon />}>
                            {" "}
                            Create Account{" "}
                        </Button>
                        <Typography>
                            By creating an account, you agree to the <Link href="#TermsNServices"> Terms of Services </Link> For more information about our privacy practices, see the{" error "}
                            <Link href="#PrivacyPolicy"> Privacy Policy </Link>. We'll occasionally send you account-related emails.
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
}
