import { useUserVerificationStatusUpdateMutation } from "@/redux/features/user";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../common/Modal";
import ZoomImage from "../common/ZoomImage";

function VerificationDetails({ open, onClose, data }) {
  const [updateStatus] = useUserVerificationStatusUpdateMutation();
  const [updating, setUpdating] = useState("");

  const tableContent = [
    {
      label: "Card Type",
      value: data.id_type,
    },
    {
      label: "Full Name",
      value: data.full_name,
    },
    {
      label: "Card Number",
      value: data.card_number,
    },
  ];

  async function handleVerify(id, status) {
    try {
      setUpdating(status);
      await updateStatus({ id, data: { status } }).unwrap();
      toast.success("Status updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    } finally {
      setUpdating("");
    }
  }

  return (
    <Modal
      title="Verification Request Details"
      open={open}
      onClose={onClose}
      width="50%"
    >
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        alignItems="center"
        mb={3}
      >
        <ZoomImage img={data.front_image} />
        <ZoomImage img={data.selfie_image} />
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Typography variant="body1">Card Information</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableContent.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction="row"
        justifyContent="center"
        mt={3}
        gap={1}
        alignItems="center"
      >
        <Button
          onClick={() => {
            handleVerify(data.id, "APPROVED");
          }}
          variant="contained"
          color="primary"
          loading={updating === "APPROVED"}
        >
          Verify
        </Button>
        <Button
          onClick={() => {
            handleVerify(data.id, "REJECTED");
          }}
          variant="contained"
          color="error"
          loading={updating === "REJECTED"}
        >
          Reject
        </Button>
      </Stack>
    </Modal>
  );
}

export default VerificationDetails;
