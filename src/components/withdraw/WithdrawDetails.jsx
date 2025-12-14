import { useGetSingleWithdrawTransactionQuery } from "@/redux/features/financials";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Button,
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
import LoadingIndicator from "../common/LoadingIndicator";
import Modal from "../common/Modal";

const WithdrawDetails = ({ id, open, onClose, title }) => {
  const { data, isLoading } = useGetSingleWithdrawTransactionQuery(id, {
    skip: !id,
  });

  if (isLoading) return <LoadingIndicator />;

  return (
    <Modal title={title} open={open} onClose={onClose}>
      {data ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ width: "100%" }}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>{data.order_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>{data.custom_transaction_id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>
                  <Link href={`/user-management/user/${data.custom_user_id}`}>
                    <Button
                      startIcon={<RemoveRedEye />}
                      size="small"
                      variant="contained"
                    >
                      View User
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>
                  {data.amount} ({data.currency})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payment System</TableCell>
                <TableCell>{data.payment_system}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{data.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Request Date</TableCell>
                <TableCell>
                  {new Date(data.created_at * 1000).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack alignItems="center" justifyContent="center" minHeight={200}>
          <Typography>No data found</Typography>
        </Stack>
      )}
    </Modal>
  );
};

export default WithdrawDetails;
