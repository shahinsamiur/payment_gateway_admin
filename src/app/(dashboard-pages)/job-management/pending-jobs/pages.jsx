"use client";

import { useDebouncer } from "@/hooks/useDebouncer";
import {
  useGetPendingJobsQuery,
  useJobStatusUpdateMutation,
} from "@/redux/features/jobs";
import ProfileImage from "@/utils/ProfileImage";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  OutlinedInput,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

function PendingJobs() {
  const [page, setPage] = React.useState(1);
  const [jobCode, setJobCode] = React.useState("");
  const jobCodeValue = useDebouncer(jobCode, 500);
  const [statusUpdating, setStatusUpdating] = React.useState({
    id: -1,
    status: "",
  });
  const [statusUpdate] = useJobStatusUpdateMutation();

  const { data, isLoading, refetch, isFetching } = useGetPendingJobsQuery({
    status: "PENDING",
    job_code: jobCodeValue,
    page: page,
    job_category_id: "",
    job_sub_category_id: "",
  });

  async function handleStatusUpdate(id, status) {
    try {
      setStatusUpdating({ id, status });
      await statusUpdate({ id, status }).unwrap();
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setStatusUpdating({ id: -1, status: "" });
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Pending jobs</Typography>
      <Card>
        <CardContent>
          <Stack
            gap={2}
            mb={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button onClick={refetch} loading={isFetching} variant="contained">
              Refresh
            </Button>
            <OutlinedInput
              value={jobCode}
              onChange={(e) => setJobCode(e.target.value)}
              placeholder="Job Code"
            />
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Provider name</TableCell>
                  <TableCell>Provider profile</TableCell>
                  <TableCell>Pay per Task</TableCell>
                  <TableCell>Total Worker</TableCell>
                  <TableCell>Submitted Task</TableCell>
                  <TableCell>Estimated Day</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.data?.length ? (
                  data.data.data.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.job_code}</TableCell>
                      <TableCell>
                        <Tooltip placement="top" arrow title={job.title}>
                          <Typography sx={{ textWrap: "nowrap" }}>
                            {job.title}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{job.provider.name}</TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ cursor: "pointer" }}
                        >
                          <ProfileImage
                            profile_image={job.provider.profile_image}
                            online_status={job.provider.online_status}
                            user_name={job.provider.name}
                          />

                          <Typography variant="subtitle2">
                            {job.provider.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>${job.pay_per_task}</TableCell>
                      <TableCell>
                        {job.submission_information.REQUIRED_JOB_WORKER}
                      </TableCell>
                      <TableCell>
                        {job.submission_information.TOTAL_SUBMISSIONS}
                      </TableCell>
                      <TableCell>{job.estimated_day}</TableCell>

                      <TableCell>
                        {new Date(job.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Chip label={job.status} color="default" size="small" />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" gap={0.5}>
                          <Link href={`/job-management/job-details/${job.id}`}>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<RemoveRedEye fontSize="small" />}
                            >
                              View
                            </Button>
                          </Link>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            loading={
                              statusUpdating.id === job.id &&
                              statusUpdating.status === "APPROVED"
                            }
                            onClick={() =>
                              handleStatusUpdate(job.id, "APPROVED")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            loading={
                              statusUpdating.id === job.id &&
                              statusUpdating.status === "REJECTED"
                            }
                            onClick={() =>
                              handleStatusUpdate(job.id, "REJECTED")
                            }
                          >
                            Rejected
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack mt={2} direction="row" justifyContent="flex-end">
            <Pagination
              count={data?.data?.last_page}
              page={page}
              onChange={(_e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default PendingJobs;
