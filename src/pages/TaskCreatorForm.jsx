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
} from "@mui/material";

import FullScreenButton from "../utils/FullScreenButton.jsx";
import InlineTextField from "../utils/InlineTextField.jsx";
import { SplitterX, SplitterY } from "../utils/Splitter.jsx";

const DummyChipData = { projectTitle: "MBA-6", projectType: "Request" };

const DummyViewers = 10;

import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import { workTypeIconMap } from "./kanbanBoard/KanbanIconMap.jsx";
import { Maximize2, X } from "lucide-react";

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
                  <div> this is the second panel </div>
                </Box>
              </SplitterX>
            </Paper>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
