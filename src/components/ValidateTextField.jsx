import React from "react";
import { TextField, Stack, Typography } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { validateField } from "../utils/validation.js";
import { useState } from "react";
export default function ValidateTextField({
  validationType,
  errorMessage,
  defaultHelperText,
  value,
  onBlur,
  ...props
}) {
  const [isError, setError] = useState();

  const handleBlur = (e) => {
    const isValid = validateField(validationType, e.target.value);

    setError(!isValid);

    if (onBlur) onBlur(e);
  };
  const showRedText = isError && value !== "";

  return (
    <TextField
      {...props}
      value={value}
      onBlur={handleBlur}
      helperText={
        showRedText ? (
          defaultHelperText || " "
        ) : (
          <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
            {" "}
            <ReportGmailerrorredIcon
              sx={{ color: "red", fontSize: "0.75rem" }}
            />{" "}
            <Typography sx={{ fontSize: "0.75rem" }}>
              {" "}
              {errorMessage || "Invalid input"}{" "}
            </Typography>
          </Stack>
        )
      }
    />
  );
}
