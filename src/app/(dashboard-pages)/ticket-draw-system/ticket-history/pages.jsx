"use client";
import { config } from "@/config/config";
import { useOngoingTicketBuyerListQuery } from "@/redux/features/ticket";
import {
  Box,
  Card,
  CardContent,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { Fragment, useState } from "react";

export default function Page() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useOngoingTicketBuyerListQuery({ page });

  const columns = [
    { id: "ticket_number", label: "Ticket #" },
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "purchase_date", label: "Purchased At" },
    { id: "draw_date", label: "Draw Date" },
    { id: "draw_status", label: "Draw Status" },
  ];

  const ticketData = data?.data?.data ?? [];
  const totalRows = data?.data?.total || 0;
  const totalPage = data?.data?.last_page || 1;

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent>
          {/* Header */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">Ticket purchase history</Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.id}>{col.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : ticketData.length ? (
                  ticketData.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.ticket_number}</TableCell>
                      <TableCell>{ticket.user?.username ?? "-"}</TableCell>
                      <TableCell>{ticket.user?.email ?? "-"}</TableCell>
                      <TableCell>
                        {new Date(ticket.purchase_date).toLocaleDateString(
                          "en-BN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {ticket.daily_draws?.draw_date
                          ? new Date(
                              ticket.daily_draws?.draw_date
                            ).toLocaleDateString("en-BN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                          : "-"}
                      </TableCell>
                      <TableCell>{ticket.daily_draws?.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack alignItems="flex-end" mt={2}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={(e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
}
