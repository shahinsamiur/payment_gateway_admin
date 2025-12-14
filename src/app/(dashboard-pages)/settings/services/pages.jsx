"use client";
import Alert from "@/components/common/Alert";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import AddOrEditService from "@/components/services/AddOrEditService";
import Headerpart from "@/components/services/Headerpart";
import ServicesContent from "@/components/services/ServicesContent";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
  useStoreServiceMutation,
  useUpdateServiceMutation,
} from "@/redux/features/services";
import { Stack } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const Services = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { data, isLoading } = useGetServicesQuery();
  const [deleleService] = useDeleteServiceMutation();
  const [deletingId, setDeletingId] = useState(-1);
  const [addService, { isLoading: storeLoading }] = useStoreServiceMutation();
  const [updateService, { isLoading: updateLoading }] =
    useUpdateServiceMutation();

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleClose = () => setOpenAddModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(0);
  const handleDleteModalShow = (id) => setShowDeleteModal(id);

  const handleEdit = (data) => {
    setEditData(data);
    setOpenAddModal(true);
  };
  const servicesData = data?.data ?? [];

  async function handleAddService(data) {
    try {
      await addService(data).unwrap();
      toast.success("Service added successfully");
      handleClose();
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  async function handleUpdateService(data) {
    try {
      await updateService({ id: editData.id, data: data }).unwrap();
      toast.success("Service updated successfully");
      handleClose();
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  async function handleDelete() {
    try {
      const id = showDeleteModal;
      setShowDeleteModal(0);
      setDeletingId(id);
      await deleleService(id).unwrap();
      toast.success("Service deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    } finally {
      setDeletingId(-1);
    }
  }

  if (isLoading) return <LoadingIndicator />;

  return (
    <Stack spacing={3}>
      <Headerpart
        onOpenAddModal={handleOpenAddModal}
        disabled={servicesData.length >= 3}
      />
      <ServicesContent
        data={servicesData}
        onDelete={handleDleteModalShow}
        deletingId={deletingId}
        onEdit={handleEdit}
      />
      <AddOrEditService
        open={openAddModal}
        onClose={handleClose}
        data={editData}
        isLoading={storeLoading || updateLoading}
        onFormSubmit={editData ? handleUpdateService : handleAddService}
      />
      <Alert
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service?"
      />
    </Stack>
  );
};

export default Services;
