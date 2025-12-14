"use client";
import { useDebouncer } from "@/hooks/useDebouncer";
import useResponsive from "@/hooks/useResponsive";
import { useJobReportsQuery } from "@/redux/features/jobs";
import { Edit, Visibility } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import UpdateReportStatus from "./UpdateReportStatus";

const AllReports = () => {
  const [tab, setTab] = React.useState("job");
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const jobSubmissionId = params.get("jobSubmissionId");
  const [inputValue, setInputValue] = React.useState("");
  const search = useDebouncer(inputValue, 500);
  const isMobile = useResponsive("down", "md");
  const [showUpdateModal, setShowUpdateModal] = React.useState(0);

  const { data, isLoading, isFetching, refetch } = useJobReportsQuery({
    type: tab,
    job_id: jobId || "",
    job_submission_id: jobSubmissionId || "",
    status,
    search,
    page,
  });

  const reports = data?.data ?? {};

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Reports management</Typography>
      <Card>
        <CardContent>
          <Stack mb={2} direction="row" justifyContent="space-between">
            <Stack direction="row" justifyContent="flex-start" gap={1}>
              <Button
                variant={tab === "job" ? "contained" : "outlined"}
                onClick={() => setTab("job")}
              >
                Job Provider
              </Button>
              <Button
                variant={tab === "job_submission" ? "contained" : "outlined"}
                onClick={() => setTab("job_submission")}
              >
                Worker
              </Button>
            </Stack>

            {!isMobile && (
              <Stack direction="row" justifyContent="flex-end" gap={1}>
                <Button
                  variant="contained"
                  loading={isFetching}
                  onClick={refetch}
                >
                  Refresh
                </Button>

                <OutlinedInput
                  placeholder="Search user Name or Email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <Select
                  input={<OutlinedInput />}
                  displayEmpty
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="APPROVED">APPROVED</MenuItem>
                  <MenuItem value="REJECTED">REJECTED</MenuItem>
                </Select>
              </Stack>
            )}
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : reports?.data?.length ? (
                  reports?.data?.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>
                        {new Date(report.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          color={
                            report.status === "APPROVED"
                              ? "success"
                              : report.status === "REJECTED"
                              ? "error"
                              : "default"
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          gap={1}
                        >
                          <Link
                            href={`/user-management/user/${report.reporter_id}`}
                          >
                            <Button
                              color="warning"
                              startIcon={<Visibility />}
                              variant="contained"
                              size="small"
                            >
                              Reporter
                            </Button>
                          </Link>
                          {!isFetching && (
                            <Link
                              href={
                                tab === "job"
                                  ? `/job-management/job-details/${report.job_id}`
                                  : `/job-management/job-details/job-submissions/submission/${report.job_submission_id}`
                              }
                            >
                              <Button
                                startIcon={<Visibility />}
                                variant="contained"
                                size="small"
                              >
                                {tab === "job" ? "Job" : "Submission"}
                              </Button>
                            </Link>
                          )}

                          {report.status === "PENDING" && (
                            <Button
                              onClick={() => setShowUpdateModal(report.id)}
                              startIcon={<Edit />}
                              variant="contained"
                              size="small"
                              color="info"
                            >
                              Update
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No report found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="flex-end" mt={2}>
            <Pagination
              count={reports?.last_page ?? 1}
              page={page}
              onChange={(_, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>

        {!!showUpdateModal && (
          <UpdateReportStatus
            open={showUpdateModal}
            onClose={() => setShowUpdateModal(0)}
            reportId={showUpdateModal}
          />
        )}
      </Card>
    </Stack>
  );
};

export default AllReports;
