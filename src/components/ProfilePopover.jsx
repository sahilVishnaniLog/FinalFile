import { useNavigate } from "react-router";
import {
  Popover,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Stack,
  Avatar,
  AvatarGroup,
} from "@mui/material";

import {
  PersonOutline as PersonOutlineIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { AiOutlineUserSwitch } from "react-icons/ai";
const DummyUser = {
  name: "Sahil Vishnani",
  email: "sahilvishnani25@gmail.com",
  url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
};

const DummyOnlineUser = [
  {
    name: "rene zegler",
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    name: "Dave Smith",
    url: "https://plus.unsplash.com/premium_photo-1693258698597-1b2b1bf943cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1000",
  },
  {
    name: "James McCain catamarane plan",
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    name: "Ragukul Reddy",
    url: "https://media.istockphoto.com/id/116192438/photo/one-indian-it-software-engineer-white-collar-worker-computer-people.webp?a=1&b=1&s=612x612&w=0&k=20&c=yCT6pKSUFtfymcCnUzx6SeSqS8yrWLDeVYZH8mOcJ3c=",
  },
];

function stringAvatar(name) {
  const safeName = typeof name === "string" ? name : "";

  const nameParts = safeName.split(" ");

  const firstInitial = nameParts[0] ? nameParts[0][0] : "?";

  const secondInitial = nameParts[1] ? nameParts[1][0] : "";
}

export default function profilePopover({
  anchorEl,
  handleClose,
  handleSignOut,
}) {
  const open = Boolean(anchorEl);
  const Navigate = useNavigate();

  return (
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
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
            width: `${425 / 1.36}px`,
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          bgcolor: "background.neutral",
          color: "text.primary",
          borderRadius: 1,
          height: `${130 / 1.36}px`,
          p: "1rem",
        }}
      >
        <Stack direction="row" gap={2}>
          <Avatar
            {...stringAvatar(DummyUser.name)}
            sx={{
              width: "4rem",
              height: `4rem`,
              fontSize: "2rem",
            }}
          />

          <Stack direction="column">
            <Typography sx={{ fontWeight: "bold" }} fontSize="1.3rem">
              {" "}
              {DummyUser.name}{" "}
            </Typography>
            <Typography fontSize="0.9rem"> {DummyUser.email} </Typography>
          </Stack>
        </Stack>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText primary="Account settings" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AiOutlineUserSwitch />
            </ListItemIcon>
            <ListItemText primary="Switch Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut} type="submit">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>

      <AvatarGroup alignItem="center" max={4}>
        {DummyOnlineUser.map((user) => {
          return <Avatar alt={user.name} src={user.url} />;
        })}
      </AvatarGroup>
    </Popover>
  );
}
