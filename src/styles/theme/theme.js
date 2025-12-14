import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#78CDD7",
      main: "#44A1A0",
      dark: "#0D5C63",
    },
    secondary: {
      main: "#247B7B",
    },
    grey: {
      100: "#f5f5f5",
      200: "#eeeeee",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#FFFFFA",
      paper: "#ffffff",
      secondary: "#f5f5f5",
    },
    text: {
      primary: "#000",
      secondary: "#247B7B",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    allVariants: {
      color: "#000",
    },
  },
});
theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: "Inter, sans-serif",
        textTransform: "none",
        boxShadow: "none",
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        fontFamily: "Inter, sans-serif",
        color: "#637381",
        textTransform: "none",
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius * 1,
        border: "1px solid",
        borderColor: theme.palette.divider,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderBottom: "none",
        textWrap: "nowrap",
      }),
      head: {
        color: "#ffffff",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.divider,
        "&:nth-of-type(even)": {
          backgroundColor: theme.palette.grey[100],
        },
        "&:hover": {
          backgroundColor:
            ownerState?.head === true ? "inherit" : theme.palette.grey[200],
        },
        "&:last-child": {
          borderBottom: "none",
        },
      }),
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  MuiOutlinedInput: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        "& input[type=number]": {
          MozAppearance: "textfield",
          "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        },
      },
    },
  },
};

export default theme;
