import {
  useAddMobileBankingPaymentGatewayMutation,
  useUpdateMobileBankingPaymentGatewayMutation,
} from "@/redux/features/financials";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../common/Modal";
import Switch from "../common/Switch";

function AddUpdateMobileBank({ open, onClose, data }) {
  const [addPaymentMethod, { isLoading }] =
    useAddMobileBankingPaymentGatewayMutation();
  const [updatePaymentMethod, { isLoading: isUpdating }] =
    useUpdateMobileBankingPaymentGatewayMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile_banking_name: data?.mobile_banking_name || "",
      mobile_banking_number: data?.mobile_banking_number || "",
      status: data?.status || true,
      type: data?.type || "deposit",
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
          <Typography>Gateway Name</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Account Name"
            {...register("mobile_banking_name", {
              required: "Gateway name is required",
            })}
            error={!!errors.mobile_banking_name}
          />
          {errors.mobile_banking_name && (
            <FormHelperText error>
              {errors.mobile_banking_name.message}
            </FormHelperText>
          )}
        </div>
        <div>
          <Typography>Number</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Account Number"
            type="number"
            {...register("mobile_banking_number", {
              required: "Account number is required",
            })}
            error={!!errors.mobile_banking_number}
          />
          {errors.mobile_banking_number && (
            <FormHelperText error>
              {errors.mobile_banking_number.message}
            </FormHelperText>
          )}
        </div>

        <FormControl>
          <Typography>Type (Deposit/Withdraw)</Typography>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={!!errors.type}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                input={<OutlinedInput placeholder="Account Type" />}
                displayEmpty
                fullWidth
              >
                <MenuItem value="deposit">Deposit</MenuItem>
                <MenuItem value="withdraw">Withdrawal</MenuItem>
              </Select>
            )}
          />
          {errors.type && (
            <FormHelperText error>{errors.type.message}</FormHelperText>
          )}
        </FormControl>

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

export default AddUpdateMobileBank;
