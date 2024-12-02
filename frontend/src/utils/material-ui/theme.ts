import { createTheme } from "@mui/material/styles";
import { frFR } from "@mui/x-data-grid/locales";
import { frFR as coreFrFR } from "@mui/material/locale";
import { frFR as pickerFrFR } from "@mui/x-date-pickers/locales";

export const MUI_THEME = createTheme(
  {
    typography: {
      fontFamily: [
        "Dosis",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  },
  frFR,
  coreFrFR,
  pickerFrFR
);
