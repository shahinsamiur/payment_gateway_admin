import { RemoveRedEye } from "@mui/icons-material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Modal from "../common/Modal";

const ViewDetails = ({ open, onClose, data }) => {
  const dataset = [
    {
      name: "Transaction ID",
      value: data.transaction_id,
    },
    {
      name: "Paym   ent Gateway",
      value: data.payment_gateway,
    },
    {
      name: "Transaction Type",
      value: data.transaction_type,
    },
    {
      name: "User",
      value: data.user_id,
      link: `/user-management/user/${data.user_id}`,
    },
    {
      name: "Job",
      value: data.job_id,
      link: `/job-management/job-details/${data.job_id}`,
    },
    {
      name: "Submission",
      value: data.submission_id,
      link: `/job-management/job-details/job-submissions/submission/${data.submission_id}`,
    },
    {
      name: "Apay Deposit ID",
      value: data.apay_deposit_transaction_id,
    },
    {
      name: "Apay Withdrawal ID",
      value: data.apay_withdraw_transaction_id,
    },
    {
      name: "Ticket ID",
      value: data.daily_draw_ticket_id,
    },
    {
      name: "Winner ID",
      value: data.daily_draw_winner_id,
    },
    {
      name: "Manual Deposit Withdraw ID",
      value: data.deposit_withdraw_manual_id,
    },
  ];

  return (
    <Modal open={open} onClose={onClose} title="Transaction Details">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset.map((item, index) => {
              if (!item.value) return null;
              return (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.link ? (
                      <Link href={item.link}>
                        <Button
                          variant="contained"
                          startIcon={<RemoveRedEye />}
                        >
                          View
                        </Button>
                      </Link>
                    ) : (
                      item.value
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
};

export default ViewDetails;
