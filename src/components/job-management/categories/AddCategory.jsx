import Modal from "@/components/common/Modal";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/jobs";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddCategory({ open, handleClose, editData }) {
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category_name: "",
    },
  });

  useEffect(() => {
    if (editData?.category_name) {
      setValue("category_name", editData.category_name);
    } else {
      setValue("category_name", "");
    }
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await updateCategory({
          id: editData.id,
          data: data,
        }).unwrap();
        toast.success("Category updated successfully");
      } else {
        await addCategory(data).unwrap();
        toast.success("Category added successfully");
        reset();
      }
      handleClose();
    } catch (error) {
      toast.error(
        error.data?.message || error.message || "Something went wrong"
      );
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`${!!editData ? "Edit" : "Add"} Category`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Typography variant="caption">Category Name</Typography>
          <OutlinedInput
            size="small"
            error={!!errors.category_name}
            {...register("category_name", {
              required: "Category Name is required",
            })}
            placeholder="Please enter text"
          />

          <FormHelperText error={!!errors.category_name}>
            {errors.category_name?.message}
          </FormHelperText>
        </Stack>
        <Button
          loading={isLoading || updateLoading}
          sx={{ marginTop: 2, width: "100%" }}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </form>
    </Modal>
  );
}

export default AddCategory;
