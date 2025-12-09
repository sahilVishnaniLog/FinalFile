import { createContext, useContext, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { defaultPaletteX } from "../assets/defaultPalette.js";
import generatePalette from "../utils/paletteGenerator.js";
const ThemeContextHook = createContext();

//helper functions for contrast returns ( hexColorcode)
const getContrastYIQ = (hexColor) => {
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff"; // Return hex for MUI palette
};
export default function ThemeContext({
  children,
  modeChoice,
  setModeChoice,
  backgroundImg,
  setBackgroundImg,
  backgroundColor,
  setBackgroundColor,
  paletteX,
  setPaletteX,
}) {
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)", {
    noSssr: true,
  });
  const effectiveMode =
    modeChoice === "browserTheme"
      ? isSystemDark
        ? "dark"
        : "light"
      : modeChoice;
  // only to deal with the precedency of two different properties that do the same work
  useEffect(() => {
    setBackgroundColor("");
  }, [backgroundImg]);
  useEffect(() => {
    const palette = generatePalette(backgroundImg) || defaultPaletteX;
    setPaletteX(palette);
  }, [backgroundImg, setPaletteX]);

  const theme = useMemo(() => {
    const isLight = effectiveMode === "light";

    const { primaryText, secondaryText, tertiaryText } = isLight
      ? {
          primaryText: "#172B4D",
          secondaryText: "#5E6C84",
          tertiaryText: "#86898f",
        }
      : {
          primaryText: "#EDF2FC",
          secondaryText: "#cecfd2",
          tertiaryText: "#96999e",
        };

    const bgImage = backgroundImg ? `url(${backgroundImg})` : "none";

    return createTheme({
      palette: {
        mode: effectiveMode,
        primary: paletteX.primary, //BUG  - reading null propperty
        secondary: paletteX.secondary,

        error: paletteX.error,

        success: paletteX.success,

        warning: paletteX.warning,

        info: paletteX.info,

        common: {
          black: "#000",
          white: "#fff",
        },

        contrastThreshold: 3,
        tonalOffset: 0.2,

        text: {
          primary: primaryText,
          secondary: secondaryText,
          tertiary: tertiaryText,
        },
        background: {
          paper: isLight ? "#FFFFFF" : "#22272B",
          default: "transparent",

          neutral: isLight ? "#F4F5F7" : alpha("#000", 0.3),
        },
        board: {
          paper: isLight ? alpha("#f8f8f8", 0.3) : alpha("#18191a", 0.3),
          default: "transparent",
          card: isLight ? "#f0f1f2" : "#242528",
        },
        appbar: {
          paper: isLight ? "#f8f8f8" : "#18191a",
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: { textTransform: "none", fontWeight: 500 },
      },
      shape: { borderRadius: 8 },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundImage: bgImage,
              background: backgroundColor,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              height: "100vh",
              transition:
                "background-image 0.3s ease-in-out, background-color 0.3s ease-in-out",
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: "transparent",
              boxShadow: "none",
              backgroundImage: "none",
              borderBottom: "none",
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: { minHeight: "48px !important" },
            dense: { minHeight: "40px !important" },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: isLight ? "#172B4D" : "#EDF2FC",
              "&:hover": {
                backgroundColor: isLight
                  ? alpha("#091E42", 0.08)
                  : alpha("#fff", 0.1),
              },
            },
            outlined: {
              borderColor: isLight
                ? alpha("#091E42", 0.14)
                : alpha("#fff", 0.15),
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: isLight ? "#42526E" : "#8F9FB3",
              "&:hover": {
                backgroundColor: isLight
                  ? alpha("#091E42", 0.08)
                  : alpha("#fff", 0.1),
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: { backgroundImage: "none", borderRadius: "5px" },
            elevation0: {
              backgroundColor: isLight
                ? alpha("#fff", 0.5)
                : alpha("#1C2B41", 0.7),
              border: `1px solid ${
                isLight ? "transparent" : alpha("#fff", 0.1)
              }`,
            },
            elevation1: {
              boxShadow: isLight
                ? "0px 1px 2px 0px rgba(9, 30, 66, 0.25)"
                : "0px 1px 2px 0px rgba(0, 0, 0, 0.5)",
              backgroundColor: isLight ? "#FFFFFF" : "#2C333A", // Slightly lighter than main paper for cards in dark mode
            },
          },
        },

        MuiTabs: {
          styleOverrides: {
            root: { minHeight: 40, backgroundColor: "transparent" },
            indicator: { backgroundColor: primaryText, height: 3 },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              minHeight: 40,
              fontWeight: 500,
              padding: "6px 12px",
              color: isLight ? "#5E6C84" : "#8F9FB3",
              "&.Mui-selected": { color: primaryText },
            },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              color: isLight ? "#172B4D" : "#EDF2FC",
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            input: {
              "&::placeholder": {
                color: isLight ? "#5E6C84" : "#8F9FB3",
                opacity: 1,
              },
              "&:-webkit-autofill": {
                //INFO : this is for autofill of inputs in chrome
                WebkitBoxShadow: "0 0 0 100px transparent inset !important",
                WebkitTextFillColor: primaryText,
                transition: "background-color 3000s ease-in-out 0s",
              },
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: isLight ? "#5E6C84" : "#8F9FB3",
            },
          },
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              color: isLight ? "#5E6C84" : "#8F9FB3",
            },
          },
        },
      },
    });
  }, [effectiveMode, backgroundImg, backgroundColor]);
  const value = {
    mode: effectiveMode,
    modeChoice,
    setModeChoice,
    backgroundImg,
    setBackgroundImg,
    backgroundColor,
    setBackgroundColor,
    paletteX,
    setPaletteX,
  };

  return (
    <ThemeContextHook.Provider value={value}>
      <ThemeProvider theme={theme}> {children} </ThemeProvider>
    </ThemeContextHook.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContextHook);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
