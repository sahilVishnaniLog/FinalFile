import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";

export default function InlineTextField({ ...props }) {
  const [isEditing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState("this is an enline textfield");

  if (isEditing) {
    return (
      <TextField
        onBlur={() => setEditing(false)}
        onChange={(e) => setTaskTitle(e.target.value)}
        {...props}
        value={taskTitle}
      />
    );
  }

  return (
    <Typography tabIndex={0} onFocus={() => setEditing(true)} {...props}>
      {taskTitle}
    </Typography>
  );
}
