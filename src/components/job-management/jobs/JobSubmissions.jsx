"use client";
import { useDebouncer } from "@/hooks/useDebouncer";
import useResponsive from "@/hooks/useResponsive";
import { useGetJobSubmissionsQuery } from "@/redux/features/jobs";
import ProfileImage from "@/utils/ProfileImage";
import { Visibility } from "@mui/icons-material";
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
import React from "react";

const JobSubmissions = ({ jobId }) => {
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const isMobile = useResponsive("down", "md");
  const search = useDebouncer(inputValue, 500);
  const { data, isLoading, isFetching, refetch } = useGetJobSubmissionsQuery(
    { jobId, page, status, search },
    {
      skip: !jobId,
    }
  );

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mb={2}
          gap={2}
        >
          {!isMobile && (
            <Button variant="contained" loading={isFetching} onClick={refetch}>
              Refresh
            </Button>
          )}
          <OutlinedInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search user Name or Email"
          />
          <Select
            input={<OutlinedInput />}
            displayEmpty
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Select Status"
          >
            {[
              { id: 1, label: "All", value: "" },
              { id: 2, label: "PENDING", value: "UNDER_REVIEW" },
              { id: 3, label: "SATISFIED", value: "SATISFIED" },
              { id: 4, label: "UNSATISFIED", value: "UNSATISFIED" },
            ].map((item) => (
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
                <TableCell>Worker</TableCell>
                <TableCell>Submitted Date</TableCell>
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
              ) : data?.data?.data?.length ? (
                data?.data?.data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <ProfileImage
                          profile_image={item.worker.profile_image}
                          user_name={item.worker.name}
                        />
                        <Typography sx={{ textWrap: "nowrap" }}>
                          {item.worker.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {new Date(item.submitted_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.status}
                        color={
                          item.status === "SATISFIED"
                            ? "success"
                            : item.status === "UNSATISFIED"
                            ? "error"
                            : "default"
                        }
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Link
                        href={`/job-management/job-details/job-submissions/submission/${item.id}`}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Visibility />}
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack alignItems="flex-end" mt={2}>
          {data?.data?.last_page > 1 && (
            <Pagination
              count={data?.data?.last_page || 1}
              page={page}
              onChange={(_, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JobSubmissions;
