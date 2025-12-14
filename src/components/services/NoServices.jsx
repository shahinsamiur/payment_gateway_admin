import { Stack, Typography } from "@mui/material";
import React from "react";

const NoServices = () => {
  return (
    <Stack
      sx={{
        height: "calc(100vh - 220px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>No services found</Typography>
    </Stack>
  );
};

export default NoServices;
