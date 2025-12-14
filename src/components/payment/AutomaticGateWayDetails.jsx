import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Modal from "../common/Modal";

const AutomaticGateWayDetails = ({ open, onClose, item }) => {
  const data = { ...item };
  data.deposit_frontend_data =
    typeof data.deposit_frontend_data === "string"
      ? JSON.parse(data.deposit_frontend_data)
      : data.deposit_frontend_data;
  data.withdrawal_frontend_data =
    typeof data.withdrawal_frontend_data === "string"
      ? JSON.parse(data.withdrawal_frontend_data)
      : data.withdrawal_frontend_data;

  const dataset = [
    {
      name: "Name",
      value: data.name,
    },
    {
      name: "Title",
      value: data.description,
    },
    {
      name: "Currency",
      value: data.currency,
    },
    {
      name: "Minimum Deposit",
      value: data.min_deposit,
    },
    {
      name: "Maximum Deposit",
      value: data.max_deposit,
    },
    {
      name: "Minimum Withdrawal",
      value: data.min_withdrawals,
    },
    {
      name: "Maximum Withdrawal",
      value: data.max_withdrawals,
    },
  ];

  if (item.type === "apay") {
    dataset.push(
      {
        name: "Data Field For Deposit",
        value: data.deposit_frontend_data?.form_fields
          ?.map((item) => item.key)
          ?.join(", "),
      },
      {
        name: "Data Field For Withdrawal",
        value: data.withdrawal_frontend_data?.form_fields
          ?.map((item) => item.key)
          ?.join(" | "),
      }
    );
  }

  return (
    <Modal open={open} onClose={onClose} title="Payment Gateway Details">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
};

export default AutomaticGateWayDetails;
