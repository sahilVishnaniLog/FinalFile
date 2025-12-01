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
} from "@mui/material";
const DummyChipData = { projectTitle: "MBA-6", projectType: "Request" };
const isFullScreen = false;
const DummyViewers = 10;
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import { workTypeIconMap } from "./kanbanBoard/KanbanIconMap.jsx";
import { Maximize2, X } from "lucide-react";

export default function TaskCreatorForm() {
  return (
    <Container>
      <AppBar
        position="static"
        bgcolor="transparent"
        color="text.secondary"
        elevation={0}
        width="100%"
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "transparent",
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
            <IconButton>
              {isFullScreen ? <CloseFullscreenIcon /> : <Maximize2 />}{" "}
            </IconButton>

            <IconButton>
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
            <Accordion>
              <AccordionSummary>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    Details
                  </Typography>
                  <IconButton>
                    <SettingsIcon /> {/*naked Settings Icon */}
                  </IconButton>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row"></Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
