"use client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Error500 = ({ reset }) => {
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
      <Typography variant="h1" sx={{ color: "black", fontWeight: 500 }}>
        500
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: "black" }}>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "black" }}>
        Sorry, something went wrong on our end. Please try again later.
      </Typography>
      <Button onClick={() => reset()} variant="contained" color="primary">
        Try Again
      </Button>
    </Box>
  );
};

export default Error500;
