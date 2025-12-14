import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
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

function Transactions({ user }) {
  return (
    <Box>
      <Card sx={{ mt: 2, maxWidth: 800, mx: "auto" }}>
        <CardContent>
          <Typography variant="body1" mb={1} align="center">
            Transaction History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Complete Date</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.transactions?.length ? (
                  user.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.transaction_type}</TableCell>
                      <TableCell>
                        {new Date(transaction.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No Transaction Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {user.transactions?.length ? (
            <Stack alignItems="center" mt={2}>
              <Link href={`/financials/transaction-history?user_id=${user.id}`}>
                <Button variant="contained" startIcon={<RemoveRedEye />}>
                  View All
                </Button>
              </Link>
            </Stack>
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Transactions;
