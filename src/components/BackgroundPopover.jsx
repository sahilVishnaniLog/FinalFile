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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoLinkExternal } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";

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
export default function BackgroundPopover({ anchorEl, handleClose }) {
  const [isSearchMounted, setSearchMounted] = useState(false);

  // states for the autocomplete search bar
  const [query, setQuery] = useState("background");
  const [inputvValue, setInputValue] = useState("");
  const [selectedBG, setSelectedBG] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log("background popover mounted");

    return () => {
      setSearchMounted(false);
      console.log("background popover unmounted");
    };
  }, [open]);
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
            width: `${500 / 1.36}px `,
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
      <ImageList
        variant="standard"
        sx={{
          height: "auto",
          width: "100%",
          overflow: "visible",

          // borderRadius: "2px",
        }}
        gap={8}
        cols={4}
      >
        {DummyImagArray.map((item) => (
          <ImageListItem
            sx={{
              overflow: "visible",
              width: "100% !important",
              padding: 0,
              cursor: "pointer",
            }}
            key={item.id}
            onClick={() => setSelectedBG(item.id)}
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
                border: "2px solid black",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
            {/* <img
                width="100%"
                height="100%"
                objectFit="cover"
                srcSet={`${item.urls.regular}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.urls.regular}?w=164&h=164&fit=crop&auto=format`}
                alt={item.alt_description}
                loading="lazy"
              /> */}
          </ImageListItem>
        ))}
      </ImageList>
    </Popover>
  );
}
