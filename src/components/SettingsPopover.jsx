import { useState } from "react";
import {
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { ThemePopover, BackgroundPopover } from "./component.js";
//
import { IoStarOutline } from "react-icons/io5"; // star
import { IoSettingsOutline } from "react-icons/io5"; // settings
import ContrastIcon from "@mui/icons-material/Contrast"; // dark/light mode
import { LuPaintBucket } from "react-icons/lu"; // background
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const listContent = [
  { label: "Add to starred", icon: <IoStarOutline /> },
  { label: "Settings", icon: <IoSettingsOutline /> },
  { label: "Theme", icon: <ContrastIcon /> },
  { label: "set Background", icon: <LuPaintBucket /> },
];

export default function SettingsPopover({ anchorEl, handleClose }) {
  const open = Boolean(anchorEl);

  //anchor for theme and background popover
  const [anchorThemeEl, setAnchorThemeEl] = useState(null);
  const [anchorBackgroundEl, setAnchorBackgroundEl] = useState(null);

  const handleThemePopoverClick = (event) => {
    event.preventDefault();
    setAnchorThemeEl(anchorThemeEl ? null : event.currentTarget);
  };
  const handleBackgroundPopoverClick = (event) => {
    event.preventDefault();
    setAnchorBackgroundEl(anchorBackgroundEl ? null : event.currentTarget);
  };

  const handleThemePopoverClose = (event) => {
    setAnchorThemeEl(null);
  };
  const handleBackgroundPopoverClose = (event) => {
    setAnchorBackgroundEl(null);
  };

  return (
    <>
      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableEnforceFocus
        slotProps={{
          paper: {
            sx: {
              pointerEvents: "auto",
              overflow: "visible",
              width: `${360 / 1.36}px`,
              bgcolor: "white",
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
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{listContent[0].icon}</ListItemIcon>
              <ListItemText primary={listContent[0].label} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{listContent[1].icon}</ListItemIcon>
              <ListItemText primary={listContent[1].label} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleThemePopoverClick}>
              <ListItemIcon>{listContent[2].icon}</ListItemIcon>
              <ListItemText primary={listContent[2].label} />
              <ChevronRightIcon />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleBackgroundPopoverClick}>
              <ListItemIcon>{listContent[3].icon}</ListItemIcon>
              <ListItemText primary={listContent[3].label} />
              <ChevronRightIcon />
            </ListItemButton>
          </ListItem>
        </List>
        <ThemePopover />
        <BackgroundPopover />
      </Popover>

      <ThemePopover
        anchorEl={anchorThemeEl}
        handleClose={handleThemePopoverClose}
      />

      <BackgroundPopover
        anchorEl={anchorBackgroundEl}
        handleClose={handleBackgroundPopoverClose}
      />
    </>
  );
}
