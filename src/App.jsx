import { useNavigate, Outlet, useLocation } from "react-router";
import {
  Paper,
  Button,
  Typography,
  Avatar,
  Stack,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
        <Container component="main" maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              marginTop: 8,
              padding: { xs: 3, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "background.paper", // Using themes  paper color
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
              Welcome!
            </Typography>
            <Typography component="h2" variant="h5" sx={{ mt: 2 }}>
              To Teams
            </Typography>

            <Typography
              component="p"
              variant="body1"
              sx={{ mt: 1, mb: 4 }}
              color="text.secondary"
            >
              Sign in or create an account to get started.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleSignIn}
                size="large"
                sx={{ px: 4 }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                onClick={handleSignup}
                size="large"
                sx={{ px: 4 }}
              >
                Sign Up
              </Button>
            </Stack>
          </Paper>
        </Container>
      )}
    </>
  );
}
