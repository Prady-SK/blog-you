import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { commonMessagesCMS } from "../../cms/commonMessages";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  return hasError ? (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h6" color="error">
        {commonMessagesCMS.somethingWrong}
      </Typography>
    </Box>
  ) : (
    <ErrorCatcher onError={() => setHasError(true)}>{children}</ErrorCatcher>
  );
};

const ErrorCatcher: React.FC<{
  children: React.ReactNode;
  onError: () => void;
}> = ({ children, onError }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("ErrorBoundary caught:", error);
    onError();
    return null;
  }
};

export default ErrorBoundary;
