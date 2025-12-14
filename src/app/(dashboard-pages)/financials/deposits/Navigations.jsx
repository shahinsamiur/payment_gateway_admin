import { useGetTransactionQueriesQuery } from "@/redux/features/financials";
import { MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

const Navigation = ({
  paymentMethod,
  setPaymentMethod,
  status,
  setStatus,
  transactionId,
  setTransactionId,
}) => {
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const { data } = useGetTransactionQueriesQuery();

  useEffect(() => {
    if (data) {
      const paymentMethods = data.payment_gateways?.map((item) => {
        return { label: item.replace(/_/g, " ").toUpperCase(), value: item };
      });
      const statusOptions = data.statuses?.map((item) => {
        return { label: item.replace(/_/g, " ").toUpperCase(), value: item };
      });

      setPaymentMethodOptions(paymentMethods);
      setStatusOptions(statusOptions);
    }
  }, [data]);

  return (
    <Stack alignItems="flex-end" mb={2}>
      <Stack direction="row" gap={2} flexWrap="wrap">
        <OutlinedInput
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          input={<OutlinedInput size="small" />}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>Status</em>
          </MenuItem>
          <MenuItem value="">All</MenuItem>
          {statusOptions.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          input={<OutlinedInput size="small" />}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>Payment Method</em>
          </MenuItem>
          <MenuItem value="">All</MenuItem>
          {paymentMethodOptions.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default Navigation;
