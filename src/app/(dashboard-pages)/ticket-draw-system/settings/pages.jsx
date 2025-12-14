"use client";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import ManualDraw from "@/components/ticket/manualDraw";
import {
  useGetDrawSettingsQuery,
  useUpdateDrawSettingsMutation,
} from "@/redux/features/ticket";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import isEqual from "lodash.isequal";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function DrawSettingsPage() {
  const { data, isLoading } = useGetDrawSettingsQuery();
  const settings = data?.data?.[0];
  const [updateDrawSettings, { isLoading: updateDrawSettingsLoading }] =
    useUpdateDrawSettingsMutation();

  const initialFormState = {
    ticket_price: settings?.ticket_price || "",
    frequency: settings?.frequency || "",
    prize_amount: settings?.prize_amount || ["", "", "", "", ""],
  };
  // JSON.parse(settings.prize_amount)
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (settings) {
      const initial = {
        ticket_price: settings.ticket_price,
        frequency: settings.frequency,
        prize_amount: settings.prize_amount || ["", "", "", "", ""],
      };
      setForm(initial);
      setIsModified(false);
    }
  }, [settings]);

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    validateForm(updated);
    setIsModified(!isEqual(updated, initialFormState));
  };

  const handlePrizeChange = (index, value) => {
    const updatedPrizes = [...form.prize_amount];
    updatedPrizes[index] = value;
    const updated = { ...form, prize_amount: updatedPrizes };
    setForm(updated);
    validateForm(updated);
    setIsModified(!isEqual(updated, initialFormState));
  };

  const validateForm = (formState) => {
    const newErrors = {};
    if (!formState.ticket_price)
      newErrors.ticket_price = "Ticket price is required";
    if (!formState.frequency) newErrors.frequency = "Frequency is required";

    const prizes = formState.prize_amount.map((val) => Number(val));
    for (let i = 0; i < prizes.length; i++) {
      if (!prizes[i] && prizes[i] !== 0) {
        newErrors[`prize-${i}`] = `Prize ${i + 1} is required`;
      }
    }

    for (let i = 0; i < prizes.length - 1; i++) {
      if (prizes[i] < prizes[i + 1]) {
        newErrors[`prize-${i}`] = `Prize ${i + 1} must be greater than Prize ${
          i + 2
        }`;
      }
    }

    setErrors(newErrors);
  };

  const isFormValid = Object.keys(errors).length === 0;

  const handleUpdate = async () => {
    if (!isFormValid) return;
    try {
      await updateDrawSettings({
        ticket_price: form.ticket_price,
        frequency: form.frequency,
        prize_amount: form.prize_amount,
      });
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      {/* Card 1: Settings */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Draw Settings & Prize Distribution
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              mt: 3,
            }}
          >
            {/* Left: Prize Distribution */}
            <Stack spacing={1} flex={1}>
              <Typography variant="subtitle1" gutterBottom>
                Prize Distribution
              </Typography>

              {form?.prize_amount?.map((_, index) => (
                <div key={index}>
                  <Typography>
                    {`${index + 1}${
                      ["st", "nd", "rd", "th", "th"][index]
                    } Prize`}
                  </Typography>
                  <OutlinedInput
                    id={`prize-${index}`}
                    label={`${index + 1}${
                      ["st", "nd", "rd", "th", "th"][index]
                    } Prize`}
                    value={form.prize_amount[index]}
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    fullWidth
                    onChange={(e) => handlePrizeChange(index, e.target.value)}
                  />
                  {errors[`prize-${index}`] && (
                    <FormHelperText>{errors[`prize-${index}`]}</FormHelperText>
                  )}
                </div>
              ))}
            </Stack>

            {/* Right: Ticket Settings */}
            <Stack spacing={1} flex={1}>
              <Typography variant="subtitle1" gutterBottom>
                Draw Info
              </Typography>

              <div>
                <Typography>Ticket Price</Typography>
                <OutlinedInput
                  id="ticket-price"
                  label="Ticket Price"
                  value={form.ticket_price}
                  type="number"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => handleChange("ticket_price", e.target.value)}
                />
                {errors.ticket_price && (
                  <FormHelperText>{errors.ticket_price}</FormHelperText>
                )}
              </div>

              <div>
                <Typography>Frequency (Hours)</Typography>
                <OutlinedInput
                  id="frequency"
                  label="Frequency (Hours)"
                  value={form.frequency}
                  type="number"
                  fullWidth
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => handleChange("frequency", e.target.value)}
                />
                {errors.frequency && (
                  <FormHelperText>{errors.frequency}</FormHelperText>
                )}
              </div>

              <Box>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  disabled={!isFormValid || !isModified}
                  onClick={handleUpdate}
                >
                  {updateDrawSettingsLoading
                    ? "Updating..."
                    : "Update Settings"}
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
      <ManualDraw />
    </Box>
  );
}
