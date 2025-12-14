"use client";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import TiptapEditor from "@/components/TiptapEditor";
import {
  useGetFaqQuery,
  usePostFaqMutation,
  useRemoveFaqMutation,
  useUpdateFaqMutation,
} from "@/redux/features/pages";
import { Remove } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function FAQ() {
  const { data, isLoading } = useGetFaqQuery();
  const [postFaq] = usePostFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [removeFag] = useRemoveFaqMutation();
  const [isPosting, setIsPosting] = useState(-1);
  const [isRemoving, setIsRemoving] = useState(-1);
  const [fagData, setFagData] = useState([
    { id: 1, question: "", answer: "", isNew: true },
  ]);

  useEffect(() => {
    if (data) {
      setFagData(data?.faq_data);
    }
  }, [data]);

  function addMoreFag() {
    setFagData([
      ...fagData,
      { id: Date.now(), question: "", answer: "", isNew: true },
    ]);
  }

  function handleInput(key, value, id) {
    setFagData((prevData) => {
      const newData = prevData.map((item) => {
        if (item.id === id) {
          return { ...item, [key]: value };
        }
        return item;
      });
      return newData;
    });
  }

  async function handleSaveFaq(data, isNew) {
    try {
      setIsPosting(data.id);
      const payload = {
        question: data.question,
        answer: data.answer,
      };
      if (isNew) {
        await postFaq(payload).unwrap();
      } else {
        await updateFaq({ body: payload, id: data.id }).unwrap();
      }
      toast.success("Successfully saved");
    } catch (error) {
      // console.log(error);
      toast.error(error.data?.message || "Someting went wrong");
    } finally {
      setIsPosting(-1);
    }
  }

  async function handleRemoveFaq(id) {
    try {
      setIsRemoving(id);
      await removeFag(id).unwrap();
      toast.success("Successfully removed");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || "Someting went wrong");
    } finally {
      setIsRemoving(-1);
    }
  }

  if (isLoading) return <LoadingIndicator />;

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        FAQ
      </Typography>
      <Stack spacing={2}>
        {fagData.map((fag, index) => (
          <Stack spacing={2} key={index}>
            <Stack alignItems="end">
              <Button
                sx={{ width: "fit-content" }}
                variant="outlined"
                color="error"
                loading={isRemoving == fag.id}
                disabled={fagData.length === 1}
                onClick={() => handleRemoveFaq(fag.id)}
              >
                <Remove />
              </Button>
            </Stack>
            <TextField
              name="question"
              onChange={(e) => handleInput("question", e.target.value, fag.id)}
              placeholder="Question"
              fullWidth
              value={fag.question}
            />
            <TiptapEditor
              content={fag.answer}
              onchange={(value) => handleInput("answer", value, fag.id)}
              placeholder="Write the answer"
              minHeight={150}
            />
            <Stack alignItems="center" mt={2}>
              <Button
                loading={isPosting == fag.id}
                onClick={() => handleSaveFaq(fag, fag.isNew)}
                variant="contained"
                sx={{ width: "fit-content" }}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Stack mt={6}>
        <Button
          onClick={addMoreFag}
          variant="contained"
          sx={{ width: "fit-content" }}
        >
          Add More
        </Button>
      </Stack>
    </div>
  );
}

export default FAQ;
