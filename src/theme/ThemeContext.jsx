export default function ThemeContext() {
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const theme = useMemo(() => {
    const isLight = mode === "light";
    const primaryText = isLight ? "#172b4d" : "#edf2fc";
    const secondaryText = isLight ? "#5e6c84" : "#2a2c2e";

    const bgImage = isLight;
  });
}
