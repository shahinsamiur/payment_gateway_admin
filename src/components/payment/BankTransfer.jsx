import {
  useDeleteBankTransferDetailsMutation,
  useUpdateBankTransferDetailsMutation,
} from "@/redux/features/financials";
import { Add, Delete, EditSquare } from "@mui/icons-material";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Switch from "../common/Switch";
import AddUpdateBankTransfer from "./AddUpdateBankTransfer";

export default function BankTransfer({ data, isLoading }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bank Name</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>AC Name</TableCell>
              <TableCell>AC Number</TableCell>
              <TableCell>Routing Number</TableCell>
              <TableCell>Swift Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">
                <Button
                  startIcon={<Add />}
                  onClick={() => setShowAddModal(true)}
                  variant="contained"
                  color="secondary"
                >
                  Add New
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.length ? (
              data.map((item) => <List key={item.id} item={item} />)
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {showAddModal && (
        <AddUpdateBankTransfer
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
}

function List({ item }) {
  const [showUpdateModateModal, setShowUpdateModateModal] = useState(false);
  const [deletePaymentGateway] = useDeleteBankTransferDetailsMutation();
  const [updatedGateWayStatus] = useUpdateBankTransferDetailsMutation();
  const [isDeleting, setIsDeleting] = useState(-1);
  const [isUpdating, setIsUpdating] = useState(-1);

  async function handleDelete(id) {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this payment gateway?"
      );
      if (!confirm) return;
      setIsDeleting(id);
      await deletePaymentGateway(id).unwrap();
      toast.success("Payment gateway deleted successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setIsDeleting(-1);
    }
  }

  async function handleUpdateStatus(id, status) {
    try {
      setIsUpdating(id);
      await updatedGateWayStatus({ id, data: { status } }).unwrap();
      toast.success("Payment gateway status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setIsUpdating(-1);
    }
  }

  return (
    <>
      <TableRow key={item.id}>
        <TableCell>{item.bank_name}</TableCell>
        <TableCell>{item.bank_branch}</TableCell>
        <TableCell>{item.account_name}</TableCell>
        <TableCell>{item.account_number}</TableCell>
        <TableCell>{item.routing_number}</TableCell>
        <TableCell>{item.swift_code}</TableCell>
        <TableCell>
          <Switch
            checked={item.status}
            onChange={(e) => handleUpdateStatus(item.id, e.target.checked)}
            disabled={isUpdating === item.id}
          />
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <Button
              variant="contained"
              size="small"
              color="info"
              startIcon={<EditSquare fontSize="small" />}
              onClick={() => setShowUpdateModateModal(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              loading={isDeleting === item.id}
              onClick={() => handleDelete(item.id)}
              startIcon={<Delete fontSize="small" />}
            >
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <AddUpdateBankTransfer
        data={item}
        open={showUpdateModateModal}
        onClose={() => setShowUpdateModateModal(false)}
      />
    </>
  );
}
