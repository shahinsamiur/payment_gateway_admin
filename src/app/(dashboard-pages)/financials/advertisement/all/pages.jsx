"use client";
import { selectOptions } from "@/_mock/selectOptions";
import ZoomImage from "@/components/common/ZoomImage";
import { config } from "@/config/config";
import { useDebouncer } from "@/hooks/useDebouncer";
import {
  useGetAdvertisementsQuery,
  useUpdateAdvertisementStatusMutation,
} from "@/redux/features/financials";
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
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

function Page() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [updateStatus] = useUpdateAdvertisementStatusMutation();
  const [isUpdating, setIsUpdating] = React.useState({ id: -1, status: "" });
  const searchValue = useDebouncer(search, 500);
  const { data, isLoading, refetch, isFetching } = useGetAdvertisementsQuery({
    page,
    search: searchValue,
    status,
  });

  async function handleUpdateStatus(id, status) {
    try {
      setIsUpdating({ id, status });
      await updateStatus({ id, data: { status } });
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    } finally {
      setIsUpdating({ id: -1, status: "" });
    }
  }

  return (
    <Box>
      <Typography variant="h4">Advertisement</Typography>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            mb={2}
          >
            <Button loading={isFetching} onClick={refetch} variant="contained">
              Refresh
            </Button>

            <OutlinedInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />

            <Select
              input={<OutlinedInput />}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
            >
              {selectOptions.advertisement_status.map((item) => (
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
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Target URL</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Req Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.data?.length ? (
                  data?.data?.data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <ZoomImage
                          img={item?.banner_image}
                          width="100px"
                          height="50px"
                        />
                      </TableCell>
                      <TableCell>{item?.title}</TableCell>
                      <TableCell>{item?.target_url}</TableCell>
                      <TableCell>{item?.duration_days}</TableCell>
                      <TableCell>${item?.cost}</TableCell>
                      <TableCell>
                        <Chip
                          label={item?.status}
                          color={
                            /ACTIVE|APPROVED/.test(item?.status)
                              ? "success"
                              : item.status === "PENDING"
                              ? "info"
                              : "error"
                          }
                          sx={{ color: "white" }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(item?.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {item.status === "PENDING" && (
                          <Stack
                            direction="row"
                            gap={1}
                            justifyContent="flex-end"
                          >
                            <Button
                              size="small"
                              color="success"
                              variant="contained"
                              onClick={() =>
                                handleUpdateStatus(item?.id, "APPROVED")
                              }
                              loading={
                                isUpdating.id === item?.id &&
                                isUpdating.status === "APPROVED"
                              }
                            >
                              Approved
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleUpdateStatus(item?.id, "REJECTED")
                              }
                              loading={
                                isUpdating.id === item?.id &&
                                isUpdating.status === "REJECTED"
                              }
                            >
                              Rejected
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack alignItems="flex-end" mt={2}>
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

export default Page;
