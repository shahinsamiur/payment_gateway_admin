import Alert from "@/components/common/Alert";
import { useDeleteCategoryMutation } from "@/redux/features/jobs";
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
import AddCategory from "./AddCategory";

function Categories({ categories, loadingCategory }) {
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteLoaing, setDeleteLoading] = useState(-1);
  const [editData, setEditData] = useState(null);

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      const id = showDeleteModal;
      setShowDeleteModal(0);
      setDeleteLoading(id);
      await deleteCategory(id);
      toast.success("Category deleted successfully");
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
            <Typography variant="h6">Categories</Typography>
            <Tooltip title="Add Category" placement="top" arrow>
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
                  <TableCell>Category Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingCategory ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : categories?.data?.length ? (
                  categories?.data?.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.category_name}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => setEditData(category)}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          disabled={deleteLoaing === category.id}
                          onClick={() => setShowDeleteModal(category.id)}
                        >
                          {deleteLoaing === category.id ? (
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
                      No Categories Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <AddCategory
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
        title="Delete Category"
        description="Are you sure you want to delete this category?"
      />
    </>
  );
}

export default Categories;
