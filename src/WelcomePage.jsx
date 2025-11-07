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
} from "@mui/material";

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
  bgcolor: "white",
  border: "2px grey solid ",
  borderRadius: "20%",
  color: "black",
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

  return (
    <>
      <Container
        sx={{
          bgcolor: "#233629",
          height: "100%",
          width: "100%",
          maxWidth: { sm: 700, md: 900, lg: 1500, xl: 2400 },
          padding: { sm: 1, md: 2, lg: 3, xl: 4 },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "30px", color: "white" }}>
            {" "}
            Teams{" "}
          </Typography>
          <IconButton
            id="home-profile-popover-button"
            ref={buttonProfilePopoverRef}
            sx={IconButtonStyle}
          >
            {" "}
            <GroupIcon />{" "}
          </IconButton>
          <IconButton id="homeBackgroundPopoverButton" sx={IconButtonStyle}>
            {" "}
            <MoreHorizIcon />{" "}
          </IconButton>
        </Stack>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          {TabsArray.map((item, index) => {
            return (
              <Tab
                sx={{
                  color: "white",
                  borderRadius: "0px",
                  "&:active": { borderRadius: "0px" },
                }}
                icon={item.icon}
                iconPosition="start"
                tabIndex={0}
                key={index}
                label={item.label}
                value={item.label}
              />
            );
          })}
        </Tabs>
        <Divider sx={{ borderBottomWidth: 3, bgcolor: "white" }} />
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
      <div> this is the welcome page to the site </div>
      <div sx={{ dislay: "flex", flexDirection: "row", gap: "10px" }}>
        <button onClick={handleSignOut} type="submit">
          {" "}
          SignOut{" "}
        </button>
        <button> LEFT</button>

        <button> RIGHT </button>
      </div>
    </>
  );
}
