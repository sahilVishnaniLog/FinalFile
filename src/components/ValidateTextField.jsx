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

  ...props
}) {
  
  const [isError, setError] = useState(null);

  const handleInValidSubmit = (e) => {
    if (e.key === "Enter") {
      e.prevernntDefault();
    }
  };
  const handleFocus = (e) => {
    setError(false);
  };

  const handleBlur = (e) => {
    const isValid = validateField(validationType, e.target.value.trim());

    setError(!isValid);
  };

  return (
    <TextField
      {...props}
      onKeyDown={handleInValidSubmit}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      helperText={
        !isError ? (
          defaultHelperText
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
