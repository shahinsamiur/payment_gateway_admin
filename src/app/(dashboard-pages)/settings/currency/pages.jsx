"use client";
import Alert from "@/components/common/Alert";
import AddOrEditCurrency from "@/components/currency/AddOrEditCurrency";
import {
  useDeleteCurrencyMutation,
  useGetcurrencyConversionRateQuery,
} from "@/redux/features/currency";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
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

function CurrencyPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const { data: currenceyConversionRate, isLoading } =
    useGetcurrencyConversionRateQuery();
  const [deleteCurrency] = useDeleteCurrencyMutation();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(0);
  const [EditData, setEditData] = useState("");

  const handleCloseDeleteModal = () => setShowDeleteModal(0);

  const handleDelete = async () => {
    try {
      const id = showDeleteModal;
      setShowDeleteModal(0);
      setIsDeleting(id);
      await deleteCurrency(id).unwrap();
      toast.success("Currency deleted successfully");
    } catch (error) {
      toast.success(error.data.message || "Internal Server Error");
    } finally {
      setIsDeleting(0);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Currencey rate settings</Typography>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>From Currency</TableCell>
                  <TableCell>To Currency</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="right">
                    <Button
                      startIcon={<Add />}
                      onClick={() => setShowModal(true)}
                      variant="contained"
                      color="secondary"
                    >
                      New Currency
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : currenceyConversionRate ? (
                  currenceyConversionRate?.map((currencey, index) => (
                    <TableRow key={currencey.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{currencey?.from_currency}</TableCell>
                      <TableCell>{currencey?.to_currency}</TableCell>
                      <TableCell>{currencey?.rate}</TableCell>
                      <TableCell>
                        {new Date(currencey?.updated_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          onClick={() => {
                            setShowModal(true);
                            setEditData(currencey);
                          }}
                          size="small"
                          startIcon={<Edit fontSize="small" />}
                          variant="contained"
                        >
                          Edit
                        </Button>
                        <Button
                          loading={isDeleting == currencey.id}
                          onClick={() => setShowDeleteModal(currencey.id)}
                          size="small"
                          startIcon={<Delete fontSize="small" />}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {showModal && (
        <AddOrEditCurrency
          open={showModal}
          handleClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
          editData={EditData}
        />
      )}
      <Alert
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Delete Currency"
        description="Are you sure you want to delete this currency?"
        onConfirm={handleDelete}
      />
    </Stack>
  );
}

export default CurrencyPage;
