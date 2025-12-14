import { Button, FormLabel, OutlinedInput, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../common/Modal";

const EditOrAddAnnouncement = ({
  open,
  onClose,
  data,
  onFormSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      announcement: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        announcement: data.announcement,
      });
    }
  }, [data]);

  async function onSubmit(data) {
    await onFormSubmit(data);
    reset();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${data ? "Edit" : "Add new"} announcement}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Announcement</Typography>
        <OutlinedInput
          placeholder="Enter announcement"
          {...register("announcement", {
            required: "Announcement is required",
          })}
          multiline
          rows={5}
          fullWidth
          error={!!errors.announcement}
        />
        <FormLabel error={!!errors.announcement}>
          {errors.announcement?.message}
        </FormLabel>
        <Button
          loading={isLoading}
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default EditOrAddAnnouncement;
