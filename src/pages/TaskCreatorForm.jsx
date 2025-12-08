import {
  Container,
  IconButton,
  Badge,
  Chip,
  SvgIcon,
  AppBar,
  Toolbar,
  Button,
  Stack,
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Paper,
  Tooltip,
  Avatar,
} from "@mui/material";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";

import FullScreenButton from "../utils/FullScreenButton.jsx";
import InlineTextField from "../utils/InlineTextField.jsx";
import { SplitterX, SplitterY } from "../utils/Splitter.jsx";
import { VscSourceControl } from "react-icons/vsc";
import { LuGitCommitVertical } from "react-icons/lu";
const DummyChipData = { projectTitle: "MBA-6", projectType: "Request" };

const DummyViewers = 10;

import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import { workTypeIconMap } from "./kanbanBoard/KanbanIconMap.jsx";
import { Maximize2, X } from "lucide-react";

const User = () => {
  let userJSON = localStorage.getItem("user-info");
  let userObject = userJSON ? JSON.parse(userJSON) : null;
  return userObject;
};
const handleFullScreen = () => {
  if (isFullScreen) {
    document.exitFullscreen();
  }
};

export default function TaskCreatorForm({ setOpen }) {
  return (
    <Container bgcolor="rgba( f, f, f,1)">
      <AppBar
        position="static"
        bgcolor="transparent"
        color="text.secondary"
        elevation={0}
        width="1500px"
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "transparent",
            width: "1400px",
          }}
        >
          <Chip
            label={DummyChipData.projectTitle}
            color="transparent"
            icon={workTypeIconMap(DummyChipData.projectType)}
          />
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button startIcon={<VisibilityIcon />}>{DummyViewers} </Button>
            <SvgIcon></SvgIcon>
            <IconButton>
              <ShareIcon />{" "}
            </IconButton>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
            <FullScreenButton />

            <IconButton
              onClick={(e) => {
                e.preventDefault;
                setOpen(false);
              }}
            >
              <X size={28} strokeWidth={2.25} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        sx={{ padding: 2, mt: 2 }}
      >
        <Box></Box>
        <Box>
          <Stack
            direction="column "
            spacing={1.5}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Button
            // anchor for a popover
            ></Button>
            <Paper
              elevation
              sx={{ padding: 2, width: "1400px", height: "80vh" }}
            >
              <SplitterX
                totalSize="100%"
                initialPrimarySize={450}
                minSize={150}
                maxSize={1000}
              >
                <Box class="Splitter-panel1" sx={{}}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "text.secondary",
                      }}
                    >
                      Details
                    </Typography>

                    <IconButton>
                      <SettingsIcon /> {/*naked Settings Icon */}
                    </IconButton>
                  </Stack>
                  <Tooltip title="Task Title" placement="top">
                    {" "}
                  </Tooltip>
                  <InlineTextField
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "text.tertiary",
                    }}
                  />
                  <Accordion
                    disableGutters
                    elevation={0}
                    sx={{
                      backgroundColor: "transparent", // Makes the background see-through
                      border: "none", // Removes border (if using variant="outlined")
                      boxShadow: "none", // Removes the drop shadow
                      "&:before": {
                        display: "none", // Removes the default line above the accordion
                      },
                    }}
                  >
                    <AccordionSummary sx={{ p: 0 }}>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fosntWeight: "bold",
                          color: "text.secondary",
                        }}
                      >
                        Description
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                      <InlineTextField
                        multiline
                        sx={{ fontSize: "0.8rem", color: "text.tertiary" }}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "text.secondary",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    Subtasks{" "}
                  </Typography>
                  <InlineTextField></InlineTextField>

                  <Stack direction="row"></Stack>
                </Box>
                <Box class="Splitter-panel2">
                  <Stack direction="row" jusitfyContent="space-between">
                    <Button>In Progress</Button>
                    <Button>
                      <Tooltip title="Automation">
                        <IconButton>
                          <AutoModeOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Button>
                  </Stack>
                  <Accordion>
                    <AccordionSummary>
                      <Typography>Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack
                        direction="column"
                        spacing={2}
                        alignItems="flex-start"
                        justifyContent="center"
                      >
                        <Typography>Assignee</Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          <Avatar></Avatar>
                          <Typography>
                            {" "}
                            {User().firstName + " " + User().lastName}{" "}
                          </Typography>
                        </Stack>
                        <Button variant="standard" sx={{ color: "primary" }}>
                          assign to me
                        </Button>
                        <Typography color="text.primary"> Priority</Typography>
                        <Typography color="text.secondary"> None</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography color="text.primary"> Parent</Typography>
                        <Typography color="text.secondary">
                          Add parent"{" "}
                        </Typography>
                        {/* this will be a InlineMulitpleSelect field  */}
                        <Typography color="text.primary"> Due date </Typography>
                        <Typography color="text.secondary"> None </Typography>
                        {/* will be calender to choose date from the calendar  */}
                        <Typography color="text.primary"> Labels</Typography>
                        <Typography color="text.secondary">
                          {" "}
                          Add labels{" "}
                        </Typography>
                        {/* this will be a dynamic field to add labels */}
                        <Typography color="text.primary"> Team</Typography>
                        <Typography color="text.secondary">
                          {" "}
                          Add member{" "}
                        </Typography>
                        {/* this will be a dynamic field to add labels */}
                        <Typography color="text.primary">
                          {" "}
                          Start date{" "}
                        </Typography>
                        <Typography color="text.secondary"> none </Typography>
                        {/* this will be a dynamic field to add labels */}
                        <Accordion>
                          <AccordionSummary>Development</AccordionSummary>
                          <AccordionDetails>
                            <Accordion>
                              <AccordionSummary>
                                <Stack direction="row" spacing={3}>
                                  <VscSourceControl />
                                  <Typography color="primary.main">
                                    Create branch
                                  </Typography>
                                </Stack>
                              </AccordionSummary>
                              <AccordionDetails>
                                <h4>this hides the create Branch functions</h4>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion>
                              <AccordionSummary>
                                <Stack direction="row" spacing={3}>
                                  <LuGitCommitVertical />

                                  <Typography color="primary.main">
                                    Create commit
                                  </Typography>
                                </Stack>
                              </AccordionSummary>
                              <AccordionDetails>
                                <h4>this hides the create commit functions</h4>
                              </AccordionDetails>
                            </Accordion>
                          </AccordionDetails>
                        </Accordion>

                        <Box sx={{ flexGrow: 1 }} />

                        <Typography size={"1.2rem"}>Reporter</Typography>
                        <Stack
                          direction="row"
                          spacing={3}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Avatar></Avatar>
                          <Typography>
                            {User().firstName + " " + User().lastName}
                          </Typography>
                        </Stack>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </SplitterX>
            </Paper>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
