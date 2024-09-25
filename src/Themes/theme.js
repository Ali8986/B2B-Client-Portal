import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
      light: "#7587eb",
      dark: "#3c4fab",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#19857b",
      light: "#4caea8",
      dark: "#0e615b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
      disabled: "#888888",
    },
    error: {
      main: "#d32f2f",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ed6c02",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0288d1",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
