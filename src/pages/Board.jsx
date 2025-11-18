import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  AvatarGroup,
  Avatar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Container,
  Paper,
  Box,
  Divider,
  Chip,
  Card,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import { MdOutlineSearch } from "react-icons/md";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { LuChartSpline } from "react-icons/lu";
import { RiListSettingsLine } from "react-icons/ri";
import { RadioGroupPopover } from "../components/component.js";

const KanbanBoardLists = [
  {
    id: 1,
    title: "Complete",
    chipColor: "success",

    tasks: [
      {
        id: 1,
        title: "FLOWCHARTS",
        status: "Ready",
        description: "first test for  the card",
      },
      {
        id: 2,
        title: "FLOWCHARTS",
        status: "Dormant",
        description: "first test for  the card",
      },
      {
        id: 3,
        title: "FLOWCHARTS",
        status: "Active",
        description: "first test for  the card",
      },
      {
        id: 4,
        title: "FLOWCHARTS",
        status: "Inactive",
        description: "first test for  the card",
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    chipColor: "error",

    tasks: [
      {
        id: 1,
        title: "FLOWCHARTS",
        description: "first test for  the card",
        status: "Ready",
      },
      {
        id: 2,
        title: "FLOWCHARTS",
        description: "first test for  the card",

        status: "Dormant",
      },
      {
        id: 3,
        title: "FLOWCHARTS",
        description: "first test for  the card",
        status: "Active",
      },
    ],
  },
  {
    id: 3,
    title: "To Do",
    chipColor: "disabled",

    tasks: [
      { id: 1, title: "FLOWCHARTS", description: "first test for  the card" },
      { id: 2, title: "FLOWCHARTS", description: "first test for  the card" },
      { id: 3, title: "FLOWCHARTS", description: "first test for  the card" },
    ],
  },
];
const ChipColors = (status) => {
  switch (status) {
    case "Ready":
      return "#498563";
    case "Active":
      return "#4173a8";
    case "Inactive":
      return "#972a2aff";
    case "Dormant":
      return "#7d7d7d";
  }
};
export default function Board() {
  const [anchorRadioGroupEl, setAnchorRadioGroupEl] = useState(null);
  const [choosenValueRadioGroup, setChoosenValueRadioGroup] = useState("");

  function handleRadioGroupPopoverClick(event) {
    event.preventDefault();
    setAnchorRadioGroupEl(anchorRadioGroupEl ? null : event.currentTarget);
  }
  function handleRadioGroupPopoverClose(event) {
    setAnchorRadioGroupEl(null);
  }
  return (
    <>
      <AppBar
        elevation={3}
        position="static" // or 'fixed'
        sx={{ backgroundColor: "transparent" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineSearch />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Search board"
            />

            <AvatarGroup
              max={2}
              total={2}
              sx={{ backgroundColor: "transparent" }}
            >
              <Avatar alt="Sahil Vishnani" size="small" />
              <Avatar alt="Other user" />
            </AvatarGroup>
            <IconButton
              sx={{
                border: "3px solid rgba(0, 0,0 , 0.3)",
                borderRadius: "5px",
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Stack>
          <Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={handleRadioGroupPopoverClick}
                sx={{
                  border: "3px solid rgba(0, 0,0 , 0.3)",
                  borderRadius: "5px",
                }}
                endIcon={
                  choosenValueRadioGroup === "none" || null ? (
                    <KeyboardArrowDownOutlinedIcon />
                  ) : null
                }
                color="inherit"
              >
                Group{" "}
                {choosenValueRadioGroup === "none" || null ? chosenValue : ""}
              </Button>

              <RadioGroupPopover
                anchorEl={anchorRadioGroupEl}
                handleClose={handleRadioGroupPopoverClose}
                choosenRadio={choosenValueRadioGroup}
                setChosenRadio={setChoosenValueRadioGroup}
              />
              <IconButton
                sx={{
                  border: "3px solid rgba(0, 0,0 , 0.3)",
                  borderRadius: "5px",
                }}
              >
                <LuChartSpline />
              </IconButton>
              <IconButton
                sx={{
                  border: "3px solid rgba(0, 0,0 , 0.3)",
                  borderRadius: "5px",
                }}
              >
                {" "}
                <RiListSettingsLine />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Divider
        sx={{ borderColor: "background.neutral", borderMargin: "1rem" }}
      />
      <Container sx={{ background: "transparent" }}>
        <Stack direction="row" spacing={2}>
          {KanbanBoardLists.map((list) => {
            return (
              <Paper
                key={list.id}
                sx={{
                  backgroundImg: "board.paper",
                  width: `${368 / 13.6}rem`,
                  height: "fit-content",
                  padding: "1rem",
                }}
              >
                <Stack spacing="1rem">
                  <AppBar
                    sx={{
                      background: "transparent",
                      color: "text.primary",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      position: "static",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {list.title}
                    </Typography>
                    <Chip>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {list.tasks.length} OF {list.tasks.length}
                      </Typography>
                    </Chip>
                  </AppBar>

                  {list.tasks.map((task) => {
                    return (
                      <Card
                        key={task.id}
                        sx={{
                          bgcolor: "board.card",
                          padding: "1rem",
                          margin: "0rem",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          {task.title}
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {task.description}
                        </Typography>
                        <Chip
                          color={ChipColors(task.status)}
                          label={task.status}
                        />
                      </Card>
                    );
                  })}
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Container>
    </>
  );
}
