import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const colorPalette = {
  darkBlue: "#0f1724",
  lightBlue: "#92abcf",
  blue: "#24364e",
  white: "#ffffff",
  red: "#f44336",
  darkGrey: "#272e3a",
  lightGrey: "#9fa2a7",
  green: "#77dd77",
};

let theme = createMuiTheme({
  palette: {
    primary: {
      main: colorPalette.darkBlue,
      dark: colorPalette.lightBlue,
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        height: "2.2rem",
        width: "25rem",
        backgroundColor: colorPalette.white,
        borderRadius: "25px",
        boxShadow: "0 1px 6px 0 " + colorPalette.lightGrey,
        "&:hover $notchedOutline, &$focused $notchedOutline": {
          borderWidth: "1.5px",
        },
      },
    },
    MuiInputAdornment: {
      root: {
        "& svg": {
          color: colorPalette.darkBlue,
          fontSize: "1.2rem",
        },
      },
    },
    MuiIconButton: {
      root: {
        color: colorPalette.white,
      },
    },
    MuiTypography: {
      root: {
        fontFamily: "sans-serif",
        color: colorPalette.white,
        whiteSpace: "nowrap",
      },
    },
    MuiPaper: {
      root: {
        position: "absolute",
        backgroundColor: colorPalette.red + "!important",
        "& div": {
          color: "unset !important",
        },
      },
    },
    MuiCircularProgress: {
      root: {
        position: "absolute",
        zIndex: 1,
        width: "100px!important",
        height: "100px!important",
        color: colorPalette.white + "!important",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

theme.typography.h1 = {
  fontSize: theme.typography.pxToRem(30),
  fontWeight: 400,
  textAlign: "center",
};

theme.typography.h2 = {
  fontSize: theme.typography.pxToRem(30),
  fontWeight: 300,
  textAlign: "center",
  color: colorPalette.lightBlue,
};

theme.typography.caption = {
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 100,
  color: colorPalette.lightBlue,
};

export default theme;
