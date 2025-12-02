import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext.jsx";

import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
const defaultBackground = {
  id: 459,
  alt_description: "Misty Mountains",
  urls: {
    regular:
      "https://images.unsplash.com/photo-1552394459-917cbbffbc84?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlzdHklMjBtb3VudGFpbnxlbnwwfHwwfHx8MA%3D%3D",
  },
};

export default function BackgroundImage({ query, setQuery }) {
  const { backgroundImg, setBackgroundImg } = useTheme();
  const [chosenBackgroundImg, setChosenBackgroundImg] = useState(
    defaultBackground.urls.regular
  );
  const [backgroundImagesAPI, setBackgroundImagesAPI] = useState([]);
  const [errorAPI, setErrorAPI] = useState(null);
  const [loadingAPI, setLoadingAPI] = useState(true);

  const handleBackgroundImageSelect = (event) => {
    console.log(event.target.value);
    setChosenBackgroundImg(event.target.value);
    setBackgroundImg(event.target.value);
  };
  useEffect(() => {
    if (backgroundImg && backgroundImg !== chosenBackgroundImg) {
      setChosenBackgroundImg(backgroundImg);
    }
  }, [backgroundImg]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_FIREBASE_FUNCTION_URL, // this is the url of the firebas function holding the unsplash api call ( to hide the api key from the client side )
          {
            signal: controller.signal, // this is to cancel the request if the component is unmounted
            params: {
              query: query,
              per_page: 8,
              orientation: "landscape",
            },
          }
        );
        setBackgroundImagesAPI(response.data.result || []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          const errMsg =
            err.response?.data?.error || err.message || "Network Error";
          setErrorAPI(errMsg);
          console.error(err);
        }
      } finally {
        setLoadingAPI(false);
      }
    };
    fetchImages();
    return () => {
      controller.abort();
    };
  }, [query]);

  if (loadingAPI) {
    return <div> Loading... </div>;
  }
  if (errorAPI) return <div> {errorAPI} </div>;
  return (
    <FormControl>
      <RadioGroup
        value={chosenBackgroundImg}
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
          {backgroundImagesAPI.map((item) => (
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
                      alt={item.alt_description}
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
  );
}
