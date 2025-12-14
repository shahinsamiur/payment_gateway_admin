import {
  Button,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import Modal from "../common/Modal";

const InputFieldForm = ({ open, onClose, data }) => {
  const { name, register, control, index, watch, trigger } = data;

  const optionField = useFieldArray({
    control,
    name: `${name}.${index}.options`,
  });

  const inputType = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "number", label: "Number" },
    { value: "select", label: "Select" },
  ];

  async function handleSubmit() {
    const valid = await trigger([
      `${name}.${index}.key`,
      `${name}.${index}.label`,
      `${name}.${index}.placeholder`,
      `${name}.${index}.type`,
    ]);
    if (valid) {
      onClose();
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Required Field" width="50%">
      <Stack spacing={2}>
        <div>
          <Typography>Field Key</Typography>
          <Controller
            name={`${name}.${index}.key`}
            control={control}
            rules={{ required: "Key is required" }}
            render={({ field, fieldState }) => (
              <>
                <OutlinedInput
                  error={!!fieldState.error}
                  fullWidth
                  placeholder="Enter field key"
                  {...field}
                />
                <FormHelperText error>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </div>
        <div>
          <Typography>Field Label</Typography>

          <Controller
            name={`${name}.${index}.label`}
            control={control}
            rules={{ required: "Label is required" }}
            render={({ field, fieldState }) => (
              <>
                <OutlinedInput
                  error={!!fieldState.error}
                  fullWidth
                  placeholder="Enter field label"
                  {...field}
                />
                <FormHelperText error>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </div>

        <div>
          <Typography>Field Type</Typography>
          <Controller
            name={`${name}.${index}.type`}
            control={control}
            rules={{ required: "Type is required" }}
            defaultValue="text"
            render={({ field, fieldState }) => (
              <>
                <Select
                  input={<OutlinedInput />}
                  displayEmpty
                  error={!!fieldState.error}
                  fullWidth
                  {...field}
                >
                  {inputType.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </div>

        {watch(`${name}.${index}.type`) === "select" && (
          <Stack spacing={1}>
            <Typography>Options</Typography>
            {optionField.fields.map((field, optIndex) => (
              <Stack
                direction="row"
                gap={2}
                alignItems="center"
                flexWrap="wrap"
                key={optIndex}
              >
                <div style={{ flexGrow: 1 }}>
                  <Typography>Label {optIndex + 1}</Typography>
                  <OutlinedInput
                    {...register(`${name}.${index}.options.${optIndex}.label`)}
                    fullWidth
                    placeholder="Enter option label"
                  />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <Typography>Value {optIndex + 1}</Typography>
                  <OutlinedInput
                    {...register(`${name}.${index}.options.${optIndex}.value`)}
                    fullWidth
                    placeholder="Enter option value"
                  />
                </div>
              </Stack>
            ))}

            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end" }}
              onClick={() => optionField.append({ label: "", value: "" })}
            >
              Add Option
            </Button>
          </Stack>
        )}

        <div>
          <Typography>Placeholder</Typography>

          <Controller
            name={`${name}.${index}.placeholder`}
            control={control}
            rules={{ required: "Placeholder is required" }}
            render={({ field, fieldState }) => (
              <>
                <OutlinedInput
                  {...field}
                  fullWidth
                  error={!!fieldState.error}
                  placeholder="Enter placeholder"
                />
                <FormHelperText error>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />
        </div>

        <div>
          <Typography>Required Field</Typography>
          <OutlinedInput
            fullWidth
            {...register(`${name}.${index}.validation.required`)}
            placeholder="If not required, leave blank"
          />
        </div>

        <div>
          <Typography>Min Length number</Typography>
          <OutlinedInput
            fullWidth
            type="number"
            {...register(`${name}.${index}.validation.minLength.value`)}
            placeholder="If not required, leave blank"
          />
        </div>
        <div>
          <Typography>Min Length message (when error)</Typography>
          <OutlinedInput
            fullWidth
            {...register(`${name}.${index}.validation.minLength.message`)}
            placeholder="If not required, leave blank"
          />
        </div>

        <div>
          <Typography>Max Length number</Typography>
          <OutlinedInput
            type="number"
            fullWidth
            {...register(`${name}.${index}.validation.maxLength.value`)}
            placeholder="If not required, leave blank"
          />
        </div>
        <div>
          <Typography>Max Length message (when error)</Typography>
          <OutlinedInput
            fullWidth
            {...register(`${name}.${index}.validation.maxLength.message`)}
            placeholder="If not required, leave blank"
          />
        </div>

        <div>
          <Typography>Pattern</Typography>
          <OutlinedInput
            fullWidth
            {...register(`${name}.${index}.validation.pattern.value`)}
            placeholder="If not required, leave blank"
          />
        </div>
        <div>
          <Typography>Pattern message (when error)</Typography>
          <OutlinedInput
            fullWidth
            {...register(`${name}.${index}.validation.pattern.message`)}
            placeholder="If not required, leave blank"
          />
        </div>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Stack>
    </Modal>
  );
};

export default InputFieldForm;
