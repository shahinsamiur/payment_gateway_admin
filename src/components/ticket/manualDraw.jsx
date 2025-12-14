"use client";
import { useDrawWinnersMutation } from "@/redux/features/ticket";
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ManualDraw() {
  const [winners, setWinners] = useState([]);
  const [drawWinners, { isLoading }] = useDrawWinnersMutation();

  const handleDrawWinners = async () => {
    try {
      const res = await drawWinners().unwrap();
      toast.success("Winners drawn successfully");
      const winnersData = res.data?.winners || [];
      setWinners(winnersData);
    } catch (err) {
      toast.error(err.data?.message || "Internal Server Error");
    }
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5">Manual Winner Selection</Typography>
          <Button
            variant="contained"
            onClick={handleDrawWinners}
            loading={isLoading}
          >
            Draw
          </Button>
        </Box>

        {/* Winners Table */}
        {winners.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ticket ID</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Prize</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {winners.map((winner, index) => (
                <TableRow key={winner.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{winner.users?.name || "N/A"}</TableCell>
                  <TableCell>{winner.users?.email || "N/A"}</TableCell>
                  <TableCell>{winner.ticket_id}</TableCell>
                  <TableCell>{winner.rank}</TableCell>
                  <TableCell>{winner.prize_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
