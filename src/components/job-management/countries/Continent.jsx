import Alert from "@/components/common/Alert";
import { useDeleteContinentMutation } from "@/redux/features/jobs";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AddContinent from "./AddContinent";

function Continent({ continent, loadingContinent }) {
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteLoaing, setDeleteLoading] = useState(-1);

  const [deleteContinent] = useDeleteContinentMutation();

  const handleDelete = async () => {
    try {
      const id = showDeleteModal;
      setShowDeleteModal(0);
      setDeleteLoading(id);
      await deleteContinent(id);
      toast.success("Continent deleted successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    } finally {
      setDeleteLoading(-1);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack
            mb={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">Continent</Typography>
            <Tooltip title="Add Continent" placement="top" arrow>
              <Button onClick={() => setOpenAddModal(true)} variant="contained">
                <Add />
              </Button>
            </Tooltip>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Continent Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingContinent ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : continent?.data?.length ? (
                  continent?.data?.map((continent) => (
                    <TableRow key={continent.id}>
                      <TableCell>{continent.id}</TableCell>
                      <TableCell>{continent.country_category_name}</TableCell>

                      <TableCell align="right">
                        <IconButton onClick={() => setEditData(continent)}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          disabled={deleteLoaing === continent.id}
                          onClick={() => setShowDeleteModal(continent.id)}
                        >
                          {deleteLoaing === continent.id ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Delete fontSize="small" color="error" />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No Continent Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <AddContinent
        open={openAddModal || !!editData}
        handleClose={() => {
          setOpenAddModal(false);
          setEditData(null);
        }}
        editData={editData}
      />
      <Alert
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(0)}
        onConfirm={handleDelete}
        title="Delete Continent"
        description="Are you sure you want to delete this Continent?"
      />
    </>
  );
}

export default Continent;
