import UserDetails from "@/components/user/UserDetails";
import { Box, Typography } from "@mui/material";
import React from "react";

async function Page({ params }) {
  const { id } = await params;
  return (
    <Box>
      <Typography variant="h4">User details</Typography>
      <UserDetails id={id} />
    </Box>
  );
}

export default Page;
