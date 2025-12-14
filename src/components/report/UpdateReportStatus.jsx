import { useUpdateJobReportMutation } from "@/redux/features/jobs";
import { CheckBox, Close } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import Modal from "../common/Modal";

const UpdateReportStatus = ({ open, onClose, reportId }) => {
  const [actionTaken, setActionTaken] = React.useState("");
  const [updateReport] = useUpdateJobReportMutation();

  async function handleUpdateReport(status) {
    try {
      setActionTaken(status);
      await updateReport({ id: reportId, data: { status } }).unwrap();
      toast.success("Report updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setActionTaken("");
    }
  }

  return (
    <Modal open={!!open} onClose={onClose} title="Update Report Status">
      <Typography variant="body1" sx={{ fontSize: 18 }}>
        Choose an action for This report
      </Typography>
      <Stack direction="row" justifyContent="flex-end" gap={2} mt={4}>
        <Button
          loading={actionTaken === "APPROVED"}
          onClick={() => handleUpdateReport("APPROVED")}
          variant="contained"
          startIcon={<CheckBox />}
          color="success"
        >
          Approve
        </Button>
        <Button
          loading={actionTaken === "REJECTED"}
          onClick={() => handleUpdateReport("REJECTED")}
          variant="contained"
          color="error"
          startIcon={<Close />}
        >
          Reject
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default UpdateReportStatus;
