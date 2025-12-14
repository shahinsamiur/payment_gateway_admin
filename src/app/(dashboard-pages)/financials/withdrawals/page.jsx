"use client";

import WithdrawTransactions from "@/components/withdraw/WithdrawTransactions";
import { useDebouncer } from "@/hooks/useDebouncer";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import Navigation from "../deposits/Navigations";

function Page() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const tnxId = useDebouncer(transactionId, 500);
  const [status, setStatus] = useState("");

  return (
    <Box>
      <Typography variant="h4">Withdrawal history</Typography>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Navigation
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            status={status}
            setStatus={setStatus}
            transactionId={transactionId}
            setTransactionId={setTransactionId}
          />

          <WithdrawTransactions
            status={status}
            paymentMethod={paymentMethod}
            tnxId={tnxId}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default Page;
