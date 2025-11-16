import { createContext, useContext, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const ThemeContextHook = createContext();

export default function ThemeContext({
  children,
  modeChoice,
  setModeChoice,
  backgroundImg,
  setBackgroundImg,
  backgroundColor,
  setBackgroundColor,
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

  const theme = useMemo(() => {
    const isLight = effectiveMode === "light";

    const { primaryText, secondaryText } = isLight
      ? { primaryText: "#172B4D", secondaryText: "#5E6C84" }
      : { primaryText: "#EDF2FC", secondaryText: "#2a2c2e" };

    const bgImage = `url(${backgroundImg.url})`;
    //const bgImage = backgroundImg? `url(${backgroundImg.url})`: "none" ;

    return createTheme({
      palette: {
        mode: effectiveMode,
        primary: { main: "#0052CC" },
        text: {
          primary: primaryText,
          secondary: isLight ? "#5E6C84" : "#8F9FB3",
        },
        background: {
          paper: isLight ? "#FFFFFF" : "#22272B",
          default: "transparent",

          neutral: isLight ? "#F4F5F7" : alpha("#000", 0.3),
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
              background: backgroundColor || "transparent",
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
            root: { backgroundImage: "none" },
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
