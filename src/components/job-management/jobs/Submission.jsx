"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
import ZoomImage from "@/components/common/ZoomImage";
import { config } from "@/config/config";
import { useGetSingleSubmissionQuery } from "@/redux/features/jobs";
import { getOperatorName } from "@/services/getOperatorName";
import { Visibility } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Submission = ({ submissionId }) => {
  const { data, isLoading } = useGetSingleSubmissionQuery(submissionId, {
    skip: !submissionId,
  });

  if (isLoading) return <LoadingIndicator />;
  const submission = data?.data;

  if (!submission) return <Typography>Submission not found</Typography>;

  console.log(JSON.parse(submission.answer));

  return (
    <Card>
      <CardContent>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack spacing={1} direction="row" alignItems="center">
            {submission.worker?.profile_image ? (
              <Image
                height={50}
                width={50}
                alt="profile"
                unoptimized
                src={config.fileBaseUrl + submission.worker?.profile_image}
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
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>{submission.worker.name}</Typography>
                <Link href={`/user-management/user/${submission.worker_id}`}>
                  <IconButton size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                </Link>
              </Stack>
              <Typography>ID: {submission.worker.referral_code}</Typography>
              <Typography>{submission.worker.email}</Typography>
            </div>
          </Stack>

          <Stack>
            <Typography>{submission.job.title}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>ID: {submission.job.job_code}</Typography>
              <Link href={`/job-management/job-details/${submission.job_id}`}>
                <IconButton size="small">
                  <Visibility fontSize="small" />{" "}
                </IconButton>
              </Link>
            </Stack>
            <Typography component="div">
              Status:{" "}
              <Chip
                label={submission.job.status}
                color={
                  submission.job.status === "COMPLETED" ? "success" : "default"
                }
                size="small"
              />
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Submission Details</Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Submitted Date</TableCell>
                    <TableCell>
                      {new Date(submission.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>
                      <Chip
                        label={submission.status}
                        color={
                          submission.status === "SATISFIED"
                            ? "success"
                            : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Proof of Work</TableCell>
                    <TableCell>{submission.proof_data}</TableCell>
                  </TableRow>
                  {submission.answer &&
                    Array.isArray(JSON.parse(submission.answer)) &&
                    JSON.parse(submission.answer).map((answer, index) => (
                      <TableRow key={index}>
                        <TableCell> Answer of {index + 1}.</TableCell>
                        <TableCell>{Object.values(answer)[0]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Questions of the Job</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Condition</TableCell>
                    <TableCell>Answer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submission.job?.question_condition ? (
                    JSON.parse(submission.job?.question_condition).map(
                      (question) => (
                        <TableRow key={question.id}>
                          <TableCell>{question.id}</TableCell>
                          <TableCell>{question.text}</TableCell>
                          <TableCell>
                            {getOperatorName(question.condition.operator)}
                          </TableCell>
                          <TableCell>{question.condition.value}</TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No questions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {submission.job_submission_image && (
          <>
            <Typography mt={2} mb={1} variant="h6">
              Submission Images
            </Typography>
            {submission.job_submission_image.length > 0 ? (
              <Grid container spacing={1}>
                {submission.job_submission_image.map((image) => (
                  <Grid item key={image.id}>
                    {/* <Image
                      height={300}
                      width={500}
                      alt="screenshot"
                      src={config.fileBaseUrl + image.image_path}
                      objectFit="cover"
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    /> */}
                    <ZoomImage img={image.image_path} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No image</Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Submission;
