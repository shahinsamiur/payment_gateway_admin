"use client";
import Error from "@/components/common/Error";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useGetDashboardDataQuery } from "@/redux/features/dashboard";
import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

function Page() {
  const { data, isLoading, error, refetch, isFetching } =
    useGetDashboardDataQuery();

  if (isLoading) {
    return (
      <Stack spacing={3}>
        <Skeleton variant="rectangular" height={30} sx={{ borderRadius: 1 }} />

        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 4 }}>
              <Skeleton
                variant="rectangular"
                height={150}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }} variant="outlined">
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} variant="outlined">
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} variant="outlined">
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 1 }}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <Skeleton
                variant="rectangular"
                height={50}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  }

  if (error) {
    return (
      <Error
        message={error?.message}
        isLoading={isFetching}
        onRetry={refetch}
      />
    );
  }

  return <DashboardContent data={data} />;
}

export default Page;
