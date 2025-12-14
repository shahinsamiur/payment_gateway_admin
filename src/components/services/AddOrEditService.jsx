import { Add, RemoveCircle } from "@mui/icons-material";
import {
  Button,
  FormLabel,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Modal from "../common/Modal";

const AddOrEditService = ({ data, open, onClose, isLoading, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      features: [],
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
        features: data.features?.map((f, i) => ({ id: i, value: f })) || [],
      });
    }
    if (!data?.features?.length) {
      appendFeature({ id: 0, value: "" });
    }
  }, [data]);

  const {
    fields: featuresFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  async function onSubmit(payload) {
    payload.features = payload.features.map((f) => f.value);
    await onFormSubmit(payload);
    reset({
      title: "",
      description: "",
      features: [""],
    });
  }

  return (
    <Modal
      title={`${data ? "Edit" : "Add new"} service`}
      open={open}
      onClose={onClose}
    >
      <Stack spacing={1} component="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Typography>Service title</Typography>
          <OutlinedInput
            {...register("title", { required: "Title is required" })}
            placeholder="Enter service title"
            fullWidth
            error={!!errors?.title}
          />
          <FormLabel error>{errors?.title?.message}</FormLabel>
        </div>
        <div>
          <Typography>Service description</Typography>
          <OutlinedInput
            multiline
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter service description"
            fullWidth
            error={!!errors?.description}
          />
          <FormLabel error>{errors?.description?.message}</FormLabel>
        </div>

        <div>
          <Typography>Features</Typography>
          <Stack gap={1}>
            {featuresFields.map((feature, index) => (
              <Controller
                control={control}
                name={`features.${index}.value`}
                rules={{ required: `Feature ${index + 1} is required` }}
                key={index}
                render={({ field, fieldState: { error } }) => (
                  <Stack
                    key={index}
                    gap={1}
                    sx={{ position: "relative" }}
                    direction="row"
                    alignItems="center"
                  >
                    <OutlinedInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={`Enter feature ${index + 1}`}
                      fullWidth
                      error={!!error}
                    />
                    {index === featuresFields.length - 1 && (
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() =>
                          appendFeature({ id: index + 1, value: "" })
                        }
                      >
                        <Add />
                      </Button>
                    )}
                    {index !== featuresFields.length - 1 && (
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", right: 0, top: -15 }}
                        type="button"
                        onClick={() => removeFeature(index)}
                      >
                        <RemoveCircle color="error" />
                      </IconButton>
                    )}
                  </Stack>
                )}
              />
            ))}
          </Stack>
        </div>
        <div>
          <Button
            loading={isLoading}
            sx={{ mt: 2 }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </div>
      </Stack>
    </Modal>
  );
};

export default AddOrEditService;
