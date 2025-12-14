import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import DonutChart from "../common/DonutChart";
import { RemoveRedEye } from "@mui/icons-material";
import Link from "next/link";

function Provider({ user }) {
  const taskTableData = [
    {
      label: "Total Job Posted",
      value: user.user_rating.job_posted_count,
    },
    {
      label: "Total Deposit",
      value: user.wallet_balance.deposit_balance,
    },
    {
      label: "Paid",
      value: "_",
    },
    {
      label: "Job Over",
      value: `_`,
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                mb={1}
                align="center"
                sx={{ color: "info.main" }}
              >
                Job Status
              </Typography>

              <DonutChart
                data={[
                  {
                    id: 0,
                    value: user.user_rating.satisfied_percentage,
                    label: `Satisfied ${user.user_rating.satisfied_percentage}%`,
                  },
                  {
                    id: 1,
                    value: user.user_rating.unsatisfied_percentage,
                    label: `Unsatisfied ${user.user_rating.unsatisfied_percentage}%`,
                  },
                  {
                    id: 2,
                    value: user.user_rating.pending_percentage,
                    label: `Pending ${user.user_rating.pending_percentage}%`,
                  },
                ]}
              />
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography
                mb={1}
                variant="h6"
                align="center"
                sx={{ color: "info.main" }}
              >
                Overview
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        Total Job
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taskTableData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.label}</TableCell>
                        <TableCell align="right">{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ mt: 2, maxWidth: 800, mx: "auto" }}>
            <CardContent>
              <Typography variant="body1" mb={1} align="center">
                Provided Jobs
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Provided Date</TableCell>
                      <TableCell>Total Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.jobs?.length ? (
                      user.jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>
                            {new Date(job.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            $
                            {(
                              parseFloat(job.pay_per_task) *
                              job.total_workers_required
                            ).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No Job Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {user.jobs?.length ? (
                <Stack mt={2} alignItems="center">
                  <Link href={`/job-management/all-jobs?user_id=${user.id}`}>
                    <Button variant="contained" startIcon={<RemoveRedEye />}>
                      View All
                    </Button>
                  </Link>
                </Stack>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Provider;
