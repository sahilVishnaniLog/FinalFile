import React from "react";
import { useState, useEffect } from "react";
import { Maximize2, X } from "lucide-react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { IconButton } from "@mui/material";

export default function FullScreenButton() {
  const [isFullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = (e) => {
    e.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <IconButton onClick={toggleFullScreen}>
      {isFullScreen ? <CloseFullscreenIcon /> : <Maximize2 />}
    </IconButton>
  );
}
