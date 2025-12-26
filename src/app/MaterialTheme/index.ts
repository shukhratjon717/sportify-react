import { createTheme } from "@mui/material/styles";
import shadow from "./shadow";
import typography from "./typography";

/**
 * VIBRANT LIGHT THEME
 */
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4f7f6", // Soft cool gray/white
      paper: "#ffffff",
    },
    primary: {
      main: "#2ecc71", // Vibrant Emerald Green
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3498db", // Bright Blue
      contrastText: "#ffffff",
    },
    text: {
      primary: "#2c3e50", // Dark Blue-Gray for good contrast
      secondary: "#7f8c8d",
    },
    action: {
      hover: "rgba(46, 204, 113, 0.08)",
      selected: "rgba(46, 204, 113, 0.16)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: {
          background: "#f4f7f6",
          height: "100%",
          minHeight: "100%",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
        maxWidthLg: {
          "@media (min-width: 1200px)": {
            maxWidth: "1300px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          fontWeight: 700,
          padding: "10px 24px",
          boxShadow: "none",
        },
        containedPrimary: {
          boxShadow: "0 4px 14px 0 rgba(46, 204, 113, 0.39)",
          "&:hover": {
            boxShadow: "0 6px 20px 0 rgba(46, 204, 113, 0.23)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "16px",
        },
        elevation1: {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          color: "#2c3e50",
          boxShadow: "0 1px 0 0 rgba(0,0,0,0.05)",
        },
      },
    },
  },
  typography,
  shadows: shadow as any,
});

export default lightTheme;
