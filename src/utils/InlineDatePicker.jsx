import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
 
import dayjs from 'dayjs' ; 
 
// we can pass props to customize the datepicker  like , format, timezone, labe 
export default function InlineDatePicker({ ...props }) {
  const [isEditing, setEditing] = useState(false);
  const [date, setDate] = useState(dayjs.tz(new Date().toLocaleDateString() ))
  const [taskTitle, setTaskTitle] = useState("this is an enline textfield");
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setEditing(false);
  };

  if (isEditing) {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="en-IN"
        dateLibInstance={dayjs.tz}
      >
        <DatePicker
          slotprops={{
            textField: {
              onBlur: () => setEditing(false),
            },
          }}
          onChange={handleDateChange}
          {...props}
          value={date}
          showDaysOutsideCurrentMonth
          slotProps={{
            textField: {
              variant: "outlined",
              size: "small",
            },
          }}
        />
      </LocalizationProvider>
    );
  }

  return (
    <Typography tabIndex={0} onFocus={() => setEditing(true)} {...props}>
      {date ? date.format("DD-MM-YYYY") : "Select Date" }  
    </Typography>
  );
}