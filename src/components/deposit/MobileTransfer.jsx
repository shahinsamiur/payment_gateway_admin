import { config } from "@/config/config";
import { apiSlice } from "@/redux/api/apiSlice";
import {
  useGetMobileBankingDepositQuery,
  useUpdaeDepositRequestMutation,
} from "@/redux/features/financials";
import {
  Button,
  Chip,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const MobileTransfer = ({ status, paymentMethod }) => {
  const [page, setpage] = useState(1);
  const { data, isLoading } = useGetMobileBankingDepositQuery({
    status,
    page,
    method_name: paymentMethod,
  });
  const [updateStatus] = useUpdaeDepositRequestMutation();
  const [statusUpdating, setStatusUpdating] = useState({ id: -1, status: "" });
  const dispatch = useDispatch();

  async function hadleStatusUpdate(id, status) {
    try {
      setStatusUpdating({ id, status });
      await updateStatus({ id, status }).unwrap();
      dispatch(apiSlice.util.invalidateTags(["mobile-banking-deposit"]));
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    } finally {
      setStatusUpdating({ id: -1, status: "" });
    }
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Transaction Id</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Screenshort</TableCell>
              <TableCell>Req Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.data?.length ? (
              data?.data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.mobile_banking_number}</TableCell>
                  <TableCell>{item.mobile_transaction_id}</TableCell>

                  <TableCell>
                    {item.amount} ({item.currency})
                  </TableCell>
                  <TableCell>
                    {item.screenshot_path ? (
                      <Image
                        src={config.fileBaseUrl + item.screenshot_path}
                        alt="screenshort"
                        height={50}
                        width={50}
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={
                        item.status === "pending"
                          ? "info"
                          : item.status === "accepted"
                          ? "success"
                          : "error"
                      }
                      sx={{ color: "white" }}
                    />
                  </TableCell>
                  <TableCell>
                    {item.status === "pending" && (
                      <Stack
                        direction="row"
                        gap={0.5}
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => hadleStatusUpdate(item.id, "accepted")}
                          loading={
                            statusUpdating.id === item.id &&
                            statusUpdating.status === "accepted"
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => hadleStatusUpdate(item.id, "rejected")}
                          loading={
                            statusUpdating.id === item.id &&
                            statusUpdating.status === "rejected"
                          }
                        >
                          Reject
                        </Button>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Pagination
          count={data?.data?.last_page || 1}
          page={page}
          onChange={(__e, value) => setpage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default MobileTransfer;
