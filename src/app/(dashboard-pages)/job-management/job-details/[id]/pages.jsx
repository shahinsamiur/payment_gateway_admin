import JobDetails from "@/components/job-management/jobs/JobDetails";
import { Stack, Typography } from "@mui/material";
import React from "react";

async function Page({ params }) {
  const { id } = await params;
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Job details</Typography>
      <JobDetails id={id} />
    </Stack>
  );
}

export default Page;
