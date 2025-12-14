"use client";
import AddOrEditBlogs from "@/components/blogs/AddOrEditBlogs";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { useGetSingleBlogQuery } from "@/redux/features/blogs";
import { Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetSingleBlogQuery(id);

  if (isLoading) return <LoadingIndicator />;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Update blog</Typography>
      {data ? (
        <AddOrEditBlogs
          data={{
            id: data.data.id,
            title: data.data.title,
            job_category_id: data.data.job_category.id,
            short_description: data.data.short_description,
            content: data.data.content,
            thumbnail_image: data.data.thumbnail_image,
            keywords: data.data.keywords,
            tag_line: data.data.tag_line,
          }}
        />
      ) : (
        <Typography align="center">Blog not found</Typography>
      )}
    </Stack>
  );
}

export default Page;
