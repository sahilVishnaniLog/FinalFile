import React, { useState, useEffect } from "react";
import BackgroundImage from "../theme/BackgroundImage.jsx";

import {
  Popover,
  Typography,
  Stack,
  IconButton,
  Button,
  Link,
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Grid,
  Paper,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { GoLinkExternal } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { useTheme } from "../theme/ThemeContext.jsx";
import backgroundColors from "../assets/backgroundColors.js"; // color background data from assets
// possible queries  for searching the Unsplash API calls
const PossibleQueries = [
  "landscape",
  "mountains",
  "ocean",
  "forest",
  "city",
  "night sky",
  "galaxies",
  "valley",
  "sunset",
  "animals",
];

export default function BackgroundPopover({ anchorEl, handleClose }) {
  const {
    modeChoice,

    backgroundColor,
    setBackgroundColor,
  } = useTheme();
  const [isSearchMounted, setSearchMounted] = useState(false);

  // states for the autocomplete search bar
  const [query, setQuery] = useState("background");
  const [inputValue, setInputValue] = useState("");

  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log("background popover mounted");

    return () => {
      setSearchMounted(false);
      console.log("background popover unmounted");
    };
  }, [open]);

  const handleBackgroundColorSelect = (event) => {
    console.log(event.target.value);
    setBackgroundColor(event.target.value);
  };

  return (
    <Popover
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      disableEnforceFocus
      slotProps={{
        paper: {
          onClick: (event) => event.stopPropagation(),
          sx: {
            pointerEvents: "auto",
            position: "relative",
            overflow: "scroll",
            overflowX: "hidden",
            width: `${550 / 1.36}px `,
            height: `${675 / 1.36}px`,
            bgcolor: "backgroun.paper",
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
      <Stack direction="row">
        <Typography
          sx={{ fontWeight: "bold", marginTop: "1rem", color: "text.primary" }}
        >
          {" "}
          Space background{" "}
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: "1rem", right: "1rem" }}
          onClick={handleClose}
        >
          {" "}
          <CloseIcon />{" "}
        </IconButton>
      </Stack>
      <Stack
        padding="0.7rem"
        direction="row"
        justifyContent="space-between"
        height="30px"
      >
        <Typography sx={{ fontSize: "0.8rem", color: "text.tertiary" }}>
          PHOTOS BY{" "}
          <Link
            target="_blank"
            href={"https://unsplash.com/"}
            sx={{ textDecoration: "none" }}
          >
            {" "}
            UNSPLASH <GoLinkExternal />
          </Link>
        </Typography>
        <Button
          startIcon={isSearchMounted ? <CloseIcon /> : <IoMdSearch />}
          onClick={() => setSearchMounted(!isSearchMounted)}
          variant="outlined"
          sx={{ height: "24px", width: "100px" }}
        >
          {isSearchMounted ? "Close" : "Search"}
        </Button>
      </Stack>
      <Box sx={{ height: "10px" }} />
      {isSearchMounted && (
        <Autocomplete
          freeSolo //BUG
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setQuery(inputValue || "landscape");
            }
          }}
          fullWidth
          options={PossibleQueries}
          value={query}
          onChange={(event, newValue) => setQuery(newValue) || "landscape"} // BUG
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)} //BUG
          renderInput={(params) => <TextField {...params} label="search" />}
          placeholder="Search"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <IoMdSearch />{" "}
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      <BackgroundImage query={query} setQuery={setQuery} /> {/*COMPONENT */}
      <Stack direction="row" justifyContent="space-between">
        {" "}
        <Button
          disabled={true}
          variant="standard"
          startIcon={<ArrowBackIosIcon />}
        >
          {" "}
          Previous
        </Button>
        <Button variant="standard" endIcon={<ArrowForwardIosIcon size="24" />}>
          {" "}
          Next
        </Button>{" "}
      </Stack>
      <Typography paddingLeft="1rem" color="text.secondary" fontWeight="bold">
        COLORS
      </Typography>
      <FormControl>
        <RadioGroup
          value={backgroundColor}
          onChange={handleBackgroundColorSelect}
        >
          <Grid container spacing={2} bgcolor="transparent" padding={2}>
            {backgroundColors(modeChoice).map((item) => (
              <FormControlLabel
                key={item.label}
                value={item.background}
                control={<Radio sx={{ display: "none" }} />}
                label={
                  <Tooltip key={item.label} title={item.label}>
                    <Paper
                      sx={{
                        width: 40,
                        height: 40,
                        background: item.background,
                        border:
                          backgroundColor === item.background
                            ? `4px solid ${
                                modeChoice === "dark" ? "#fff" : "#000"
                              }`
                            : "none",
                        "&:hover": {
                          border: `2px solid ${
                            modeChoice === "dark" ? "#fff" : "#000"
                          }`,
                        },
                      }}
                    ></Paper>
                  </Tooltip>
                }
              />
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Popover>
  );
}
