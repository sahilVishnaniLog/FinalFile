import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import countryPhoneCodes from "../assets/countryPhoneCode";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Alert,
  Autocomplete,
  Typography,
  Checkbox,
  Link,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  ArrowRightAlt as ArrowRightAltIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

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
    <div>
      <Box
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pl: 3,
          pr: "auto",
          width: "100%",
          height: "100%",
          bgcolor: "white",
        }}
      >
        {" "}
        <img
          sx={{ width: "50%", maxWidth: "50vh" }}
          src="https://images.unsplash.com/photo-1761405378282-e819a65cb493?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"
        ></img>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            minWidth: "50vh",
            height: "auto",
            justifyContent: "left",
            gap: "40px",
          }}
        >
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", margin: 2 }}
            noValidate
            autoComplete="off"
          >
            <Typography
              sx={{
                position: "fixed",
                top: "1rem",
                right: "1rem",
                zIndex: 100,
              }}
              color="contrast"
            >
              Already have an account ?
              <Button
                endIcon={<ArrowRightAltIcon />}
                sx={{ textDecoration: "underline", color: "inherit" }}
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
                fontColor: "#7b1fa2",
                zIndex: 10000,
              }}
            >
              {" "}
              Sign Up
            </Typography>
            <Stack direction="column" sx={{ gap: 3 }}>
              <FormControl>
                <Stack direction="row" width="100%" gap="2rem">
                  <FormControl>
                    <InputLabel htmlFor="user-name-firstName-signup">
                      {" "}
                      FirstName *{" "}
                    </InputLabel>
                    <OutlinedInput
                      value={name.firstName}
                      onChange={(e) => handleName(e)}
                      label="  First Name* "
                      id="usersFirstName"
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="user-name-lastName-signup">
                      {" "}
                      LastName *{" "}
                    </InputLabel>
                    <OutlinedInput
                      value={name.lastName}
                      onChange={(e) => handleName(e)}
                      label=" Last Name * "
                      id="usersLastName"
                    />
                  </FormControl>
                </Stack>
                <FormHelperText id="user-name-signup-helperText">
                  {" "}
                  Please enter your first and your last name{" "}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="user-email-signup"> Email* </InputLabel>
                <OutlinedInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email*"
                  id="user-email-signup"
                >
                  {" "}
                  Email{" "}
                </OutlinedInput>
                <FormHelperText id="user-email-signup-helperText">
                  {" "}
                  Please enter a valid email address
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel> Password* </InputLabel>
                <OutlinedInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={hiddenPassword ? "password" : "text"}
                  htmlFor="user-password-signup"
                  endAdornment={
                    <InputAdornment position="end" cursor="pointer">
                      <IconButton edge="end" onClick={handleHiddenPassword}>
                        {hiddenPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="password"
                  id="user-password-signup"
                >
                  {" "}
                  ********{" "}
                </OutlinedInput>
                <FormHelperText id="user-password-signup-helperText">
                  {" "}
                  Password should be at least 8 characters including a number
                  and a specialCharacter.
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="user-UserName-signup">
                  {" "}
                  Choose UserName *{" "}
                </InputLabel>
                <OutlinedInput label="password" id="user-useraName-signup">
                  {" "}
                  ********{" "}
                </OutlinedInput>
                <FormHelperText id="user-UserName-signup-helperText">
                  {" "}
                  Username should contain only AlphaNumberic characters and
                  shouud not start with a number.{" "}
                </FormHelperText>
                {isValid && (
                  <Alert severity="error" variant="text" sx={{ color: "red" }}>
                    {" "}
                    Username should container only alphaNumeric character and
                    should also not start with a number s
                  </Alert>
                )}
              </FormControl>

              <Autocomplete
                options={countryPhoneCodes}
                getOptionLabel={(option) => option.country || " "}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") setCountry(newValue);
                  else if (newValue && newValue.country)
                    setCountry(newValue.country);
                  else setCountry("");
                }}
                onInputChange={(event, newInputValue) => {
                  setCountry(newInputValue);
                }}
                sx={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    {...params}
                    label="Country/Region"
                  />
                )}
              ></Autocomplete>
              <Alert>
                For compliance reason . we're required to collect country
                information to send you occasional updates and announcements.
              </Alert>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "0rem" }}>
                <TextField
                  width="3rem"
                  label={country}
                  value={
                    countryPhoneCodes.find((item) => item.country === country)
                      ?.code || ""
                  }
                  variant="outlined"
                  sx={{ mr: 2 }}
                />
                <TextField
                  onClick={(e) => e.preventDefault()}
                  width="10rem"
                  label="Phone"
                  variant="outlined"
                >
                  {" "}
                </TextField>
              </Box>

              <Typography sx={{ color: "#1f2328", mt: 2 }}>
                Email preferences
              </Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="Receive occasional product updates and announcemennts"
              ></FormControlLabel>
              <Button
                sx={{ bgcolor: "#233629" }}
                variant="contained"
                type="click"
                onSubmit={signUpUser}
                endIcon={<ArrowRightAltIcon />}
              >
                {" "}
                Create Account{" "}
              </Button>
              <Typography>
                By creating an account, you agree to the{" "}
                <Link href="#TermsNServices"> Terms of Services </Link> For more
                information about our privacy practices, see the{" error "}
                <Link href="#PrivacyPolicy"> Privacy Policy </Link>. We'll
                occasionally send you account-related emails.
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
