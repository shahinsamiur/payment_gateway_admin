import {
  Box,
  Card,
  CardContent,
  Grid,
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

function Worker({ user }) {
  const taskTableData = [
    {
      label: "Task Attend",
      value: user.user_rating.total_submissions,
    },
    {
      label: "Satisfied",
      value: user.user_rating.satisfied_count,
    },
    {
      label: "Not Satisfied",
      value: user.user_rating.unsatisfied_count,
    },
    {
      label: "Pending",
      value: user.user_rating.pending,
    },
    {
      label: "Payment Received",
      value: `$${user.wallet_balance.earning_balance}`,
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
                Working Status
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
                        Total Working
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
                Completed Jobs
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Complete Date</TableCell>
                      <TableCell>Earn</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.works?.length ? (
                      user.works.map((work) => (
                        <TableRow key={work.id}>
                          <TableCell>{work.job?.title}</TableCell>
                          <TableCell>
                            {new Date(work.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell>${work.job?.pay_per_task}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No Work done yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Worker;
