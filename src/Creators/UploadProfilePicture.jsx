import React, { useState } from "react";
import { storage } from "../Auth/firebaseConfig.js";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Button,
  Box,
  LinearProgress,
  Typography,
  Stack,
  Paper,
  Container,
  Grid,
} from "@mui/material";

export default function UploadProfilePicture() {
  return <Box sx={{ maxWidth: "400px", mx: "auto", mt: 4, p: 2 }}></Box>;
}
