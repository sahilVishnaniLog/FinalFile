import { useState } from "react";
import { useTheme } from "../theme/ThemeContext.jsx";
import {
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import {
  CustomLightThemeIcon,
  CustomDarkThemeIcon,
  CustomBrowserThemeIcon,
} from "../icons/customIcons.js";

let listContent = [
  {
    label: "light",
    icon: (
      <CustomLightThemeIcon
        sx={{ color: "transparent", width: "4rem", height: "auto" }}
      />
    ),
  },
  {
    label: "dark",
    icon: (
      <CustomDarkThemeIcon
        sx={{ color: "transparent", width: "4rem", height: "auto" }}
      />
    ),
  },
  {
    label: "browserTheme",
    icon: (
      <CustomBrowserThemeIcon
        sx={{ color: "transparent", width: "4rem", height: "auto" }}
      />
    ),
  },
];

export default function ThemePopover({ anchorEl, handleClose }) {
  const open = Boolean(anchorEl);
  const { modeChoice, setModeChoice } = useTheme();

  console.log(modeChoice);

  return (
    <Popover
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      disableEnforceFocus
      slotProps={{
        paper: {
          onClick: (event) => event.stopPropagation(),
          sx: {
            pointerEvents: "auto",
            overflow: "visible",
            width: `${331 / 1.36}px`,
            bgcolor: "background.paper",
            color: "text.primary",
            p: `${11 / 1.36}px`,
          },
        },
        backdrop: {
          sx: {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <FormControl>
        <RadioGroup
          value={modeChoice}
          onChange={(event) => {
            setModeChoice(event.target.value);
            localStorage.setItem("theme", event.target.value);
            // console.log(modeChoice); // debugger
          }}
        >
          <List sx={{ p: 0 }}>
            {listContent.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Radio value={item.label} sx={{ display: "none" }} />
                  }
                  label={
                    <ListItem disablePadding key={index}>
                      <ListItemButton sx={{ width: "100%" }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <ListItemIcon> {item.icon} </ListItemIcon>
                          <ListItemText primary={item.label} />
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                  }
                />
              );
            })}
          </List>
        </RadioGroup>
      </FormControl>
    </Popover>
  );
}
