"use client";

import Categories from "@/components/job-management/categories/Categories";
import SubCategories from "@/components/job-management/categories/SubCategories";
import { useGetCategoriesQuery } from "@/redux/features/jobs";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function Page() {
  const { data: categories, isLoading: loadingCategory } =
    useGetCategoriesQuery();
  return (
    <Box>
      <Typography variant="h4">Categories management</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={5}
        mt={3}
        flexWrap="wrap"
      >
        <div style={{ flexGrow: 1 }}>
          <Categories
            categories={categories}
            loadingCategory={loadingCategory}
          />
        </div>
        <SubCategories categories={categories?.data} />
      </Stack>
    </Box>
  );
}

export default Page;
