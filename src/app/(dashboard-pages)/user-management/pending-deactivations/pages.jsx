"use client";
import Modal from "@/components/common/Modal";
import {
  useGetPendingDeactivationsQuery,
  useUpdateDeactivationRequestMutation,
} from "@/redux/features/user";
import ProfileImage from "@/utils/ProfileImage";
import { RemoveRedEye } from "@mui/icons-material";
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
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState({ id: -1, status: "" });
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const { data, isLoading, refetch, isFetching } =
    useGetPendingDeactivationsQuery({ page, status });
  const [updateStatus] = useUpdateDeactivationRequestMutation();

  async function handleStatusUpdate(id, status, admin_comment = "") {
    try {
      setIsUpdating({ id, status });
      await updateStatus({ id, data: { status, admin_comment } }).unwrap();
      if (admin_comment) {
        setShowRejectModal(null);
      }
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setIsUpdating({ id: -1, status: "" });
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">User deactivations</Typography>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="flex-end" mb={2} gap={2}>
            <Button loading={isFetching} onClick={refetch} variant="contained">
              Refresh
            </Button>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              input={<OutlinedInput />}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="ACCEPT">Approved</MenuItem>
              <MenuItem value="REJECT">Rejected</MenuItem>
            </Select>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Remark</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.data?.length > 0 ? (
                  data?.data?.data?.map((item) => (
                    <TableRow key={item?.id}>
                      {console.log(item)}
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <ProfileImage
                            user_name={item?.userData?.name || ""}
                            online_status={item?.userData?.online_status}
                            profile_image={item?.userData?.profile_image}
                          />
                          {item?.userData?.name}
                        </Stack>
                      </TableCell>
                      <TableCell>{item?.reason_for_deactivation}</TableCell>
                      <TableCell>
                        {new Date(item?.created_at).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={item?.status}
                          color={item.status === "ACCEPT" ? "default" : "error"}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-end"
                          gap={1}
                        >
                          <Link
                            href={`/job-management/all-jobs?user_id=${item?.userData?.id}`}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<RemoveRedEye fontSize="small" />}
                            >
                              View Job
                            </Button>
                          </Link>
                          <Button
                            size="small"
                            disabled={item?.status !== "PENDING"}
                            loading={
                              isUpdating.id === item?.id &&
                              isUpdating.status === "ACCEPT"
                            }
                            variant="contained"
                            color="success"
                            onClick={() =>
                              handleStatusUpdate(item?.id, "ACCEPT")
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            size="small"
                            disabled={item?.status !== "PENDING"}
                            variant="contained"
                            color="error"
                            onClick={() => setShowRejectModal(item?.id)}
                          >
                            Decline
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack mt={2} alignItems="flex-end">
            <Pagination
              count={data?.data?.last_page || 1}
              onChange={(_e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>

      <Modal
        open={showRejectModal}
        onClose={() => setShowRejectModal(null)}
        title="Reason for Decline"
      >
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleStatusUpdate(showRejectModal, "REJECT", rejectReason);
          }}
        >
          <OutlinedInput
            required
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Reason for Decline"
            multiline
            rows={4}
          />
          <Stack mt={2} direction="row" justifyContent="flex-end" gap={2}>
            <Button
              type="button"
              variant="contained"
              onClick={() => setShowRejectModal(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isUpdating.status === "REJECT"}
              variant="contained"
              color="error"
            >
              Decline
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default page;
