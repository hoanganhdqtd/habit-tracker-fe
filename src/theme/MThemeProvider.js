import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./index";

function MThemeProvider({ children }) {
  const theme = createTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MThemeProvider;
