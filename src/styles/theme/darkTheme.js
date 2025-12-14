import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#78CDD7",
      main: "#44A1A0",
      dark: "#0D5C63",
    },
    secondary: {
      main: "#247B7B",
    },
    grey: {
      100: "#033b40",
      200: "#04363b",
    },
    background: {
      default: "#292b2b",
      paper: "#132f33",
      secondary: "#1f3e41",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfd8dc",
    },
    divider: "#355a5e",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    allVariants: {
      color: "#ffffff",
    },
  },
});

darkTheme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: "Inter, sans-serif",
        color: darkTheme.palette.text.primary,
        textTransform: "none",
        boxShadow: "none",
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: darkTheme.palette.text.primary,
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: {
        backgroundColor: darkTheme.palette.background.paper,
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: darkTheme.shape.borderRadius * 1,
        border: "1px solid",
        borderColor: darkTheme.palette.divider,
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
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        borderBottom: "1px solid",
        borderBottomColor: darkTheme.palette.divider,
        "&:nth-of-type(even)": {
          backgroundColor: darkTheme.palette.grey[100],
        },
        "&:hover": {
          backgroundColor:
            ownerState?.head === true ? "inherit" : darkTheme.palette.grey[200],
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
        backgroundColor: darkTheme.palette.primary.dark,
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
          MozAppearance: "textfield", // For Firefox
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

export default darkTheme;
