import { useEffect, useState, useMemo, useRef } from "react";
import ValidateTextField from "../components/ValidateTextField.jsx";
import { useNavigate } from "react-router";
import countryPhoneCodes from "../assets/countryPhoneCode"; // DATABASE
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Alert,
  Autocomplete,
  Typography,
  Checkbox,
  Link,
  Stack,
  InputAdornment,
  IconButton,
  Paper,
  AppBar,
} from "@mui/material";
import {
  ArrowRightAlt as ArrowRightAltIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
// INFO: authentication imports from firebase - project JIRA TEAMS APPLICATION
// INFO:  APPLCATION NAME : TEST
import { auth, db } from "./firebaseConfig";

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { useAuth } from "../routingP/BrowserRouter"; // importing the auth context ( vales { isLoggedIn , setLoggedIn, userCredentials, setUserCredentials} )
import FlagIcon from "@mui/icons-material/Flag"; // DEBUG
import * as Flags from "country-flag-icons/react/3x2"; // ADDED: importing flags from country flag icons package

//NEW IMPORTS -29-NOV-2025
export default function SignUp() {
  // CLEANED
  const [isValid, setValid] = useState(false); // wewill use this to check if the username choosen in valid or available ( no conflicts between the usernames  in the database collection over firestore)

  const [email, setEmail] = useState(""); // FORM_DATA_UPDATE
  const [password, setPassword] = useState(""); // FORM_DATA_UPDATE
  const [country, setCountry] = useState(null); // FORM_DATA_UPDATE
  const [username, setUsername] = useState(""); // FORM_DATA_UPDATE
  const [name, setName] = useState({ firstName: "", lastName: "" }); // FORM_DATA_UPDATE

  const [phone, setPhone] = useState(""); // FORM_DATA_UPDATE
  const [phoneCode, setPhoneCode] = useState(" "); // FORM_DATA_UPDATE

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const Navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //regex test
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isfirstNameValid, setIsfirstNameValid] = useState(true);
  const [islastNameValid, setIslastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const objectRegEx = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.\\d)(?=.*[@$!%*?&]).{8,}$/,
    name: /^[a-zA-Z]+$/,
    username: /^[a-zA-Z0-9]+[_,@]*[a-zA-Z0_9]*$/,
  }; // DATABASE: : REGULAR EXPRESSIONS  FOR VALIDATION

  function handleName(e) {
    const { value, id } = e.target;
    const newName = { ...name };

    let setValid = null;
    if (id === "usersFirstName") {
      newName.firstName = value;
      setValid = setIsfirstNameValid;
    }
    if (id === "usersLastName") {
      newName.lastName = value;
      setValid = setIslastNameValid;
    }
    if (setValid) {
      setName(newName);
    }

    const pattern = objectRegEx.name;
    try {
      const regEx = new RegExp(pattern);
      const isNameValid = regEx.test(value);
      setValid(isNameValid);
    } catch (err) {
      console.error("invalid name regex pattern for the name", err);
      setValid(false);
    }
  }

  function handleBlur(e) {
    isfirstNameValid;
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleRegexValidation(e) {
    const { value, id } = e.target;
    if (id === "user-password-signup") {
      let pattern = objectRegEx.password;
      try {
        let regEx = new RegExp(pattern);
        let isPasswordValid = regEx.test(value);
        setIsPasswordValid(Boolean(isPasswordValid));
      } catch (err) {
        console.error("password doesnt satisfy the regex pattern ", err);
        setIsPasswordValid(false);
      }
    }

    if (id === "user-email-signup") {
      let pattern = objectRegEx.email;
      try {
        let regEx = new RegExp(pattern);
        let isEmailValid = regEx.test(value);
        setIsEmailValid(isEmailValid);
      } catch (err) {
        console.error(
          " invalid email doesnt satisfy the underlying regex ",
          err
        );
        setIsEmailValid(false);
      }
    }
    if (id === "user-SignUp-userName") {
      let pattern = objectRegEx.username;
      try {
        let regEx = new RegExp(pattern);
        let isUsernameValid = regEx.test(value);
        setIsUsernameValid(isUsernameValid);
      } catch (err) {
        console.error("invalid", err);
        setIsUsernameValid(false);
      }
    }
  }

  const timeoutRef = useRef(null);

  const { isLoggedIn, setLoggedIn, userInfo, setUserInfo } = useAuth();

  //ADDED
  const FlagIcons = ({ isoCode, size = 30 }) => {
    const FlagComponent = Flags[isoCode];
    return FlagComponent ? (
      <FlagComponent style={{ width: size, height: "auto", marginRight: 10 }} />
    ) : (
      <FlagIcon />
    );
  };
  // will be triggered on Submit ( from the Form below)
  // we also need to add the Form container to prevent the submission we will let the submit request bubble up to be encountered or to be dealt  by form handler
  // CLEANED
  // NEXT_STEP
  function handleSignupToLogin() {
    //NEXT_STEP
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
      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        dataObject.email
      );
      if (signInMethods.length > 0) {
        // INFO : checks if the email is already registered with firebase
        setError("Email already in use, Please login instead");
        setLoading(false);
        return;
      }
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        dataObject.email,
        dataObject.password
      );

      console.log("user created successfully"); // LOG
      if (!userCredentials) {
        setLoggedIn(true);
      }

      //API_POST

      const { user } = userCredentials;
      const userUid = user.uid; // INFO :  DOCUMENT_ID ( WILL BE ) USED TO IDENTIFY THE USER
      const userDocRef = doc(db, "users", userUid); //Here, inside users collection , we are first creating a document with the userUid as the document id
      await setDoc(userDocRef, { uid: userUid, ...dataObject }); // in this documentId( userrUid) we will save the user data + userUid ( for double checking the user data)
      setUserInfo({ uid: userUid, ...dataObject }); // using context to store the user data for the time being of the user logged in on sign up we will set the userInfo  to null
      console.log(
        "User data saved to Firestore with UID as document Id",
        userUid
      );
      setLoading(false);

      // await addDoc(collection(db, "users"), {
      //     // INFO :  adds the user to the collection named users  in firestore each usre has a unique uid which we will save as the document id of the user document
      //     uid: userCredentials.user.uid,
      //     ...dataObject,
      // });
      setLoading(false);
    } catch (error) {
      console.error("error authenticating , error message", error);
      setError(error.message);
      setLoading(false);
    }
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
    if (auth.currentUser) {
      try {
        Navigate(`/${dataObject.usernamme}`, { replace: true });
      } catch (err) {
        console.error("Navigation error", err);
      }
    } else {
      Navigate("../login", { replace: true });
    }
  };

  //TODO

  function handlePhoneInput(event) {
    // CRITICAL
    const input = event.target.value;
    console.log(input);

    setPhone(input);

    const matched = SelectedCountryObject;

    if (!matched || !matched.regex) {
      // No pattern available for selected country — mark phone as invalid (or adjust default behavior)
      setIsPhoneValid(false);
      return;
    }

    try {
      const pattern = matched.regex;
      const regEx = new RegExp(pattern);
      const isPhoneValid = regEx.test(input);
      setIsPhoneValid(isPhoneValid);
    } catch (err) {
      console.error("Invalid phone regex pattern for country:", country, err);
      setIsPhoneValid(false);
    }
  }

  //ADDED : to prevent multiple array searches for other elements to be used for setting the code , flag , flagIcon , and regex of the selected  country
  const SelectedCountryObject = useMemo(() => {
    if (!country) return null;
    return countryPhoneCodes.find((item) => item.country === country);
  }, [country]);
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
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "appbar.paper",
          height: "3rem",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
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
                {/*CRITICAL : FIRST AND LAST NAME */}
                <Stack direction="row" width="100%" gap="2rem">
                  <ValidateTextField
                    name="firstName"
                    id="usersFirstName"
                    label="  First Name* "
                    value={name.firstName}
                    onChange={handleName}
                    validationType="name"
                    errorMessage="Please enter a valid firsts name"
                    defaultHelperText="Please enter first name only"
                    // onKeyDown={handleInvalidSubmit}
                  />

                  <ValidateTextField
                    name="lastName"
                    id="usersLastName"
                    label=" Last Name* "
                    value={name.lastName}
                    onChange={handleName}
                    validationType="name"
                    errorMessage="Please enter a valid last name"
                    defaultHelperText="Please enter last name only"
                  />
                </Stack>

                {/* CRITICAL:  EMAIL  */}
                <ValidateTextField
                  name="email"
                  id="user-email-signup"
                  label=" Email* "
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  validationType="email"
                  errorMessage="This is not an acceptable email address"
                  defaultHelperText="Enter a valid email address"
                />

                {/* CRITICAL:  password  */}
                <ValidateTextField
                  name="password"
                  variant="outlined"
                  label="Set Password"
                  id="user-password-signup"
                  value={password}
                  onChange={handlePassword}
                  onKeyDown={handleInvalidSubmit}
                  validationType="password"
                  errorMessage="Please enter a valid password"
                  defaultHelperText="Password should contain a minimum of 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
                  type={hiddenPassword ? "password" : "text"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end" cursor="pointer">
                          <IconButton
                            edge="end"
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
                <ValidateTextField
                  name="username"
                  label="Set Username"
                  id="user-SignUp-userName"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  validationType="username"
                  errorMessage=" Please enter a valid username"
                  defaultHelperText="Username should contain only AlphaNumeric characters and should not start with a number."
                />

                <Autocomplete // REVIEW : MEMOIZATION
                  options={countryPhoneCodes}
                  getOptionLabel={(option) => option.country || " "}
                  onKeyDown={handleInvalidSubmit}
                  onChange={(event, newValue) => {
                    event.preventDefault();

                    if (typeof newValue === "string") setCountry(newValue);
                    else if (newValue && newValue.country)
                      setCountry(newValue.country);
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
                <Alert>
                  For compliance reason . we're required to collect country
                  information to send you occasional updates and announcements.
                </Alert>
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0rem" }}
                >
                  <TextField
                    width="3rem"
                    label={SelectedCountryObject?.flag || ""}
                    name="phoneCode"
                    value={SelectedCountryObject?.code || ""}
                    variant="outlined"
                    sx={{ mr: 2 }}
                    disabled
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            {country ? (
                              <FlagIcons isoCode={SelectedCountryObject?.iso} />
                            ) : null}
                          </InputAdornment>
                        ),
                      },
                    }}
                  />{" "}
                  {/*CLEANED:  this is the textField for the country code we will add an icons at the start of the  countryCode and will save the flag to the label above legend */}
                  <TextField
                    onKeyDown={handleInvalidSubmit}
                    onSubmit={(e) => e.preventDefault()}
                    onChange={handlePhoneInput}
                    name="phone"
                    value={phone}
                    width="10rem"
                    label="Phone"
                    variant="outlined"
                  >
                    {" "}
                  </TextField>
                </Box>
                {
                  !isPhoneValid && (
                    <Alert severity="warning">
                      {" "}
                      Please enter a valid phone number
                    </Alert>
                  ) /* TODO: */
                }

                <FormControlLabel
                  control={<Checkbox name="emailUpdates" />}
                  label="Receive occasional product updates and announcemennts"
                ></FormControlLabel>
                <Button
                  sx={{ bgcolor: "#5394d5ff" }}
                  variant="contained"
                  type="submit"
                  endIcon={<ArrowRightAltIcon />}
                >
                  {" "}
                  Create Account{" "}
                </Button>
              </Stack>
            </form>
            <Typography sx={{ fontSize: "0.8rem" }}>
              By creating an account, you agree to the{" "}
              <Link href="#TermsNServices"> Terms of Services </Link> For more
              information about our privacy practices, see the{" error "}
              <Link href="#PrivacyPolicy"> Privacy Policy </Link>. We'll
              occasionally send you account-related emails.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
