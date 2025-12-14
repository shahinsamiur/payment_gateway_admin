import Modal from "@/components/common/Modal";
import {
  useAddContinentMutation,
  useUpdateContinentMutation,
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

function AddContinent({ open, handleClose, editData }) {
  const [addContinent, { isLoading }] = useAddContinentMutation();
  const [updateContinent, { isLoading: updateLoading }] =
    useUpdateContinentMutation();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country_category_name: "",
    },
  });

  useEffect(() => {
    if (editData?.country_category_name) {
      setValue("country_category_name", editData.country_category_name);
    } else {
      setValue("country_category_name", "");
    }
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await updateContinent({
          id: editData.id,
          data: data,
        }).unwrap();
        toast.success("Continent updated successfully");
      } else {
        await addContinent(data).unwrap();
        toast.success("Continent added successfully");
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
      title={`${!!editData ? "Edit" : "Add"} Continent`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Typography variant="caption">Continent Name</Typography>
          <OutlinedInput
            size="small"
            error={!!errors.country_category_name}
            {...register("country_category_name", {
              required: "Continent Name is required",
            })}
            placeholder="Please enter text"
          />

          <FormHelperText error={!!errors.country_category_name}>
            {errors.country_category_name?.message}
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

export default AddContinent;
