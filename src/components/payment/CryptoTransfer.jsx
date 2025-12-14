import {
  useDeleteCryptoTransferDetailsMutation,
  useUpdateCryptoTransferDetailsMutation,
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
import AddUpdateCrypotoTransfer from "./AddUpdateCrypotoTransfer";

export default function CryptoTransfer({ data, isLoading }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Wallet Name</TableCell>
              <TableCell>Wallet Address</TableCell>
              <TableCell>Created / Modified Date</TableCell>
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
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.length ? (
              data.map((item) => <List key={item.id} item={item} />)
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {showAddModal && (
        <AddUpdateCrypotoTransfer
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
}

function List({ item }) {
  const [showUpdateModateModal, setShowUpdateModateModal] = useState(false);
  const [deletePaymentGateway] = useDeleteCryptoTransferDetailsMutation();
  const [updatedGateWayStatus] = useUpdateCryptoTransferDetailsMutation();
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
        <TableCell>{item.crypto_name}</TableCell>
        <TableCell>{item.wallet_address}</TableCell>
        <TableCell>
          {new Date(item.updated_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </TableCell>
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
      <AddUpdateCrypotoTransfer
        data={item}
        open={showUpdateModateModal}
        onClose={() => setShowUpdateModateModal(false)}
      />
    </>
  );
}
