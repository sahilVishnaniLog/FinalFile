import React, { useState } from "react";
import { Outlet, useParams, useLocation, useNavigate } from "react-router";

import {
  Container,
  Typography,
  Stack,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Box,
  AppBar,
} from "@mui/material";
import { ProfilePopover, SettingsPopover } from "./components/component.js";

import { CiBoxList, CiViewBoard, CiGlobe } from "react-icons/ci";
import { FaWpforms } from "react-icons/fa";
import { TbTimeline } from "react-icons/tb";
import { ImPageBreak } from "react-icons/im";

import {
  Group as GroupIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";

const TabsArray = [
  { label: "Board", icon: <CiViewBoard /> },
  { label: "Forms", icon: <FaWpforms /> },
  { label: "List", icon: <CiBoxList /> },
  { label: "Pages", icon: <ImPageBreak /> },
  { label: "Summary", icon: <CiGlobe /> },
  { label: "Timeline", icon: <TbTimeline /> },
];
const IconButtonStyle = {
  bgcolor: "transparent",
  border: "2px grey solid ",
  borderRadius: "20%",
  color: "text.secondary",
  height: "40px",
  width: "40px",
  "&:hover": { bgColor: "white" },
  "&:active": { bgColor: "white" },
  "&:focus": { bgColor: "white" },
};
export default function WelcomePage() {
  // hooks
  const [currentTab, setCurrentTab] = useState("Board");
  const { userName } = useParams();
  const Navigate = useNavigate();
  const location = useLocation();

  //profile popover
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);
  const [anchorSettingsEl, setAnchorSettingsEl] = useState(null);
  // debugging
  console.log(location);

  // methods
  function handleSignOut() {
    // will contain the code to handle signout
    const isSignedIn = false; // dummy variable passed

    if (!isSignedIn) {
      Navigate("/", { replace: true });
    }

    // if()
  }

  const handleTabChange = (event, newTab) => {
    console.log(currentTab);
    console.log(newTab);
    setCurrentTab(newTab);
    Navigate(`/${userName}/${newTab.toLowerCase()}`, { replace: true });
  };

  // profile popover
  function handleProfilePopoverClick(event) {
    event.preventDefault();
    setAnchorProfileEl(anchorProfileEl ? null : event.currentTarget);
  }
  function handleProfilePopoverClose(event) {
    setAnchorProfileEl(null);
  }

  //settings popover method
  function handleSettingsPopoverClick(event) {
    event.preventDefault();
    setAnchorSettingsEl(anchorSettingsEl ? null : event.currentTarget);
  }
  function handleSettingsPopoverClose(event, reason) {
    setAnchorSettingsEl(null);
  }
  // api call will be made which will return the url to be passeḍ

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: { sm: 900, md: 1000, lg: 1500, xl: 2400 },
        padding: { sm: 1, md: 2, lg: 3, xl: 4 },
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderRadius: 1 }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "30px", color: "text.primary" }}>
            {" "}
            Teams{" "}
          </Typography>
          <IconButton
            id="home-profile-popover-button"
            onClick={handleProfilePopoverClick}
            sx={IconButtonStyle}
          >
            {" "}
            <GroupIcon />{" "}
          </IconButton>
          <ProfilePopover
            anchorEl={anchorProfileEl}
            handleClose={handleProfilePopoverClose}
            handleSignOut={handleSignOut}
          />
          <IconButton
            type="button"
            onClick={(e) => {
              handleSettingsPopoverClick(e);
            }}
            sx={IconButtonStyle}
            //  aria-haspopup="true"
            //   aria-label="Settings"
          >
            {" "}
            <MoreHorizIcon />{" "}
          </IconButton>
          <SettingsPopover
            anchorEl={anchorSettingsEl}
            handleClose={handleSettingsPopoverClose}
          />
        </Stack>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          gap={5}
          sx={{ fontSize: "1.5rem", minHeight: "32px" }}
        >
          {TabsArray.map((item, index) => {
            return (
              <Tab
                sx={{
                  borderRadius: "0px",
                  "&:active": { borderRadius: "0px" },
                  fontSize: "1.5rem",
                  minHeight: "32px",
                }}
                icon={item.icon}
                iconPosition="start"
                tabIndex={0}
                key={index}
                label={item.label}
                value={item.label}
                size={48}
              />
            );
          })}
        </Tabs>
      </AppBar>
      <Box
        sx={{
          minHeight: "80vh",
          p: { sm: 1, md: 2, lg: 3, xl: 4 },
          fontColor: "black",
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
}
