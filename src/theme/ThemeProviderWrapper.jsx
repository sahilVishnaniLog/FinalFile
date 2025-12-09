import { useState } from "react";
import { ThemeContext } from "./theme.js";
import { CssBaseline } from "@mui/material";
import BrowserRouter from "../routingP/BrowserRouter.jsx";
import { defaultThemeSettings } from "../assets/defaultPalette.js";
export default function ThemeProviderWrapper() {
  const [modeChoice, setModeChoice] = useState(defaultThemeSettings.mode);
  const [backgroundImg, setBackgroundImg] = useState(
    defaultThemeSettings.backgroundImg
  );
  const [backgroundColor, setBackgroundColor] = useState(
    defaultThemeSettings.backgroundColor
  );
  const [paletteX, setPaletteX] = useState(null);

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
