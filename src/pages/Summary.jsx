import React, { useState } from "react";
import { Chip, Avatar, Stack } from "@mui/material";
import { UserData } from "../assets/KanbanInitialData";
import useTheme from "../theme/ThemeContext.jsx";

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
            key={user.id}
            label={user.name}
            avatar={<Avatar alt={user.name} src={user.photoUrl} />}
            sx={{
              width: 200,
              height: 50,
              backgroundColor: roleColorMap(user.role),
              color: "text.primary",
            }}
            variant="filled"
          />
        ))}
      </Stack>
    </>
  );
}
