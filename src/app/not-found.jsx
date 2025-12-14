"use client";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Error404 = () => {
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
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: "black" }}>
        Oops! Page Not Found.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "black" }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button component={Link} href="/" variant="contained" color="primary">
        Go to Homepage
      </Button>
    </Box>
  );
};

export default Error404;
