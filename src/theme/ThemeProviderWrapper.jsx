import { useState, useEffect } from "react";
import { ThemeContext } from "./theme.js";
import { CssBaseline } from "@mui/material";
import BrowserRouter from "../routingP/BrowserRouter.jsx";
import { defaultThemeSettings } from "../assets/defaultPalette.js";
export default function ThemeProviderWrapper() {
  const [modeChoice, setModeChoice] = useState(() => {
    return localStorage.getItem("modeChoice") || defaultThemeSettings.mode;
  });
  const [backgroundImg, setBackgroundImg] = useState(() => {
    const saved = localStorage.getItem("backgroundImg");
    return saved !== null ? saved : defaultThemeSettings.backgroundImg;
  });
  const [backgroundColor, setBackgroundColor] = useState(() => {
    return (
      localStorage.getItem("backgroundColor") ||
      defaultThemeSettings.backgroundColor
    );
  });
  const [paletteX, setPaletteX] = useState(null);

  useEffect(() => {
    localStorage.setItem("modeChoice", modeChoice);
  }, [modeChoice]);

  useEffect(() => {
    localStorage.setItem("backgroundImg", backgroundImg);
  }, [backgroundImg]);

  useEffect(() => {
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  return (
    <>
      <ThemeContext
        modeChoice={modeChoice}
        setModeChoice={setModeChoice}
        backgroundImg={backgroundImg}
        setBackgroundImg={setBackgroundImg}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        paletteX={paletteX}
        setPaletteX={setPaletteX}
      >
        <CssBaseline />
        <BrowserRouter />
      </ThemeContext>
    </>
  );
}
