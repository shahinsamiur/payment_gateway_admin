import {
  useAddCryptoTransferDetailsMutation,
  useUpdateCryptoTransferDetailsMutation,
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

function AddUpdateCrypotoTransfer({ open, onClose, data }) {
  const [addPaymentMethod, { isLoading }] =
    useAddCryptoTransferDetailsMutation();
  const [updatePaymentMethod, { isLoading: isUpdating }] =
    useUpdateCryptoTransferDetailsMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      crypto_name: data?.crypto_name || "",
      wallet_address: data?.wallet_address || "",
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
          <Typography>Wallet Name</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Wallet Name"
            {...register("crypto_name", {
              required: "Wallet name is required",
            })}
            error={!!errors.crypto_name}
          />
          {errors.crypto_name && (
            <FormHelperText error>{errors.crypto_name.message}</FormHelperText>
          )}
        </div>
        <div>
          <Typography>Wallet Address</Typography>
          <OutlinedInput
            fullWidth
            placeholder="Wallet Address"
            {...register("wallet_address", {
              required: "Wallet address is required",
            })}
            error={!!errors.wallet_address}
          />
          {errors.wallet_address && (
            <FormHelperText error>
              {errors.wallet_address.message}
            </FormHelperText>
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

export default AddUpdateCrypotoTransfer;
