import { config } from "@/config/config";
import {
  useUpdateApayGatewayMutation,
  useUpdatePassimPayGateWayMutation,
} from "@/redux/features/financials";
import { Add, Delete, Visibility } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../common/Modal";
import Switch from "../common/Switch";
import InputFieldForm from "./InputFieldForm";

const EditAutomaticGateway = ({ open, onClose, item, type }) => {
  const data = { ...item };
  data.deposit_frontend_data =
    typeof data.deposit_frontend_data === "string"
      ? JSON.parse(data.deposit_frontend_data)
      : data.deposit_frontend_data;
  data.withdrawal_frontend_data =
    typeof data.withdrawal_frontend_data === "string"
      ? JSON.parse(data.withdrawal_frontend_data)
      : data.withdrawal_frontend_data;

  const [showInputForm, setShowInputForm] = useState(null);
  const [updateApayGateway, { isLoading }] = useUpdateApayGatewayMutation();
  const [updatePassimpayGateway, { isLoading: isLoadingPassimpay }] =
    useUpdatePassimPayGateWayMutation();
  const thumbnailRef = useRef(null);
  const emptyInput = {
    key: "",
    label: "",
    type: "text",
    placeholder: "",
    options: [
      {
        value: "",
        label: "",
      },
    ],
    validation: {
      required: "",
      minLength: {
        value: "",
        message: "",
      },
      maxLength: {
        value: "",
        message: "",
      },
      pattern: {
        value: "",
        message: "",
      },
    },
  };
  const emptyField = {
    name: data.name,
    form_fields: [emptyInput],
  };
  const {
    handleSubmit,
    register,
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: data.description || "",
      min_deposit: data.min_deposit || "",
      max_deposit: data.max_deposit || "",
      min_withdrawals: data.min_withdrawals || "",
      max_withdrawals: data.max_withdrawals || "",
      is_active: data.is_active || false,
      withdrawal_frontend_data: data.withdrawal_frontend_data?.form_fields
        ?.length
        ? data.withdrawal_frontend_data
        : emptyField,
      deposit_frontend_data: data.deposit_frontend_data?.form_fields?.length
        ? data.deposit_frontend_data
        : emptyField,
      deposit: data.deposit || false,
      withdrawal: data.withdrawal || false,
      image_url: data.image_url || "",
    },
  });

  const depositField = useFieldArray({
    control,
    name: "deposit_frontend_data.form_fields",
  });
  const withdrawalField = useFieldArray({
    control,
    name: "withdrawal_frontend_data.form_fields",
  });

  async function onSubmit(payload) {
    try {
      payload.withdrawal_frontend_data = JSON.stringify(
        payload.withdrawal_frontend_data
      );
      payload.deposit_frontend_data = JSON.stringify(
        payload.deposit_frontend_data
      );

      payload.is_active = payload.is_active ? 1 : 0;
      payload.deposit = payload.deposit ? 1 : 0;
      payload.withdrawal = payload.withdrawal ? 1 : 0;

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "image_url" && typeof value !== "string") {
          formData.append("thumbnail", value);
        } else {
          formData.append(key, value);
        }
      });
      if (type === "apay") {
        await updateApayGateway({ id: data.id, data: formData }).unwrap();
      } else if (type === "passimpay") {
        await updatePassimpayGateway({ id: data.id, data: formData }).unwrap();
      }
      toast.success("Gateway updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.data?.message || error.message || "Internal Server Error"
      );
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit ${type} Gateway`}
      width="50%"
    >
      <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Typography>Gateway Title</Typography>
          <OutlinedInput
            {...register("description", { required: "Title is required" })}
            fullWidth
            error={!!errors.description}
            placeholder="Gateway Title"
          />
          <FormHelperText error={!!errors.description}>
            {errors.description?.message}
          </FormHelperText>
        </div>
        <div>
          <Typography>Minimum Deposit</Typography>
          <OutlinedInput
            {...register("min_deposit", {
              required: "Minimum Deposit is required",
            })}
            fullWidth
            error={!!errors.min_deposit}
            placeholder="Minimum Deposit"
          />
          <FormHelperText error={!!errors.min_deposit}>
            {errors.min_deposit?.message}
          </FormHelperText>
        </div>
        <div>
          <Typography>Maximum Deposit</Typography>
          <OutlinedInput
            {...register("max_deposit", {
              required: "Maximum Deposit is required",
            })}
            fullWidth
            error={!!errors.max_deposit}
            placeholder="Maximum Deposit"
          />
          <FormHelperText error={!!errors.max_deposit}>
            {errors.max_deposit?.message}
          </FormHelperText>
        </div>

        <div>
          <Typography>Minimum Withdrawals</Typography>
          <OutlinedInput
            {...register("min_withdrawals", {
              required: "Minimum Withdrawals is required",
            })}
            fullWidth
            error={!!errors.min_withdrawals}
            placeholder="Minimum Withdrawals"
          />
          <FormHelperText error={!!errors.min_withdrawals}>
            {errors.min_withdrawals?.message}
          </FormHelperText>
        </div>

        <div>
          <Typography>Maximum Withdrawals</Typography>
          <OutlinedInput
            {...register("max_withdrawals", {
              required: "Maximum Withdrawals is required",
            })}
            fullWidth
            error={!!errors.max_withdrawals}
            placeholder="Maximum Withdrawals"
          />
          <FormHelperText error={!!errors.max_withdrawals}>
            {errors.max_withdrawals?.message}
          </FormHelperText>
        </div>

        <div>
          <Typography>Is Active</Typography>
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <Switch
                value={field.value}
                checked={field.value}
                onChange={field.onChange}
              />
            )}
            label="Is Active"
          />
        </div>

        <div>
          <Typography>Deposit Enabled</Typography>
          <Controller
            name="deposit"
            control={control}
            render={({ field }) => (
              <Switch
                value={field.value}
                checked={field.value}
                onChange={field.onChange}
              />
            )}
            label="Deposit Enabled"
          />
        </div>

        <div>
          <Typography>Withdrawal Enabled</Typography>
          <Controller
            name="withdrawal"
            control={control}
            render={({ field }) => (
              <Switch
                value={field.value}
                checked={field.value}
                onChange={field.onChange}
              />
            )}
            label="Withdrawal Enabled"
          />
        </div>

        <div>
          <Typography>Thumbnail</Typography>
          <Button
            type="button"
            variant="outlined"
            onClick={() => thumbnailRef.current?.click()}
          >
            Thubmnail Image
          </Button>

          <input
            ref={thumbnailRef}
            type="file"
            hidden
            accept="image/jpeg, image/png, image/jpg"
            onChange={(e) => setValue("image_url", e.target.files[0])}
          />
          <FormHelperText error={!!errors.image_url}>
            {errors.image_url?.message}
          </FormHelperText>

          <Image
            width={100}
            height={100}
            src={
              typeof watch("image_url") === "string"
                ? config.fileBaseUrl + data.image_url
                : URL.createObjectURL(watch("image_url"))
            }
            alt="Thumbnail"
            style={{ objectFit: "contain" }}
          />
        </div>

        {type === "apay" && (
          <>
            <Typography variant="h6">Deposit Feilds</Typography>
            <Divider />
            {depositField.fields.map((item, index) => {
              const fieldKey =
                watch(`deposit_frontend_data.form_fields.${index}.key`) ||
                "Empty";
              return (
                <Stack direction="row" gap={1} key={index} flexWrap="wrap">
                  <Typography>
                    {index + 1}. {fieldKey}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    type="button"
                    startIcon={<Visibility />}
                    onClick={() =>
                      setShowInputForm({
                        name: "deposit_frontend_data.form_fields",
                        register,
                        control,
                        index,
                        trigger,
                        watch,
                      })
                    }
                  >
                    View And Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    type="button"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => depositField.remove(index)}
                  >
                    Delete
                  </Button>
                  {depositField.fields.length - 1 === index && (
                    <Button
                      variant="contained"
                      size="small"
                      type="button"
                      startIcon={<Add />}
                      onClick={() => depositField.append(emptyInput)}
                    >
                      Add
                    </Button>
                  )}
                </Stack>
              );
            })}
            <Typography variant="h6">Withdraw Feilds</Typography>
            <Divider />
            {withdrawalField.fields.map((item, index) => {
              const fieldKey =
                watch(`withdrawal_frontend_data.form_fields.${index}.key`) ||
                "Empty";
              return (
                <Stack direction="row" gap={1} key={index} flexWrap="wrap">
                  <Typography>
                    {index + 1}. {fieldKey}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    type="button"
                    startIcon={<Visibility />}
                    onClick={() =>
                      setShowInputForm({
                        name: "withdrawal_frontend_data.form_fields",
                        register,
                        control,
                        index,
                        trigger,
                        watch,
                      })
                    }
                  >
                    View And Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    type="button"
                    color="error"
                    onClick={() => withdrawalField.remove(index)}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                  {withdrawalField.fields.length - 1 === index && (
                    <Button
                      variant="contained"
                      size="small"
                      type="button"
                      startIcon={<Add />}
                      onClick={() => withdrawalField.append(emptyInput)}
                    >
                      Add
                    </Button>
                  )}
                </Stack>
              );
            })}
          </>
        )}

        <Button
          loading={isLoading || isLoadingPassimpay}
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Stack>

      {!!showInputForm && (
        <InputFieldForm
          open={!!showInputForm}
          onClose={() => setShowInputForm(null)}
          data={showInputForm}
          setValue={setValue}
        />
      )}
    </Modal>
  );
};

export default EditAutomaticGateway;
