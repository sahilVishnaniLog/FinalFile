import React, { useState, useEffect } from "react";
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
];
const DummyImagArray = [
  {
    id: 1,
    alt_description: "Misty Mountains",
    urls: { regular: "https://picsum.photos/id/1018/800/600.jpg" },
  },
  {
    id: 2,
    alt_description: "Calm Lake",
    urls: { regular: "https://picsum.photos/id/1015/800/600.jpg" },
  },
  {
    id: 3,
    alt_description: "Forest Path",
    urls: { regular: "https://picsum.photos/id/1016/800/600.jpg" },
  },
  {
    id: 4,
    alt_description: "City at Night",
    urls: { regular: "https://picsum.photos/id/102/800/600.jpg" },
  },
  {
    id: 5,
    alt_description: "Laptop on Desk",
    urls: { regular: "https://picsum.photos/id/103/800/600.jpg" },
  },
  {
    id: 6,
    alt_description: "Lone Tree",
    urls: { regular: "https://picsum.photos/id/1040/800/600.jpg" },
  },
  {
    id: 7,
    alt_description: "Ocean Pier",
    urls: { regular: "https://picsum.photos/id/1043/800/600.jpg" },
  },
  {
    id: 8,
    alt_description: "Dog in Snow",
    urls: { regular: "https://picsum.photos/id/237/800/600.jpg" },
  },
];
const defaultBackground = {
  id: 459,
  alt_description: "Misty Mountains",
  urls: {
    regular:
      "https://images.unsplash.com/photo-1552394459-917cbbffbc84?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlzdHklMjBtb3VudGFpbnxlbnwwfHwwfHx8MA%3D%3D",
  },
};

export default function BackgroundPopover({ anchorEl, handleClose }) {
  const { modeChoice, backgroundColor, setBackgroundColor } = useTheme();
  const [isSearchMounted, setSearchMounted] = useState(false);

  // states for the autocomplete search bar
  const [query, setQuery] = useState("background");
  const [inputvValue, setInputValue] = useState("");

  const [chosenBackground, setChosenBackground] = useState(
    defaultBackground.urls.regular
  );

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
  const handleBackgroundImageSelect = (event) => {
    console.log(event.target.value);
    setChosenBackground(event.target.value);
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
        <Typography sx={{ fontWeight: "bold", marginTop: "1rem" }}>
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
        <Typography sx={{ fontSize: "0.8rem" }}>
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
        >
          {isSearchMounted ? "Close" : "Search"}
        </Button>
      </Stack>
      {isSearchMounted && (
        <Autocomplete
          freeSolo
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          fullWidth
          options={PossibleQueries}
          value={query}
          onChange={(event) => setQuery(event.target.value) || "landscape"}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => <TextField {...params} label="search" />}
          placeholder="Search"
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
      <FormControl>
        <RadioGroup
          value={chosenBackground}
          onChange={handleBackgroundImageSelect}
        >
          <ImageList
            variant="standard"
            sx={{
              height: "auto",
              width: "auto",
              overflow: "visible",

              marginLeft: "1.5rem",

              // borderRadius: "2px",
            }}
            gap={8}
            cols={4}
          >
            {DummyImagArray.map((item) => (
              <FormControlLabel
                sx={{
                  "&.Mui-checked": {
                    "& img": {
                      border: "3px solid primary.main",
                      boxShadow: "0 8px 160x rgba(25,118,210,0.4)",
                      transform: "scale(1.02)",
                    },
                  },
                }}
                key={item.id}
                value={item.urls.regular}
                control={<Radio sx={{ display: "none" }} />}
                label={
                  <Box>
                    <ImageListItem
                      sx={{
                        overflow: "visible",
                        width: "100% !important",
                        padding: 0,
                        cursor: "pointer",
                      }}
                      key={item.id}
                    >
                      <Box
                        component="img"
                        src={item.urls.regular}
                        alt={item.title}
                        loading="lazy"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",

                          borderRadius: "5px",
                          // border: "2px solid black",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          transform: "scale(1.02)",
                        }}
                      />
                      <ImageListItemBar
                        title={item.alt_description}
                        position="bottom"
                        sx={{
                          borderBottomLeftRadius: "5px",
                          borderBottomRightRadius: "5px",
                          overflow: "hidden",

                          "& .MuiImageListItemBar-root": {
                            width: "100% !important",
                            margin: "0 !important",
                            padding: "0 !important",
                          },
                          "& .MuiImageListItemBar-titleWrap": {
                            padding: "0  4px",
                            maxHeight: "1rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            bgcolor: "transparent",
                          },
                          "& .MuiImageListItemBar-title": {
                            fontSize: "0.65rem",
                            fontWeight: 300,
                            lineHeight: "1rem",
                          },
                          background: "rgba(0,0,0,0.3) ",
                        }}
                      />
                    </ImageListItem>
                  </Box>
                }
              />
            ))}
          </ImageList>
        </RadioGroup>
      </FormControl>
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
      <Typography paddingLeft="1rem">COLORS</Typography>

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
