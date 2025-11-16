import { useState } from "react";
import { ThemeContext } from "./theme.js";
import { CssBaseline } from "@mui/material";
import BrowserRouter from "../routingP/BrowserRouter.jsx";

const DefaultThemeSettings = {
  mode: "browserTheme",
  backgroundImg: {
    url: "https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop",
    alt: "Snowy mountain (Day)",
    id: "snowy-mountain",
  },
  backgroundColor: "",
};

export default function ThemeProviderWrapper() {
  const [modeChoice, setModeChoice] = useState(DefaultThemeSettings.mode);
  const [backgroundImg, setBackgroundImg] = useState(
    DefaultThemeSettings.backgroundImg
  );
  const [backgroundColor, setBackgroundColor] = useState(
    DefaultThemeSettings.backgroundColor
  );

  return (
    <>
      <ThemeContext
        modeChoice={modeChoice}
        setModeChoice={setModeChoice}
        backgroundImg={backgroundImg}
        setBackgroundImg={setBackgroundImg}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      >
        <CssBaseline />
        <BrowserRouter />
      </ThemeContext>
    </>
  );
}
