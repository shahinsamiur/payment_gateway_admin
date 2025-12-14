"use client";
import DonutChart from "@/components/common/DonutChart";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { config } from "@/config/config";
import { useGetJobsQuery } from "@/redux/features/jobs";
import { getRemainingDays } from "@/services/getRemainingDays";
import {
  AccessTimeFilled,
  AttachMoney,
  CheckCircle,
  CheckCircleOutline,
  DateRange,
  Diversity1,
  Engineering,
  InsertInvitation,
  Language,
  Payment,
  Work,
  WorkHistory,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import JobCloseModal from "./JobCloseModal";

function JobDetails({ id }) {
  const { data, isLoading } = useGetJobsQuery({ id });
  const [showCloseModal, setShowCloseModal] = useState(false);

  if (isLoading) return <LoadingIndicator />;

  const job = data?.data?.data[0];

  if (!job) return <Typography align="center">Job not found</Typography>;

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1} direction="row" alignItems="center">
              {job.provider.profile_image ? (
                <Image
                  height={50}
                  width={50}
                  alt="profile"
                  unoptimized
                  src={config.fileBaseUrl + job.provider.profile_image}
                  style={{ borderRadius: 200, objectFit: "cover" }}
                  objectFit="cover"
                />
              ) : (
                <Box
                  sx={{
                    height: 50,
                    width: 50,
                    borderRadius: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "primary.dark",
                    color: "white",
                  }}
                >
                  N
                </Box>
              )}
              <div>
                <Typography>{job.provider.name}</Typography>
                <Typography>ID: {job.provider.referral_code}</Typography>
                <Typography>{job.provider.email}</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography>{job.title}</Typography>
            <Chip
              size="small"
              label={job.status}
              color={
                job.status === "APPROVED"
                  ? "success"
                  : job.status === "PENDING"
                  ? "default"
                  : "warning"
              }
            />
          </Grid>
          {job.start_date && (
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  color="info.main"
                  alignItems="center"
                  gap={1}
                >
                  <DateRange />
                  {new Date(job.start_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  color="warning.main"
                >
                  <InsertInvitation />
                  {new Date(job.end_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Stack>
              </Stack>
            </Grid>
          )}
        </Grid>

        <Stack alignItems="center">
          <Image
            src={config.fileBaseUrl + job.thumbnail_url}
            alt="job image"
            width={1000}
            height={400}
            unoptimized
            style={{ objectFit: "cover", borderRadius: 10, width: "100%" }}
          />
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, lg: 3 },
              alignItems: "center",
              flexWrap: "wrap",
              mt: 1,
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Work fontSize="small" />
              <Typography>{job.job_code}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Engineering fontSize="small" color="info" />
              <Typography color="info.main">
                Req Workers: {job.total_workers_required}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Language fontSize="small" />
              <Typography>International</Typography>
            </Stack>
            {job.end_date && (
              <Stack direction="row" alignItems="center" gap={1}>
                <AccessTimeFilled fontSize="small" color="warning" />
                <Typography color="warning.main">
                  Time: {getRemainingDays(job.end_date)}
                </Typography>
              </Stack>
            )}
            <Stack direction="row" alignItems="center" gap={1}>
              <Payment fontSize="small" color="success" />
              <Typography color="success">
                Pay per task: ${job.pay_per_task}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <WorkHistory fontSize="small" color="info" />
              <Typography color="info.main">
                Total Sub: {job.submission_information.TOTAL_SUBMISSIONS}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Diversity1 fontSize="small" color="info" />
              <Typography color="info.main">
                Under Review: {job.submission_information.UNDER_REVIEW}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack>
              <Typography variant="body1" fontWeight={600} color="primary">
                Required steps to complete the task
              </Typography>
              {JSON.parse(job.steps).map((step, index) => (
                <Stack direction="row" alignItems="start" gap={1} key={index}>
                  <CheckCircle fontSize="small" color="success" />
                  <Typography>{step.instruction}</Typography>
                </Stack>
              ))}
            </Stack>
            {job.required_proofs && (
              <Stack my={2}>
                <Typography variant="body1" fontWeight={600} color="primary">
                  Required Prove that task was completed
                </Typography>
                {JSON.parse(job.required_proofs).map((proof, index) => (
                  <Stack direction="row" alignItems="start" gap={1} key={index}>
                    <CheckCircle fontSize="small" color="success" />
                    <Typography>{proof.description}</Typography>
                  </Stack>
                ))}
              </Stack>
            )}
            {job.question_condition && (
              <Stack>
                <Typography variant="body1" fontWeight={600} color="primary">
                  Required Question Answer that task was completed
                </Typography>
                {JSON.parse(job.question_condition).map((proof, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    key={index}
                  >
                    <CheckCircleOutline fontSize="small" color="success" />
                    <Typography>{proof.text}</Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DonutChart
              data={[
                {
                  id: 1,
                  label: `Satisfied ${job.submission_information.APPROVED}`,
                  value: job.submission_information.APPROVED,
                },
                {
                  id: 2,
                  label: `Unsatisfied ${job.submission_information.REJECTED}`,
                  value: job.submission_information.REJECTED,
                },
                {
                  id: 3,
                  label: `Pending ${job.submission_information.UNDER_REVIEW}`,
                  value: job.submission_information.UNDER_REVIEW,
                },
              ]}
            />
          </Grid>
        </Grid>

        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          justifyContent="center"
          flexWrap="wrap"
        >
          <Link href={`/financials/transaction-history?job_id=${job.id}`}>
            <Button variant="contained" startIcon={<AttachMoney />}>
              View Tansactions
            </Button>
          </Link>
          <Link href={`/job-management/job-details/job-submissions/${job.id}`}>
            <Button variant="contained" startIcon={<WorkHistory />}>
              View Works
            </Button>
          </Link>
          {job?.status !== "CLOSED" && (
            <Button
              onClick={() => setShowCloseModal(true)}
              variant="contained"
              color="error"
            >
              Close This Job
            </Button>
          )}
        </Stack>
      </CardContent>

      {showCloseModal && (
        <JobCloseModal
          open={showCloseModal}
          onClose={() => setShowCloseModal(false)}
          data={job}
        />
      )}
    </Card>
  );
}

export default JobDetails;
