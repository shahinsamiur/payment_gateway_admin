"use client";
import {
  useGetTransactionHistoryQuery,
  useGetTransactionQueryQuery,
} from "@/redux/features/financials";
import { FilterListOff, Visibility } from "@mui/icons-material";
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
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import FilterModal from "./FilterModal";
import ViewDetails from "./ViewDetails";

function TransactionHistory() {
  const { data: transactionQuries } = useGetTransactionQueryQuery();
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [filter, setFilter] = useState({
    transaction_type: "",
    payment_gateway: "",
    status: "",
    transaction_id: "",
    date_from: "",
    date_to: "",
    amount_min: "",
    amount_max: "",
  });
  const [page, setPage] = useState(1);
  const params = useSearchParams();
  const user_id = params.get("user_id");
  const job_id = params.get("job_id");

  const { data, isLoading, isFetching, refetch } =
    useGetTransactionHistoryQuery({
      ...filter,
      page,
      job_id: job_id || "",
      user_id: user_id || "",
    });

  const paymentGateWayOptions = transactionQuries?.payment_gateways
    ? transactionQuries.payment_gateways.map((item) => ({
        label: item.replace(/_/g, " ").toUpperCase(),
        value: item,
      }))
    : [];
  const transactionTypeOptions = transactionQuries?.transaction_types
    ? transactionQuries.transaction_types.map((item) => ({
        label: item.replace(/_/g, " ").toUpperCase(),
        value: item,
      }))
    : [];

  const transactionStatusOptions = transactionQuries?.statuses
    ? transactionQuries.statuses.map((item) => ({
        label: item.replace(/_/g, " ").toUpperCase(),
        value: item,
      }))
    : [];

  return (
    <Box>
      <Typography variant="h4">
        {user_id ? "User" : job_id ? "Job" : ""} Transaction history
      </Typography>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            gap={1}
            justifyContent="flex-end"
            flexWrap="wrap"
            alignItems="center"
            mb={2}
          >
            <Button variant="contained" loading={isFetching} onClick={refetch}>
              Refresh
            </Button>
            <Select
              input={<OutlinedInput />}
              displayEmpty
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <MenuItem value="" disabled>
                <em>
                  <small>Status</small>
                </em>
              </MenuItem>
              <MenuItem value="">All</MenuItem>
              {transactionStatusOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              input={<OutlinedInput />}
              displayEmpty
              value={filter.payment_gateway}
              onChange={(e) =>
                setFilter({ ...filter, payment_gateway: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                <em>
                  <small>Payment Gateway</small>
                </em>
              </MenuItem>
              <MenuItem value="">All</MenuItem>
              {paymentGateWayOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              input={<OutlinedInput />}
              displayEmpty
              value={filter.transaction_type}
              onChange={(e) =>
                setFilter({ ...filter, transaction_type: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                <em>
                  <small>Tansaction Type</small>
                </em>
              </MenuItem>
              <MenuItem value="">All</MenuItem>
              {transactionTypeOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>

            <Button
              startIcon={<FilterListOff />}
              variant="contained"
              color="secondary"
              onClick={() => setShowMoreFilter(!showMoreFilter)}
            >
              More Filter
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Txn Id</TableCell>
                  <TableCell>Txn Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
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
                  data.data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.transaction_id}</TableCell>
                      <TableCell>{item.transaction_type}</TableCell>
                      <TableCell>${item.amount}</TableCell>
                      <TableCell>{item.payment_gateway}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          color={
                            item.status === "completed"
                              ? "success"
                              : item.status === "pending"
                              ? "info"
                              : "error"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={() => setTransactionDetails(item)}
                          startIcon={<Visibility />}
                          color="secondary"
                          variant="contained"
                        >
                          View
                        </Button>
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
          <Stack alignItems="flex-end" mt={2}>
            <Pagination
              count={data?.last_page}
              onChange={(e, page) => setPage(page)}
              page={page}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>

      {showMoreFilter && (
        <FilterModal
          open={showMoreFilter}
          onClose={() => setShowMoreFilter(false)}
          setFilter={setFilter}
        />
      )}

      {!!transactionDetails && (
        <ViewDetails
          open={!!transactionDetails}
          onClose={() => setTransactionDetails(null)}
          data={transactionDetails}
        />
      )}
    </Box>
  );
}

export default TransactionHistory;
