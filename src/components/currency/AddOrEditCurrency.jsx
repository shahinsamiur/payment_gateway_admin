import Modal from "@/components/common/Modal";
import {
  useAddCurrencyMutation,
  useUpdateCurrencyMutation,
} from "@/redux/features/currency";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddOrEditCurrency({ open, handleClose, editData }) {
  const [updateCurrency, { isLoading: isUpdating }] =
    useUpdateCurrencyMutation();
  const [addCurrency, { isLoading: isAdding }] = useAddCurrencyMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from_currency: "",
      rate: "",
      to_currency: "",
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        from_currency: editData.from_currency,
        rate: editData.rate,
        to_currency: editData.to_currency,
      });
    }
  }, [editData]);

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await updateCurrency({
          id: editData.id,
          data: data,
        }).unwrap();
        toast.success("currency updated successfully");
      } else {
        await addCurrency(data).unwrap();
        toast.success("currency added successfully");
        reset();
      }
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      title={`${editData ? "Edit" : "Add"} currency`}
      open={open}
      onClose={handleClose}
    >
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <div>
            <Typography>Currency Name:</Typography>
            <OutlinedInput
              fullWidth
              {...register("from_currency", {
                required: "Currency Name is required",
                minLength: {
                  value: 3,
                  message: "Currency Name must be at least 3 characters",
                },
                maxLength: {
                  value: 3,
                  message: "Currency Name must be at most 3 characters",
                },
                pattern: {
                  value: /^[A-Z]{3}$/,
                  message: "Currency Name must be 3 uppercase letters",
                },
              })}
              placeholder="Enter Converted From Currency Name"
              error={!!errors.from_currency}
            />
            <FormHelperText error>
              {errors.from_currency?.message}
            </FormHelperText>
          </div>

          <div>
            <Typography>Currency Exchange Rate:</Typography>
            <OutlinedInput
              fullWidth
              {...register("rate", {
                required: "Currency Name is required",
              })}
              placeholder="Enter Currency Name"
              error={!!errors.rate}
            />
            <FormHelperText error>{errors.rate?.message}</FormHelperText>
          </div>

          <div>
            <Typography>Converted Currency Name:</Typography>
            <OutlinedInput
              fullWidth
              {...register("to_currency", {
                required: "Converted Currency Name is required",
                minLength: {
                  value: 3,
                  message: "Currency Name must be at least 3 characters",
                },
                maxLength: {
                  value: 3,
                  message: "Currency Name must be at most 3 characters",
                },
                pattern: {
                  value: /^[A-Z]{3}$/,
                  message: "Currency Name must be 3 uppercase letters",
                },
              })}
              placeholder="Enter Converted To Currency Name"
              error={!!errors.to_currency}
            />
            <FormHelperText error>
              {errors.from_currency?.message}
            </FormHelperText>
          </div>
        </Stack>

        <Button
          loading={isAdding || isUpdating}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </Modal>
  );
}

export default AddOrEditCurrency;
