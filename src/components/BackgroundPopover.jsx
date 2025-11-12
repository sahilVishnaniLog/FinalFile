import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoLinkExternal } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { SearchBarBackground } from "./component.js";

const DummyImagArray = [
  {
    label: "Misty Mountains",
    url: "https://picsum.photos/id/1018/800/600.jpg",
  },
  {
    label: "Calm Lake",
    url: "https://picsum.photos/id/1015/800/600.jpg",
  },
  {
    label: "Forest Path",
    url: "https://picsum.photos/id/1016/800/600.jpg",
  },
  {
    label: "City at Night",
    url: "https://picsum.photos/id/102/800/600.jpg",
  },
  {
    label: "Laptop on Desk",
    url: "https://picsum.photos/id/103/800/600.jpg",
  },
  {
    label: "Lone Tree",
    url: "https://picsum.photos/id/1040/800/600.jpg",
  },
  {
    label: "Ocean Pier",
    url: "https://picsum.photos/id/1043/800/600.jpg",
  },
  {
    label: "Dog in Snow",
    url: "https://picsum.photos/id/237/800/600.jpg",
  },
];
export default function BackgroundPopover({ anchorEl, handleClose }) {
  const [isSearchMounted, setSearchMounted] = useState(false);

  const open = Boolean(anchorEl);
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
        <TextField
          fullWidth
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
        sx={{ height: `${160 / 1.36}px`, width: "100%" }}
        cols={4}
        rowHeight={75 / 1.36}
      >
        <ImageListItem sx={{ borderRadius: "2px" }}></ImageListItem>
      </ImageList>
    </Popover>
  );
}
