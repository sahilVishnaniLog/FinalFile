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
  Stack,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { set } from "react-hook-form";
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

  const [debuggerText, setDebuggerText] = useState("");

  const handleBackgroundImageSelect = (event) => {
    const newValue = event.target.value;
    console.log(newValue);
    setChosenBackgroundImg(newValue);
    setBackgroundImg(newValue);
    setDebuggerText(newValue);
  };
  useEffect(() => {
    if (backgroundImg && backgroundImg !== chosenBackgroundImg) {
      setChosenBackgroundImg(backgroundImg);
    }
  }, [backgroundImg]);
  useEffect(() => {
    if (!query) return; // if the query is empty, don't make the fetch request

    setLoadingAPI(true);
    setErrorAPI(null);
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
        setLoadingAPI(false);
      } catch (err) {
        if (err.name !== "CanceledError") {
          const errMsg =
            err.response?.data?.error || err.message || "Network Error";
          setErrorAPI(errMsg);
          console.error(err);
          setLoadingAPI(false);
        }
      }
    };
    fetchImages();
    return () => {
      controller.abort();
    };
  }, [query]);

  if (loadingAPI) {
    return (
      <Box
        sx={{
          width: "373.555px",
          height: "154.576px",
          borderRadius: "5px",
          background: "board.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              sx={{ borderRadius: "5px", height: "51px", width: "76.4px" }}
            />
          ))}
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              sx={{ borderRadius: "5px", height: "51px", width: "76.4px" }}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  if (errorAPI) return <div> {errorAPI} </div>;
  if (!loadingAPI) {
    return (
      <>
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
        {/* <Alert severity="info" sx={{ mt: 2 }}>
          debugger: {debuggerText} <br /> {backgroundImg} <br />{" "}
          {chosenBackgroundImg}
        </Alert> */}
      </>
    );
  }
}
