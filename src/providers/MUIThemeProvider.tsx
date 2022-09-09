import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PropsWithChildren } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MUIThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MUIThemeProvider;
