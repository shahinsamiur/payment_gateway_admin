import { Card, CardContent, Stack, Typography } from "@mui/material";
import { DatePicker, DateField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useGetTransactionDataQuery } from "@/redux/features/dashboard";

function TransactionRecords() {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const { data } = useGetTransactionDataQuery({
    start_date: startDate.format("YYYY-MM-DD"),
    end_date: endDate.format("YYYY-MM-DD"),
  });

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          flexWrap="wrap"
        >
          <Typography variant="h6">Transaction Records</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2}>
              <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slots={{ field: DateField }}
                slotProps={{
                  field: {
                    placeholder: "Start date",
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
              <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slots={{ field: DateField }}
                slotProps={{
                  field: {
                    placeholder: "End date",
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Stack>
          </LocalizationProvider>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TransactionRecords;
