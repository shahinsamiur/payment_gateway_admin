import {
  useGetDepositHitoriesQuery,
  useRecheckApayTransactionStatusMutation,
} from "@/redux/features/financials";
import { Refresh } from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const DepositTransactions = ({ status, paymentMethod, tnxId }) => {
  const [page, setpage] = useState(1);
  const [checkingId, setCheckingId] = useState(0);
  const { data, isLoading } = useGetDepositHitoriesQuery({
    status,
    page,
    payment_system: paymentMethod,
    transaction_id: tnxId,
  });
  const [recheckStatus] = useRecheckApayTransactionStatusMutation();

  async function handleRecheck(id) {
    try {
      setCheckingId(id);
      await recheckStatus(id).unwrap();
      toast.success("Status rechecked successfully");
    } catch (error) {
      toast.error(error.data?.message || "Internal server error");
    } finally {
      setCheckingId(0);
    }
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction Id</TableCell>
              <TableCell>Gateway</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.data?.length ? (
              data?.data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.transaction_id}</TableCell>
                  <TableCell>{item.payment_system}</TableCell>

                  <TableCell>
                    {item.amount} ({item.currency})
                  </TableCell>

                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={
                        /pending/i.test(item.status)
                          ? "info"
                          : /accepted|success/i.test(item.status)
                          ? "success"
                          : "error"
                      }
                      sx={{ color: "white" }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {item.type === "apay" ? (
                      <Button
                        variant="contained"
                        startIcon={<Refresh />}
                        size="small"
                        color="secondary"
                        onClick={() => handleRecheck(item.id)}
                        loading={checkingId === item.id}
                      >
                        Recheck
                      </Button>
                    ) : (
                      <Typography variant="body2">N/A </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Pagination
          count={data?.meta?.last_page || 1}
          page={page}
          onChange={(__e, value) => setpage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default DepositTransactions;
