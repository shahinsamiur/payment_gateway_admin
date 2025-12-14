import AddOrEditBlogs from "@/components/blogs/AddOrEditBlogs";
import { Stack, Typography } from "@mui/material";
import React from "react";

function Page() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Add blog</Typography>
      <AddOrEditBlogs />
    </Stack>
  );
}

export default Page;
