import React, { createContext, useState, useMemo, ReactNode } from "react";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors";

type ThemeContextType = {
  toggleColorMode: () => void;
};

export const CustomThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
});

export const CustomThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => {
    let baseTheme = createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              background: {
                default: grey[50],
                paper: "#fff",
              },
              text: {
                primary: grey[900],
                secondary: grey[700],
              },
              primary: { main: blue[700] },
              secondary: { main: blue[500] },
            }
          : {
              background: {
                default: "#121212", // true dark background
                paper: "#1e1e1e", // dark paper, contrasts with default
              },
              text: {
                primary: "#ffffff",
                secondary: grey[400],
              },
              primary: { main: blue[300] },
              secondary: { main: blue[200] },
            }),
      },
      typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
        h1: { fontWeight: 700, fontSize: "2.5rem" },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },
        body1: { lineHeight: 1.6 },
      },
      shape: {
        borderRadius: 5,
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 2,
              padding: "0.5rem",
            },
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            root: {
              marginTop: "0",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
              paddingLeft: "0",
              paddingRight: "0",
              "@media (min-width:600px)": {
                borderRadius: 12,
                paddingLeft: "8px",
                paddingRight: "8px",
              },
            },
          },
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              backgroundColor: mode === "light" ? grey[100] : grey[800],
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: "none",
              fontWeight: 500,
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 12,
            },
          },
        },
        MuiTablePagination: {
          styleOverrides: {
            toolbar: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
      },
    });

    return responsiveFontSizes(baseTheme);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <CustomThemeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
