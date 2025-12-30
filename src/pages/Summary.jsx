import React, { useState } from "react";
import { Chip, Avatar, Stack } from "@mui/material";
import { UserData } from "../assets/KanbanInitialData";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function Summary() {
  const { modeChoice } = useTheme();
  const roleColorMap = (role, modeChoice) => {
    switch (role) {
      case "Manager":
        return modeChoice === "light" ? "#D32F2F" : "#FF5252";
      case "Designer":
        return modeChoice === "light" ? "#1976D2" : "#448AFF";
      case "Developer":
        return modeChoice === "light" ? "#388E3C" : "#66BB6A";

      case "Tester":
        return modeChoice === "light" ? "#F57C00" : "#FFEB38";
      default:
        return null;
    }
  };
  return (
    <>
      <Stack direction="column" gap={2}>
        {UserData.map((user) => (
          <Chip
            key={user.uid}
            label={user.name}
            avatar={<Avatar alt={user.name} src={user.photoUrl} />}
            sx={{
              justifyContext: "space-between",
              width: 175,
              height: 40,
              backgroundColor: roleColorMap(user.role, modeChoice),
              color: "text.primary",
            }}
            onDelete
            variant="filled"
          />
        ))}
      </Stack>
    </>
  );
}
