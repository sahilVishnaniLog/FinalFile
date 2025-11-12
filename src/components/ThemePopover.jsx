import { useState } from "react";
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
} from "@mui/material";
import {
  CustomLightThemeIcon,
  CustomDarkThemeIcon,
  CustomBrowserThemeIcon,
} from "../icons/customIcons.js";
let listContent = [
  {
    label: "Light",
    icon: (
      <CustomLightThemeIcon
        sx={{ color: "transparent", width: "4rem", height: "auto" }}
      />
    ),
  },
  {
    label: "Dark",
    icon: (
      <CustomDarkThemeIcon
        sx={{ color: "transparent", width: "4rem", height: "auto" }}
      />
    ),
  },
  {
    label: "Browser Theme ",
    icon: (
      <CustomBrowserThemeIcon
        sx={{ color: "transparent", width: "4rem", height: "auto" }}
      />
    ),
  },
];

export default function ThemePopover({ anchorEl, handleClose }) {
  const open = Boolean(anchorEl);
  const [choosenTheme, setChoosenTheme] = useState("Browser Theme");

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
            color: "black",
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
      <RadioGroup
        value={choosenTheme}
        onChange={(event) => setChoosenTheme(event.target.value)}
      >
        <FormControl>
          <List>
            {listContent.map((item, index) => {
              return (
                <ListItem
                  disablePadding
                  key={index}
                  secondaryAction={<Radio value={item.label} />}
                >
                  <ListItemButton>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <ListItemIcon> {item.icon} </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </Stack>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </FormControl>
      </RadioGroup>
    </Popover>
  );
}
