import { useUpdatePremiumFeaturesMutation } from "@/redux/features/premium";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Modal from "../common/Modal";
import Switch from "../common/Switch";

const schema = yup.object().shape({
  duration: yup.string().required("Duration is required"),
  price: yup.string().required("Price is required"),
  feature: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required("Feature is required"),
      })
    )
    .min(1, "At least one feature is required"),
});

export default function UpdatePackageForm({
  setOpenAddModal,
  data,
  open,
  onClose,
}) {
  const [updatePremiumFeatures, { isLoading }] =
    useUpdatePremiumFeaturesMutation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      duration: data.duration || "",
      price: data.price || "",
      feature: data.feature
        ? data.feature.map((feature, index) => ({ index, value: feature }))
        : [{ value: "" }],
      highlighted: data.highlighted || false,
      name: data.name || "",
      description: data.description || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "feature",
  });

  async function onSubmit(payload) {
    try {
      payload.feature = payload.feature.map((feature) => feature.value);
      await updatePremiumFeatures({ data: payload, id: data.id }).unwrap();
      toast.success("Package created successfully");
      setOpenAddModal(false);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
    }
  }

  return (
    <Modal width="40%" open={open} onClose={onClose} title="Update Package">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ width: { xs: "100%", sm: "100%", md: "100%" } }}
        >
          <div>
            <Typography variant="body1" component="label">
              Package Name
            </Typography>
            <OutlinedInput
              placeholder="Enter package name"
              {...register("name")}
              fullWidth
              error={!!errors.name}
            />
            <Typography variant="body1" color="error">
              {errors.name?.message}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" component="label">
              Duration
            </Typography>
            <OutlinedInput
              fullWidth
              placeholder="Enter duration (months)"
              type="number"
              {...register("duration")}
              error={!!errors.duration}
            />
            <Typography variant="body1" color="error">
              {errors.duration?.message}
            </Typography>
          </div>

          <div>
            <Typography variant="body1" component="label">
              Price
            </Typography>
            <OutlinedInput
              fullWidth
              placeholder="Enter price ($)"
              type="number"
              {...register("price")}
              error={!!errors.price}
            />
            <Typography variant="body1" color="error">
              {errors.price?.message}
            </Typography>
          </div>

          <div>
            <Typography variant="body1" component="label">
              Description
            </Typography>
            <OutlinedInput
              placeholder="Ennter description"
              {...register("description")}
              fullWidth
              error={!!errors.description}
            />
            <Typography variant="body1" color="error">
              {errors.description?.message}
            </Typography>
          </div>

          <div>
            <Typography variant="body1" component="label">
              Features
            </Typography>
            {fields.map((field, index) => (
              <div
                style={{ position: "relative", marginBottom: 8 }}
                key={field.id}
              >
                <Controller
                  name={`feature.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      placeholder={`Feature ${index + 1}`}
                      fullWidth
                      error={!!errors.feature?.[index]}
                    />
                  )}
                />

                {errors.feature?.[index] && (
                  <Typography variant="body2" color="error">
                    {errors.feature[index].value?.message}
                  </Typography>
                )}

                <IconButton
                  disabled={fields.length === 1}
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => remove(index)}
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </div>
            ))}
            <Stack alignItems="flex-end">
              <Button
                onClick={() => append({ id: fields.length + 1, value: "" })}
                variant="contained"
              >
                + Add Feature
              </Button>
            </Stack>
          </div>

          <div>
            <Typography variant="body1" component="label">
              Highlighted
            </Typography>
            <Controller
              name="highlighted"
              control={control}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </div>

          <Box mt={1}>
            <Button
              loading={isLoading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Update Package
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
