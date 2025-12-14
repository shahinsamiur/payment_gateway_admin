"use client";

import Continent from "@/components/job-management/countries/Continent";
import Countries from "@/components/job-management/countries/Countries";
import { useGetContinentsQuery } from "@/redux/features/jobs";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function Page() {
  const { data: continent, isLoading: loadingContinent } =
    useGetContinentsQuery();
  return (
    <Box>
      <Typography variant="h4">Countries management</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={5}
        mt={3}
        flexWrap="wrap"
      >
        <Box sx={{ flexGrow: 1 }}>
          <Continent
            continent={continent}
            loadingContinent={loadingContinent}
          />
        </Box>
        <Countries continent={continent?.data} />
      </Stack>
    </Box>
  );
}

export default Page;
