"use client";

import Modal from "@/components/common/Modal";
import useResponsive from "@/hooks/useResponsive";
import {
  useGetAllCostListQuery,
  useUpdateAdsCostMutation,
  useUpdateCostListMutation,
} from "@/redux/features/ganeral";
import { Edit, EditSquare } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Page() {
  const { data: costs } = useGetAllCostListQuery();
  const [showUpdateCostModal, setShowUpdateCostModal] = useState(null);

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Cost settings</Typography>

      <Card>
        <CardHeader title="General Costs" />
        <Divider />
        <CardContent component={Grid} container spacing={2}>
          {costs?.data?.all_cost?.map((cost) => (
            <CostList key={cost.id} cost={cost} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Advertisement Costs" />
        <Divider />
        <CardContent component={Grid} container spacing={{ xs: 1, md: 2 }}>
          {costs?.data?.ads_cost?.map((cost) => (
            <Grid size={{ xs: 12, md: 6 }} key={cost.id}>
              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: "background.paper",
                }}
              >
                <Typography>Duration Day: {cost.duration_days}</Typography>
                <Stack direction="row" gap={1} alignItems="center">
                  <Typography>Cost: ${cost.cost}</Typography>
                  <Button
                    onClick={() => setShowUpdateCostModal(cost)}
                    variant="contained"
                    startIcon={<Edit />}
                    size="small"
                  >
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </CardContent>
      </Card>

      {showUpdateCostModal && (
        <UpdateAdsCost
          data={showUpdateCostModal}
          open={!!showUpdateCostModal}
          onClose={() => setShowUpdateCostModal(null)}
        />
      )}
    </Stack>
  );
}

function CostList({ cost }) {
  const [costValue, setCostValue] = useState(cost.cost);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateGeneralCost] = useUpdateCostListMutation();
  const isMobile = useResponsive("down", "sm");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsUpdating(true);
      await updateGeneralCost({ id: cost.id, cost: costValue }).unwrap();
      toast.success("Costs updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Grid
      onSubmit={onSubmit}
      component="form"
      size={{ xs: 12, md: 6 }}
      key={cost.id}
    >
      <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
        <Typography mb={0.5} sx={{ flexGrow: 1 }}>
          {cost.name
            .replaceAll("_", " ")
            .replace(/^./, (char) => char.toUpperCase())}{" "}
          {cost.name.includes("percentage") ? "%" : "$"}
        </Typography>
        <OutlinedInput
          value={costValue}
          onChange={(e) => setCostValue(e.target.value)}
          placeholder="Cost $"
          style={{ flexGrow: 1 }}
        />
        <Stack justifyContent="flex-end" flexDirection="row" flexGrow={1}>
          <Button
            variant="contained"
            loading={isUpdating}
            type="submit"
            style={{ flexGrow: isMobile ? 1 : 0 }}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}

function UpdateAdsCost({ data, open, onClose }) {
  const [updateAdsCost, { isLoading }] = useUpdateAdsCostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cost: data.cost,
      duration_days: data.duration_days,
    },
  });

  const onSubmit = async (payload) => {
    try {
      payload.id = data.id;
      await updateAdsCost(payload).unwrap();
      toast.success("Ads cost updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    }
  };
  return (
    <Modal open={open} onClose={onClose} title="Update Ads Cost">
      <Stack onSubmit={handleSubmit(onSubmit)} spacing={1} component="form">
        <div>
          <Typography>Duration Day</Typography>
          <OutlinedInput
            {...register("duration_days", {
              required: "Duration Day is required",
            })}
            fullWidth
            error={!!errors.duration_days}
          />
          {errors.duration_days && (
            <FormHelperText error>
              {errors.duration_days.message}
            </FormHelperText>
          )}
        </div>
        <div>
          <Typography>Cost</Typography>
          <OutlinedInput
            type="number"
            {...register("cost", { required: "Cost is required" })}
            fullWidth
            error={!!errors.cost}
          />
          {errors.cost && (
            <FormHelperText error>{errors.cost.message}</FormHelperText>
          )}
        </div>

        <div>
          <Button
            loading={isLoading}
            sx={{ mt: 1, width: "100%" }}
            type="submit"
            variant="contained"
          >
            Save Changes
          </Button>
        </div>
      </Stack>
    </Modal>
  );
}

export default Page;
