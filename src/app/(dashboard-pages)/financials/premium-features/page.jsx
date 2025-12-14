"use client";

import Alert from "@/components/common/Alert";
import AddPackageForm from "@/components/premiumPakages/AddPackageForm";
import UpdatePackageForm from "@/components/premiumPakages/updatePakagesForm";
import {
  useDeletePremiumFeaturesMutation,
  useGetPremiumFeaturesQuery,
} from "@/redux/features/premium";
import { Add, Delete, Edit } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SubscriptionSettings() {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(-1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const { data: subscriptionPlans, isLoading } = useGetPremiumFeaturesQuery();

  const [deletePremiumFeatures] = useDeletePremiumFeaturesMutation();

  async function handleDelete() {
    try {
      const id = showDeleteModal;
      setShowDeleteModal(0);
      setIsDeletingId(id);
      await deletePremiumFeatures(id).unwrap();
      toast.success("Package deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setIsDeletingId(-1);
    }
  }

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Subscription settings</Typography>

            <Tooltip
              title={
                subscriptionPlans?.data?.length >= 3
                  ? "You can't add more than 3 plans"
                  : "Add plan"
              }
              placement="top"
              arrow
            >
              <span>
                <Button
                  variant="contained"
                  onClick={() => setOpenAddModal(true)}
                  startIcon={<Add />}
                  disabled={subscriptionPlans?.data?.length >= 3}
                >
                  Add
                </Button>
              </span>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} mt={3}>
        {isLoading ? (
          [1, 2, 3].map((item) => (
            <Grid component={Card} size={{ xs: 12, md: 6, lg: 4 }} key={item}>
              <CardContent component={Stack} spacing={2}>
                <Skeleton variant="rectangular" height={50} />
                <Skeleton variant="rectangular" height={20} />
                <Skeleton variant="rectangular" height={20} />
                <Skeleton variant="rectangular" height={20} />
                <Skeleton variant="rectangular" height={20} />
                <Skeleton variant="rectangular" height={20} />
              </CardContent>
            </Grid>
          ))
        ) : subscriptionPlans?.data?.length ? (
          subscriptionPlans?.data?.map((plan) => {
            const features =
              typeof plan.feature === "string"
                ? JSON.parse(plan.feature)
                : plan.feature || [];

            return (
              <Grid
                component={Card}
                size={{ xs: 12, md: 6, lg: 4 }}
                key={plan.id}
                sx={{ position: "relative" }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      width: "fit-content",
                      paddingX: 2,
                      paddingY: 0.05,
                      borderRadius: 1,
                      mx: "auto",
                      mb: 1,
                      ...(plan.highlighted && {
                        backgroundColor: "primary.main",
                        color: "white",
                      }),
                    }}
                    variant="h6"
                    fontWeight="bold"
                  >
                    {plan.name}
                  </Typography>

                  <Box sx={{ mb: 2, textAlign: "center" }}>
                    <Typography color="textSecondary" fontSize={18}>
                      {plan.duration} Month Access
                    </Typography>
                    <Typography fontSize={14}>{plan.description}</Typography>
                  </Box>

                  <Divider />

                  {features.map((item, index) => (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1.5}
                      key={index}
                      mt={1}
                    >
                      <CheckCircleIcon color="success" />
                      <ListItemText primary={item} />
                    </Stack>
                  ))}

                  {/* Price Display */}
                  <Typography
                    fontSize={18}
                    fontWeight="bold"
                    color="text.secondary"
                    sx={{ mt: 3, mb: 4 }}
                  >
                    Price: ${plan.price}
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      paddingY: 1,
                      paddingX: 2,
                      backgroundColor: "primary.dark",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="white"
                      align="center"
                      fontSize={14}
                    >
                      Created At:{" "}
                      {new Date(plan.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenUpdateModal(true);
                          setSelectedPlan(plan);
                        }}
                        startIcon={<Edit fontSize="small" />}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => setShowDeleteModal(plan.id)}
                        startIcon={<Delete fontSize="small" />}
                        loading={isDeletingId === plan.id}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Grid>
            );
          })
        ) : (
          <Typography
            sx={{ columnSpan: 3, width: "100%", textAlign: "center" }}
            variant="body1"
            color="text.secondary"
          >
            No Data Found
          </Typography>
        )}
      </Grid>

      {/* Update Modal */}
      {selectedPlan && openUpdateModal && (
        <UpdatePackageForm
          data={selectedPlan}
          setOpenAddModal={setOpenUpdateModal}
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
        />
      )}

      {/* Add Modal */}
      {openAddModal && (
        <AddPackageForm
          setOpenAddModal={setOpenAddModal}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      )}

      <Alert
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(0)}
        title="Delete Package"
        description="Are you sure you want to delete this package?"
        onConfirm={handleDelete}
      />
    </Stack>
  );
}
