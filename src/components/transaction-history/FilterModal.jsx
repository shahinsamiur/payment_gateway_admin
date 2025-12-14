import { Button, OutlinedInput, Stack, Typography } from "@mui/material";
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import Modal from "../common/Modal";

const FilterModal = ({ open, onClose, setFilter }) => {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [transactionId, setTransactionId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const filter = {
      date_from: startDate ? dayjs(startDate).format("YYYY-MM-DD") : "",
      date_to: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
      amount_min: minAmount,
      amount_max: maxAmount,
      transaction_id: transactionId,
    };
    setFilter((prev) => ({ ...prev, ...filter }));
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="More Filter">
      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <Typography>Start date</Typography>
            <DatePicker
              value={startDate}
              sx={{ width: "100%" }}
              onChange={(newValue) => setStartDate(newValue)}
              slots={{ field: DateField }}
              slotProps={{
                field: {
                  placeholder: "Start date",
                  size: "small",
                },
              }}
            />
          </div>

          <div>
            <Typography>End date</Typography>
            <DatePicker
              sx={{ width: "100%" }}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slots={{ field: DateField }}
              slotProps={{
                field: {
                  placeholder: "Start date",
                  size: "small",
                },
              }}
            />
          </div>
        </LocalizationProvider>
        <div>
          <Typography>Min amount</Typography>
          <OutlinedInput
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="Min amount"
            type="number"
            fullWidth
          />
        </div>
        <div>
          <Typography>Max amount</Typography>
          <OutlinedInput
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="Max amount"
            type="number"
            fullWidth
          />
        </div>
        <div>
          <Typography>Transaction ID</Typography>
          <OutlinedInput
            placeholder="Search by txn id"
            size="small"
            fullWidth
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </div>

        <Button type="submit" color="secondary" variant="contained" fullWidth>
          Apply Filter
        </Button>
      </Stack>
    </Modal>
  );
};

export default FilterModal;
