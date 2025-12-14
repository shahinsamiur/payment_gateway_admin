import Alert from "@/components/common/Alert";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "@/redux/features/jobs";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
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
import AddSubCategory from "./AddSubCategory";

function SubCategories({ categories }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [editData, setEditData] = useState(null);
  const { data: suCategories, isLoading: loadingSubCategory } =
    useGetSubCategoriesQuery();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [deleteLoaing, setDeleteLoading] = useState(-1);

  const handleDelete = async () => {
    try {
      const id = showDeleteModal;
      setShowDeleteModal(0);
      setDeleteLoading(id);
      await deleteSubCategory(id).unwrap();
      toast.success("Sub Category deleted successfully");
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
      <Card sx={{ flexGrow: 1 }}>
        <CardContent>
          <Stack
            mb={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">Sub Categories</Typography>
            <Tooltip title="Add Sub Category" placement="top" arrow>
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
                  <TableCell>Sub Category Name</TableCell>
                  <TableCell>Parent Category</TableCell>
                  <TableCell>Minimum pay</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingSubCategory ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : suCategories?.data?.length ? (
                  suCategories?.data?.map((subCategory) => (
                    <TableRow key={subCategory.id}>
                      <TableCell>{subCategory.id}</TableCell>
                      <TableCell>{subCategory.sub_category_name}</TableCell>
                      <TableCell>
                        {subCategory.parent_category?.category_name}
                      </TableCell>
                      <TableCell>{subCategory.minimum_pay}</TableCell>
                      <TableCell>
                        <Chip
                          label={
                            parseInt(subCategory.status) ? "Active" : "Inactive"
                          }
                          color={
                            parseInt(subCategory.status) ? "default" : "error"
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => setEditData(subCategory)}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          disabled={deleteLoaing === subCategory.id}
                          onClick={() => setShowDeleteModal(subCategory.id)}
                        >
                          {deleteLoaing === subCategory.id ? (
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
                    <TableCell colSpan={4} align="center">
                      No Sub Categories Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <AddSubCategory
        open={openAddModal || !!editData}
        editData={editData}
        categories={categories}
        handleClose={() => {
          setOpenAddModal(false);
          setEditData(null);
        }}
      />
      <Alert
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(0)}
        onConfirm={handleDelete}
        title="Delete Sub Category"
        description="Are you sure you want to delete this sub category?"
      />
    </>
  );
}

export default SubCategories;
