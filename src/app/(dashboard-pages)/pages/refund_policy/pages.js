"use client";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import TiptapEditor from "@/components/TiptapEditor";
import { useGetPagesQuery, usePostPagesMutation } from "@/redux/features/pages";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

function RefundPolicy() {
  const { data, isLoading: contentLoading } = useGetPagesQuery("refund_policy");
  const [content, setContent] = React.useState("");
  const [postPage, { isLoading }] = usePostPagesMutation();

  useEffect(() => {
    if (data) {
      setContent(data?.content_data?.content);
    }
  }, [data]);

  async function handleSubmit() {
    try {
      const payload = {
        content: content,
        name: "refund_policy",
      };
      if (data) {
        payload.id = data.content_data?.id;
      }
      const res = await postPage(payload).unwrap();
      setContent(res?.content_data?.content);
      toast.success("Successfully saved");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || "Someting went wrong");
    }
  }
  if (contentLoading) return <LoadingIndicator />;
  return (
    <div>
      <Stack alignItems="center" justifyContent="space-between" direction="row">
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Refund policy
        </Typography>
        <Button loading={isLoading} onClick={handleSubmit} variant="contained">
          Save changes
        </Button>
      </Stack>
      <TiptapEditor content={content} onchange={setContent} />
    </div>
  );
}

export default RefundPolicy;
