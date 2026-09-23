"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",     // user message bubbles, send button
      dark: "#1d4ed8",     // hover state
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0284c7",     // assistant avatar
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",  // assistant bubble text
      secondary: "#64748b",
    },
    error: {
      main: "#b91c1c",
      light: "#fef2f2",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    body1: { fontSize: "0.95rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 }, // matches your current bubble text
    caption: { fontSize: "0.75rem", color: "#64748b" },
  },

  shape: {
    borderRadius: 12, // matches your MessageBubble radius
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 }, // matches MessagesContainer
      },
    },
  },
});

export default theme;