import {
  useAddBankTransferDetailsMutation,
  useUpdateBankTransferDetailsMutation,
} from "@/redux/features/financials";
import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../common/Modal";
import Switch from "../common/Switch";

function AddUpdateBankTransfer({ open, onClose, data }) {
  const [addPaymentMethod, { isLoading }] = useAddBankTransferDetailsMutation();
  const [updatePaymentMethod, { isLoading: isUpdating }] =
    useUpdateBankTransferDetailsMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bank_name: data?.bank_name || "",
      bank_branch: data?.bank_branch || "",
      account_name: data?.account_name || "",
      account_number: data?.account_number || "",
      routing_number: data?.routing_number || "",
      swift_code: data?.swift_code || "",
      status: data?.status || true,
      type: "deposit",
    },
  });

  const onSubmit = async (payload) => {
    try {
      if (data) {
        await updatePaymentMethod({ id: data.id, data: payload }).unwrap();
        toast.success("Payment gateway updated successfully");
      } else {
        await addPaymentMethod(payload).unwrap();
        toast.success("Payment gateway added successfully");
      }
      onClose();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    }
  };

  return (
    <Modal
      title={`${data ? "Update" : "Add"} Mobile Banking Account`}
      open={open}
      onClose={onClose}
    >
      <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Typography>Bank Name</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Bank Name"
            {...register("bank_name", {
              required: "Bank name is required",
            })}
            error={!!errors.bank_name}
          />
          {errors.bank_name && (
            <FormHelperText error>{errors.bank_name.message}</FormHelperText>
          )}
        </div>
        <div>
          <Typography>Branch Name</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Branch Name"
            {...register("bank_branch", {
              required: "Branch name is required",
            })}
            error={!!errors.bank_branch}
          />
          {errors.bank_branch && (
            <FormHelperText error>{errors.bank_branch.message}</FormHelperText>
          )}
        </div>

        <div>
          <Typography>Account Name</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Account Name"
            {...register("account_name", {
              required: "Account name is required",
            })}
            error={!!errors.account_name}
          />
          {errors.account_name && (
            <FormHelperText error>{errors.account_name.message}</FormHelperText>
          )}
        </div>

        <div>
          <Typography>Account Number</Typography>
          <OutlinedInput
            fullWidth
            type="number"
            placeholder="Account Number"
            {...register("account_number", {
              required: "Account number is required",
            })}
            error={!!errors.account_number}
          />
          {errors.account_number && (
            <FormHelperText error>
              {errors.account_number.message}
            </FormHelperText>
          )}
        </div>

        <div>
          <Typography>Routing Number</Typography>
          <OutlinedInput
            fullWidth
            type="number"
            placeholder="Routing Number"
            {...register("routing_number", {
              required: "Routing number is required",
            })}
            error={!!errors.routing_number}
          />
          {errors.routing_number && (
            <FormHelperText error>
              {errors.routing_number.message}
            </FormHelperText>
          )}
        </div>

        <div>
          <Typography>Swift Code</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Swift Code"
            {...register("swift_code", {
              required: "Swift code is required",
            })}
            error={!!errors.swift_code}
          />
          {errors.swift_code && (
            <FormHelperText error>{errors.swift_code.message}</FormHelperText>
          )}
        </div>

        <FormControl>
          <Typography>Status (Active/Inactive)</Typography>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          loading={isLoading || isUpdating}
        >
          Submit
        </Button>
      </Stack>
    </Modal>
  );
}

export default AddUpdateBankTransfer;
