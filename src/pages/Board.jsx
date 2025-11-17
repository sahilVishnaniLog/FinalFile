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
} from "@mui/material";
import { MdOutlineSearch } from "react-icons/md";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { LuChartSpline } from "react-icons/lu";
import { RiListSettingsLine } from "react-icons/ri";
import { RadioGroupPopover } from "../components/component.js";
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
  );
}
