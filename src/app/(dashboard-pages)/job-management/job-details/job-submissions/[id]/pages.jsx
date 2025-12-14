import JobSubmissions from "@/components/job-management/jobs/JobSubmissions";
import { Stack, Typography } from "@mui/material";
import React from "react";

async function Page({ params }) {
  const { id } = await params;
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Job submissions</Typography>
      <JobSubmissions jobId={id} />
    </Stack>
  );
}

export default Page;
