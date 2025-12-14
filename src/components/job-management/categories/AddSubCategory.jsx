import Modal from "@/components/common/Modal";
import Switch from "@/components/common/Switch";
import {
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "@/redux/features/jobs";
import {
  Button,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddSubCategory({ open, handleClose, editData, categories }) {
  const [addSubCategory, { isLoading: addLoading }] =
    useAddSubCategoryMutation();
  const [updateSubCategory, { isLoading: updateLoading }] =
    useUpdateSubCategoryMutation();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sub_category_name: "",
      parent_category_id: "",
      minimum_pay: 0.001,
      status: 1,
    },
  });

  useEffect(() => {
    if (editData) {
      setValue("sub_category_name", editData.sub_category_name);
      setValue("parent_category_id", editData.parent_category?.id);
      setValue("minimum_pay", editData.minimum_pay);
      setValue("status", parseInt(editData.status));
    } else {
      setValue("sub_category_name", "");
      setValue("parent_category_id", "");
    }
  }, [editData, setValue]);

  const watchedParentCategoryId = watch("parent_category_id");

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await updateSubCategory({
          id: editData.id,
          data: data,
        }).unwrap();
        toast.success("Sub Category updated successfully");
      } else {
        await addSubCategory(data).unwrap();
        toast.success("Sub Category added successfully");
        reset();
      }
      handleClose();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <Modal
      title={`${!!editData ? "Edit" : "Add"} Sub Category`}
      open={open}
      onClose={handleClose}
    >
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={0.5}>
          <Typography variant="caption">Parent Category</Typography>
          <Select
            {...register("parent_category_id", {
              required: "Parent category is required",
            })}
            input={<OutlinedInput size="small" />}
            error={!!errors.parent_category_id}
            displayEmpty
            value={watchedParentCategoryId || ""}
          >
            <MenuItem
              value=""
              disabled
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              Select Parent Category
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.category_name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.parent_category_id}>
            {errors.parent_category_id?.message}
          </FormHelperText>
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="caption">Sub Category Name</Typography>
          <OutlinedInput
            size="small"
            {...register("sub_category_name", {
              required: "Sub Category Name is required",
            })}
            placeholder="Enter Sub Category Name"
            error={!!errors.sub_category_name}
          />
          <FormHelperText error={!!errors.sub_category_name}>
            {errors.sub_category_name?.message}
          </FormHelperText>
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="caption">Minimum pay per task</Typography>
          <OutlinedInput
            size="small"
            {...register("minimum_pay", {
              required: "Minimum pay is required",
            })}
            placeholder="Add a minimum pay per task"
            error={!!errors.minimum_pay}
          />
          <FormHelperText error={!!errors.minimum_pay}>
            {errors.minimum_pay?.message}
          </FormHelperText>
        </Stack>

        <Stack>
          <Typography variant="caption">Active</Typography>
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label="Active"
                sx={{ whiteSpace: "nowrap" }}
              />
            )}
          />
        </Stack>

        <Button
          loading={addLoading || updateLoading}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </Modal>
  );
}

export default AddSubCategory;
