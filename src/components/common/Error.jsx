import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Error = ({ message, onRetry, isLoading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {message || "An unexpected error occurred."}
      </Typography>
      {onRetry && (
        <Button variant="contained" loading={isLoading} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default Error;
