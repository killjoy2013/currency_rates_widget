import { createTheme, PaletteColor } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { purple } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    buttonColor?: PaletteColor;
  }
  interface PaletteOptions {
    buttonColor?: PaletteColor;
  }
}

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },

  palette: {
    buttonColor: {
      main: green[400],
      dark: green[600],
      light: green[200],
      contrastText: "#fff",
    },
  },
});

export default theme;
