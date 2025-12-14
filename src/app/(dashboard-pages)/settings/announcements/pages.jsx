"use client";
import AnnouncementContent from "@/components/announcement/AnnouncementContent";
import EditOrAddAnnouncement from "@/components/announcement/EditOrAddAnnouncement";
import HeaderPart from "@/components/announcement/HeaderPart";
import Alert from "@/components/common/Alert";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import {
  useGetAnnouncementQuery,
  useUpdateAnnouncementMutation,
} from "@/redux/features/announcement";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Announcement = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletingId, setDeletingId] = useState(-1);
  const { data, isLoading } = useGetAnnouncementQuery();
  const [updateAnnouncement, { isLoading: updateLoading }] =
    useUpdateAnnouncementMutation();

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(-1);
  const handleShowDeleteModal = (index) => setShowDeleteModal(index);
  const announcements = data?.data ?? [];

  const handleEdit = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  async function handleAddAnnouncement(data) {
    try {
      const payload = {
        announcement: [...announcements, data.announcement],
      };
      await updateAnnouncement(payload).unwrap();
      toast.success("Announcement updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  async function handleUpdateAnnouncement(data) {
    try {
      const targetIndex = editData.index;
      const payload = {
        announcement: [
          ...announcements.slice(0, targetIndex),
          data.announcement,
          ...announcements.slice(targetIndex + 1),
        ],
      };

      await updateAnnouncement(payload).unwrap();
      toast.success("Announcement updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  async function handleDelete() {
    try {
      const index = showDeleteModal;
      setShowDeleteModal(-1);
      setDeletingId(index);
      const payload = {
        announcement: [
          ...announcements.slice(0, index),
          ...announcements.slice(index + 1),
        ],
      };
      await updateAnnouncement(payload).unwrap();
      toast.success("Announcement deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    } finally {
      setDeletingId(-1);
    }
  }

  if (isLoading) return <LoadingIndicator />;

  return (
    <Stack spacing={3}>
      <HeaderPart onAdd={handleOpen} />
      <AnnouncementContent
        data={announcements}
        onEdit={handleEdit}
        onDelete={handleShowDeleteModal}
        deletingId={deletingId}
      />
      <EditOrAddAnnouncement
        onClose={handleClose}
        open={showModal}
        data={editData}
        isLoading={updateLoading}
        onFormSubmit={
          editData ? handleUpdateAnnouncement : handleAddAnnouncement
        }
      />
      <Alert
        open={showDeleteModal !== -1}
        onClose={handleCloseDeleteModal}
        title="Delete Announcement"
        description="Are you sure you want to delete this announcement?"
        onConfirm={handleDelete}
      />
    </Stack>
  );
};

export default Announcement;
