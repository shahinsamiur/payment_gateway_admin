import Modal from "@/components/common/Modal";
import {
  useJobStatusUpdateMutation,
  useSatisfyAllSubmissionMutation,
} from "@/redux/features/jobs";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

const JobCloseModal = ({ open, onClose, data }) => {
  const underReviewTask = data?.submission_information?.UNDER_REVIEW;
  const [statusUpdate, { isLoading }] = useJobStatusUpdateMutation();
  const [satifyAll, { isLoading: isSatisfying }] =
    useSatisfyAllSubmissionMutation();

  async function handleStatusUpdate() {
    try {
      await statusUpdate({ id: data.id, status: "CLOSED" }).unwrap();
      toast.success("Status updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    }
  }

  async function handleSatisfyAll() {
    try {
      await satifyAll(data.id).unwrap();
      toast.success("All submissions satisfied successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Confirmation Modal">
      <Typography textAlign="center" variant="h6">
        Are you sure you want to close this job?
      </Typography>

      {underReviewTask ? (
        <Stack my={3} justifyContent="center" alignItems="center" gap={1}>
          <Typography variant="body1" color="warning">
            There {underReviewTask === 1 ? "is" : "are"} {underReviewTask} task
            still {underReviewTask === 1 ? "under review" : "under reviews"}{" "}
          </Typography>
          <Button
            onClick={handleSatisfyAll}
            variant="contained"
            loading={isSatisfying}
          >
            Satisfy All Tasks
          </Button>
        </Stack>
      ) : null}

      <Stack direction="row" justifyContent="flex-end" spacing={1} mt={5}>
        <Button
          disabled={isLoading || isSatisfying}
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleStatusUpdate}
          variant="contained"
          disabled={isSatisfying || underReviewTask}
          loading={isLoading}
        >
          Confirm
        </Button>
      </Stack>
    </Modal>
  );
};

export default JobCloseModal;
