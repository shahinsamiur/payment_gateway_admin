"use client";

import { selectOptions } from "@/_mock/selectOptions";
import { useDebouncer } from "@/hooks/useDebouncer";
import useResponsive from "@/hooks/useResponsive";
import { useGetCategoriesQuery, useGetJobsQuery } from "@/redux/features/jobs";
import ProfileImage from "@/utils/ProfileImage";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
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
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function AllJobs() {
  const [page, setPage] = React.useState(1);
  const [jobCode, setJobCode] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategories, setSubCategories] = React.useState([]);
  const [jobSubCategory, setJobSubCategory] = React.useState("");
  const [status, setStatus] = React.useState("");
  const { data: jobCategory } = useGetCategoriesQuery();
  const jobCodeValue = useDebouncer(jobCode, 500);
  const params = useSearchParams();
  const user_id = params.get("user_id");
  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("down", "md");

  const { data, isLoading, refetch, isFetching } = useGetJobsQuery({
    status: status ?? "",
    job_category_id: category ?? "",
    job_sub_category_id: jobSubCategory ?? "",
    job_code: jobCodeValue ?? "",
    page: page,
    user_id: user_id ?? "",
  });

  const handleReset = () => {
    setJobCode("");
    setCategory("");
    setJobSubCategory("");
    setStatus("");
  };

  useEffect(() => {
    if (category) {
      const subCategory = jobCategory?.data?.find(
        (item) => item.id === category
      );
      setSubCategories(subCategory?.sub_categories);
      setJobSubCategory("");
    }
  }, [category]);

  return (
    <Box>
      <Typography variant="h4">{user_id ? "User" : ""} All job</Typography>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack
            gap={2}
            mb={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {!isMobile && (
              <>
                {!isTablet && (
                  <Button
                    onClick={refetch}
                    loading={isFetching}
                    variant="outlined"
                  >
                    Refresh
                  </Button>
                )}

                {jobCode || jobSubCategory || category || status ? (
                  <Button onClick={handleReset} variant="outlined">
                    Reset
                  </Button>
                ) : null}
                <OutlinedInput
                  value={jobCode}
                  onChange={(e) => setJobCode(e.target.value)}
                  placeholder="Job Code"
                />
                <Select
                  value={category}
                  displayEmpty
                  input={<OutlinedInput placeholder="Filter By category" />}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    <em>
                      <small>Filter by Category</small>
                    </em>
                  </MenuItem>
                  {jobCategory?.data?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.category_name}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={jobSubCategory}
                  displayEmpty
                  input={<OutlinedInput placeholder="Filter By Sub category" />}
                  onChange={(e) => setJobSubCategory(e.target.value)}
                >
                  <MenuItem value="" disabled>
                    <em>
                      <small>Filter by Sub Category</small>
                    </em>
                  </MenuItem>
                  {subCategories?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.sub_category_name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}

            <Select
              value={status}
              displayEmpty
              input={
                <OutlinedInput placeholder="Filter By status" size="small" />
              }
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="" disabled>
                <em>
                  <small>Filter by status</small>
                </em>
              </MenuItem>
              {selectOptions.job_status.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Pay per Task</TableCell>
                  <TableCell>Total Worker</TableCell>
                  <TableCell>Submitted Task</TableCell>
                  <TableCell>Estimated Day</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.data?.length ? (
                  data.data.data.map((job) => <List key={job.id} job={job} />)
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
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
    </Box>
  );
}

function List({ job }) {
  return (
    <>
      <TableRow key={job.id}>
        <TableCell>{job.job_code}</TableCell>
        <TableCell>
          <Tooltip placement="top" arrow title={job.title}>
            <Typography sx={{ textWrap: "nowrap" }}>{job.title}</Typography>
          </Tooltip>
        </TableCell>
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

            <Typography variant="subtitle2">{job.provider.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>${job.pay_per_task}</TableCell>
        <TableCell>{job.submission_information.REQUIRED_JOB_WORKER}</TableCell>
        <TableCell>{job.submission_information.TOTAL_SUBMISSIONS}</TableCell>
        <TableCell>{job.estimated_day}</TableCell>
        <TableCell>
          {job.start_date
            ? new Date(job.start_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </TableCell>
        <TableCell>
          {job.end_date
            ? new Date(job.end_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </TableCell>
        <TableCell>
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
        </TableCell>
        <TableCell>
          <Link href={`/job-management/job-details/${job.id}`}>
            <Button
              size="small"
              variant="contained"
              startIcon={<RemoveRedEye fontSize="small" />}
            >
              View
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
}

export default AllJobs;
