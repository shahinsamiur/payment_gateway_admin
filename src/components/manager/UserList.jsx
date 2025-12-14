"use client";
import { useGetManagerDetailsQuery } from "@/redux/features/manager";
import {
  Card,
  CardContent,
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

const UserList = ({ managerId }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetManagerDetailsQuery({
    id: managerId,
    page,
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Manager details</Typography>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Joined Date</TableCell>
                  <TableCell>Total Deposit</TableCell>
                  <TableCell>Total Withdraw</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.length ? (
                  data?.data?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>
                        {parseFloat(
                          user.user_transaction_record?.deposit || 0
                        ) +
                          parseFloat(
                            user.user_transaction_record
                              ?.credit_deposit_balance_by_system || 0
                          )}
                      </TableCell>
                      <TableCell>
                        {parseFloat(
                          user.user_transaction_record?.withdraw || 0
                        ) +
                          parseFloat(
                            user.user_transaction_record
                              ?.debit_withdraw_balance_by_system || 0
                          )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <Pagination
              count={data?.last_page}
              page={page}
              onChange={(_e, page) => setPage(page)}
              shape="rounded"
              variant="outlined"
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UserList;
