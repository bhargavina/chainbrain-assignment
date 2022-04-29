import { createTheme } from "@material-ui/core";
import colors from "./Colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.black,
      light: colors.paleBlue,
    },
    secondary: {
      main: colors.blue,
    },
    text: {
      primary: colors.black,
      secondary: colors.white,
    },
    background: {
      default: colors.white,
    },
    customColors: {
      paleBlue: colors.paleBlue,
    }
  },
});

export default theme;
