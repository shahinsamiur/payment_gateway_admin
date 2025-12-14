import { useAddManagerMutation } from "@/redux/features/manager";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Modal from "../common/Modal";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup
    .string()
    .length(11, "Phone number must be 11 digits")
    .required("Phone number is required"),
  manager_id: yup.string().required("Manager ID is required"),
});

const AddOrEditManager = ({ open, onClose, data }) => {
  const [addManager, { isLoading }] = useAddManagerMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone_number: data?.phone_number || "",
      manager_id: data?.manager_id || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await addManager(data).unwrap();
      toast.success("Manager added successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${data ? "Edit" : "Add"} Manager`}
    >
      <Stack onSubmit={handleSubmit(onSubmit)} component="form" spacing={2}>
        <div>
          <Typography>Manager Name</Typography>
          <OutlinedInput
            {...register("name", { required: "Name is required" })}
            placeholder="Enter name"
            fullWidth
            error={!!errors.name}
          />
          {errors.name && (
            <FormHelperText error>{errors.name.message}</FormHelperText>
          )}
        </div>
        <div>
          <Typography>Email</Typography>
          <OutlinedInput
            {...register("email", { required: "Email is required" })}
            placeholder="Enter email"
            fullWidth
            error={!!errors.email}
          />
          {errors.email && (
            <FormHelperText error>{errors.email.message}</FormHelperText>
          )}
        </div>
        <div>
          <Typography>Phone Number</Typography>
          <OutlinedInput
            type="number"
            fullWidth
            {...register("phone_number", {
              required: "Phone number is required",
            })}
            placeholder="Enter phone number"
            error={!!errors.phone_number}
          />
          {errors.phone_number && (
            <FormHelperText error>{errors.phone_number.message}</FormHelperText>
          )}
        </div>
        <div>
          <Typography>Manager ID</Typography>
          <OutlinedInput
            fullWidth
            {...register("manager_id", { required: "Manager ID is required" })}
            placeholder="Enter manager ID"
            error={!!errors.manager_id}
          />
          {errors.manager_id && (
            <FormHelperText error>{errors.manager_id.message}</FormHelperText>
          )}
        </div>
        <Button loading={isLoading} type="submit" variant="contained">
          Save Manager
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddOrEditManager;
