import Submission from "@/components/job-management/jobs/Submission";
import { Stack, Typography } from "@mui/material";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Submission</Typography>
      <Submission submissionId={id} />
    </Stack>
  );
};

export default page;
