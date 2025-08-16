import React, { createContext, useState, useMemo, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <CustomThemeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
