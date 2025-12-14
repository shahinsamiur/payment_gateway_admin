import Modal from "@/components/common/Modal";
import {
  useAddCountryMutation,
  useUpdateCountryMutation,
} from "@/redux/features/jobs";
import {
  Button,
  FormHelperText,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddOrEditCountry({ open, handleClose, editData, continent }) {
  const [addCountry, { isLoading: addLoading }] = useAddCountryMutation();
  const [updateCountry, { isLoading: updateLoading }] =
    useUpdateCountryMutation();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country_name: "",
      country_category_id: "",
      short_name: "",
      country_code: "",
      currency: "",
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        country_name: editData.country_name,
        country_category_id: editData.categories[0]?.id,
        short_name: editData.short_name,
        country_code: editData.country_code,
        currency: editData.currency,
      });
    } else {
      reset();
    }
  }, [editData, setValue]);

  const continentId = watch("country_category_id");

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await updateCountry({
          id: editData.id,
          data: data,
        }).unwrap();
        toast.success("Country updated successfully");
      } else {
        await addCountry(data).unwrap();
        toast.success("Country added successfully");
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
      title={`${!!editData ? "Edit" : "Add"} Country`}
      open={open}
      onClose={handleClose}
    >
      <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={0.5}>
          <FormLabel>Parent category</FormLabel>
          <Select
            {...register("country_category_id", {
              required: "Continent is required",
            })}
            input={<OutlinedInput size="small" />}
            error={!!errors.country_category_id}
            displayEmpty
            value={continentId || ""}
          >
            <MenuItem
              value=""
              disabled
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              Select Continent
            </MenuItem>
            {continent?.map((continent) => (
              <MenuItem key={continent.id} value={continent.id}>
                {continent.country_category_name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.country_category_id}>
            {errors.country_category_id?.message}
          </FormHelperText>
        </Stack>

        <Stack spacing={0.5}>
          <FormLabel>Country name</FormLabel>
          <OutlinedInput
            size="small"
            {...register("country_name", {
              required: "Country name is required",
            })}
            placeholder="Enter country name"
            error={!!errors.country_name}
          />
          <FormHelperText error={!!errors.country_name}>
            {errors.country_name?.message}
          </FormHelperText>
        </Stack>

        <Stack spacing={0.5}>
          <FormLabel>Country short name</FormLabel>
          <OutlinedInput
            size="small"
            {...register("short_name", {
              required: "Country short name is required",
              minLength: {
                value: 2,
                message: "Country short name must be at least 2 characters",
              },
              maxLength: {
                value: 2,
                message: "Country short name must be at most 2 characters",
              },
            })}
            placeholder="Enter country short name"
            error={!!errors.short_name}
          />
          <FormHelperText error={!!errors.short_name}>
            {errors.short_name?.message}
          </FormHelperText>
        </Stack>

        <Stack spacing={0.5}>
          <FormLabel>Country code</FormLabel>
          <OutlinedInput
            size="small"
            {...register("country_code", {
              required: "Country Code is required",
            })}
            placeholder="Enter country code"
            error={!!errors.country_code}
          />
          <FormHelperText error={!!errors.country_code}>
            {errors.country_code?.message}
          </FormHelperText>
        </Stack>
        <Stack spacing={0.5}>
          <FormLabel>Currency</FormLabel>
          <OutlinedInput
            size="small"
            {...register("currency", {
              required: "Currency is required",
            })}
            placeholder="Enter currency"
            error={!!errors.currency}
          />
          <FormHelperText error={!!errors.currency}>
            {errors.currency?.message}
          </FormHelperText>
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

export default AddOrEditCountry;
