import { useState, useEffect, useRef } from "react";
import { db } from "../Auth/firebaseConfig"; // NOTE: this to add the task to database
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

/**  
* @param  { string} uid -  Uid  will come from the localStorage of the user and the submission of the form will be triggered by the unmount of this component
* @param  { string} category -  which column of kanban board it belongs to 

=> From panel2 : 
* @param { string } TaskTitle -  
* @param { string } TaskDescription 
* @param { string } TaskType 
* @param { Date}  DueDate 
* @param { Date } startDate
* @param { boolean } resolution 
* @param { boolean } assigned 
* @param { Array } Team 

=> FROM appbar : Priority , projectid 
* @param { string } Priority 
* @param { string } ProjectId
=> FROM panel1 : 
* @param { string } title 
* @param { string } description

  */

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
  Select,
  MenuItem,
  FormControl,
  ClickAwayListener,
} from "@mui/material";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import InlineMultiChipSelect from "../utils/InlineMultiChipSelect.jsx";
import FullScreenButton from "../utils/FullScreenButton.jsx";
import InlineTextField from "../utils/InlineTextField.jsx";
import InlineDatePicker from "../utils/InlineDatePicker.jsx";
import { SplitterX } from "../utils/Splitter.jsx";
import { VscSourceControl } from "react-icons/vsc";
import { LuGitCommitVertical } from "react-icons/lu";

import dayjs from "dayjs";

const DummyChipData = { projectTitle: "MBA-6", projectType: "Request" };

const DummyViewers = 10;
const PriorityArray = ["Highest", "High", "Medium", "Low", "Lowest"];
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CapitalizeFirstLetter from "../utils/CapitalizeFirstletter.js";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  workTypeIconMap,
  PriorityIconMap,
} from "./kanbanBoard/KanbanIconMap.jsx";
import { Maximize2, X } from "lucide-react";
import { UserData } from "../assets/KanbanInitialData.js";
import { ConstructionOutlined } from "@mui/icons-material";

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

export default function TaskCreatorForm({ setOpen, columnId, columnTitle }) {
  const formRef = (useRef = useRef(null));
  const [priority, setPriority] = useState(""); //
  const [isEditingPriority, setIsEditingPriority] = useState(true);
  const [workType, setWorkType] = useState("");
  const [isEditingWorkType, setIsEditingWorkType] = useState(false);
  const [isAssigned, setIsAssigned] = useState(true);
  const [isResolved, setIsResolved] = useState(false);

  const [selectdMembers, setSelectedMembers] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [team, setTeam] = useState([]);
  const [createdOn, setcreatedOn] = useState(
    dayjs.tz(new Date().toLocaleDateString())
  );
  const [lastUpdated, setLastUpdated] = useState(
    dayjs.tz(new Date().toLocaleDateString())
  );

  const [dueDate, setDueDate] = useState(dayjs.tz("2025-12-18")); // state for due date

  const handleChangeAtDatePicker = (newValue) => {
    setDueDate(newValue);
    alert(newValue.format("YYYY-MM-DD")); //DEBUG: print the selcted date
  };
  const handleChipChange = (data) => {
    console.log("Data received in Parents:", data);
    setSelectedMembers(data);
  };

  useEffect(() => {
    // will contain the logic to pull the data from the database firestore and populate the  fields of the form

    return () => {
      // will contain the logic to save the lastUpdated date to remember when the task was last updated and will ave the SET request to the firestore
      const unmountTimeStamp = new Date().toISOString();
      setLastUpdated(dayjs.tz(unmountTimeStamp));
      //
      //addDoc(collection(db, "tasks"));
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const formDataObject = Object.fromEntries(formData);

        console.log(formDataObject);
      }
    };
  }, []);
  return (
    <Container bgcolor="rgba( 255, 255, 255,0.61)">
      <form
        ref={formRef}
        id="taskCreator-form"
        onSubmit={(e) => e.preventDefault}
      >
        <AppBar
          position="static"
          bgcolor="transparent"
          color="text.secondary"
          elevation={0}
          width="94%"
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
              width: "100%",
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
                  initialPrimarySize={900}
                  minSize={150}
                  maxSize={1000}
                >
                  <Box className="Splitter-panel1" sx={{}}>
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
                      id="outlined-basic"
                      name="taskCreatorForm-TaskTitle"
                      value={taskTitle}
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
                          id="taskCreatorForm-TaskDescription" // onBlur the submission will be triggered to the firstore task->description field
                          value={taskDescription}
                          name="taskCreatorForm-TaskDescription"
                          multiline
                          sx={{
                            fontSize: "0.8rem",
                            color: "text.tertiary",
                            width: "90%",
                          }}
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
                    <InlineTextField id="taskCreatorForm-SubtaskArray"></InlineTextField>

                    <Stack direction="row"></Stack>
                  </Box>
                  <Box
                    className="Splitter-panel2"
                    sx={{ overflowY: "scroll", height: "100%" }}
                  >
                    <Stack direction="row" jusitfyContent="space-between">
                      <Button sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                        {columnTitle}{" "}
                      </Button>
                      <Box sx={{ flexGrow: 1 }}> </Box>
                      <Button>
                        <Tooltip title="Automation">
                          <IconButton>
                            <AutoModeOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Button>
                    </Stack>
                    <Accordion defaultExpanded>
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
                              {CapitalizeFirstLetter(User().firstName) +
                                " " +
                                CapitalizeFirstLetter(User().lastName)}{" "}
                            </Typography>
                          </Stack>
                          <Button
                            variant="contained"
                            elevation={0}
                            color={isAssigned ? "info" : "success"}
                            onClick={() => setIsAssigned(!isAssigned)}
                          >
                            {isAssigned ? "Assign to me" : "Assigned"}
                          </Button>
                          <Stack
                            direction="row"
                            sx={{
                              width: "80%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography color="text.primary">
                              {" "}
                              Priority
                            </Typography>

                            {isEditingPriority ? (
                              <Box
                                sx={{ minWidth: 200 }}
                                //onClick={(event) => event.stopPropagation()}
                              >
                                <FormControl fullWidth>
                                  <Select
                                    autoFocus // focuses when rendered
                                    // open={true}
                                    variant="outlined"
                                    id="one"
                                    value={priority}
                                    onChange={(e) => {
                                      setPriority(e.target.value);
                                      setIsEditingPriority(false);
                                    }}
                                    onClose={() => setIsEditingPriority(false)}
                                  >
                                    {PriorityArray.map((item) => {
                                      return (
                                        <MenuItem value={item} key={item}>
                                          <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            justifyContent="flex-start"
                                          >
                                            {PriorityIconMap(item)}
                                            <Typography> {item} </Typography>
                                          </Stack>
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                              </Box>
                            ) : (
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent="flex-start"
                                onClick={() => setIsEditingPriority(true)}
                              >
                                {PriorityIconMap(priority)}
                                <Typography
                                  color="text.secondary"
                                  sx={{ ml: 1 }}
                                >
                                  {priority || "Select..."}{" "}
                                </Typography>
                              </Stack>
                            )}
                          </Stack>

                          <Box sx={{ flexGrow: 1 }} />
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: "space-between",
                              width: "80%",
                            }}
                          >
                            <Typography color="text.primary">
                              {" "}
                              Parent
                            </Typography>
                            <Typography color="text.secondary">
                              Add parent"{" "}
                            </Typography>
                          </Stack>
                          {/* this will be a InlineMulitpleSelect field  */}
                          <Stack
                            direction="row"
                            width="80%"
                            sx={{
                              justifyContent: "space-between",
                              alignItemms: "center",
                            }}
                          >
                            <Typography color="text.primary">
                              {" "}
                              Due date{" "}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}> </Box>
                            {/* another library for the time selector date-fns  */}
                            <InlineDatePicker id="taskCreatorForm-DueDate" />
                          </Stack>

                          {/* will be calender to choose date from the calendar  */}
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: "space-between",
                              width: "80%",
                            }}
                          >
                            <Typography color="text.primary">
                              {" "}
                              Labels
                            </Typography>
                            <Typography color="text.secondary">
                              {" "}
                              Add labels{" "}
                            </Typography>
                          </Stack>
                          {/* this will be a dynamic field to add labels */}
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: "space-between",
                              width: "80%",
                            }}
                          >
                            <Typography color="text.primary"> Team</Typography>
                            <InlineMultiChipSelect
                              menuOptions={UserData}
                              onSelectionChange={handleChipChange}
                            />
                          </Stack>
                          {/* this will be a dynamic field to add labels */}
                          <Stack
                            direction="row"
                            width="80%"
                            sx={{
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography color="text.primary">
                              Start date
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <InlineDatePicker id="taskCreatorForm-startDate" />
                          </Stack>

                          {/* this will be a dynamic field to add labels */}

                          <Accordion
                            elevation={0}
                            defaultExpanded
                            disableGutters
                            sx={{
                              backgroundColor: "transparent",
                              margin: "0",
                              padding: "0",
                              border: "none",
                              boxShadow: "none",
                              "&:before": {
                                display: "none",
                              },
                            }}
                          >
                            <AccordionSummary
                              sx={{
                                fontSize: "1rem",
                                padding: "0",
                                margin: "0",
                              }}
                            >
                              Development
                            </AccordionSummary>
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
                                  <h4>
                                    this hides the create Branch functions
                                  </h4>
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
                                  <h4>
                                    this hides the create commit functions
                                  </h4>
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
                              {CapitalizeFirstLetter(User().firstName) +
                                " " +
                                CapitalizeFirstLetter(User().lastName)}
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
      </form>
    </Container>
  );
}
