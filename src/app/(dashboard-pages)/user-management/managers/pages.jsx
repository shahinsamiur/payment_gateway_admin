"use client";

import AddOrEditManager from "@/components/manager/AddOrEditManager";
import { useDebouncer } from "@/hooks/useDebouncer";
import useResponsive from "@/hooks/useResponsive";
import {
  useDeleteManagerMutation,
  useGetAllManagersQuery,
} from "@/redux/features/manager";
import { Add, Delete, RemoveRedEye } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  OutlinedInput,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ManagersPage = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(-1);
  const [deleteManager] = useDeleteManagerMutation();
  const [search, setSearch] = useState("");
  const searchValue = useDebouncer(search, 500);
  const { data, isLoading, refetch, isFetching } = useGetAllManagersQuery({
    search: searchValue,
    page,
  });
  const isMobile = useResponsive("down", "md");

  async function handleDelete(id) {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this manager?"
      );
      if (!confirm) return;

      setIsDeleting(id);
      await deleteManager(id);
      toast.success("Manager deleted successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    } finally {
      setIsDeleting(-1);
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Managers</Typography>

      <Card>
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
            mb={2}
          >
            {!isMobile && (
              <Button
                variant="contained"
                loading={isFetching}
                onClick={refetch}
              >
                Refresh
              </Button>
            )}
            <OutlinedInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email/phone/manager ID"
            />
            <Button
              onClick={() => setShowModal(true)}
              color="secondary"
              startIcon={<Add />}
              variant="contained"
            >
              {isMobile ? "Add" : "Add Manager"}
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Manager ID</TableCell>
                  <TableCell>Total Deposit</TableCell>
                  <TableCell>Total Withdraw</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>User Joined</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.length ? (
                  data?.data?.map((manager) => (
                    <TableRow key={manager.id}>
                      <TableCell>{manager.name}</TableCell>
                      <TableCell>{manager.email}</TableCell>
                      <TableCell>{manager.phone_number}</TableCell>
                      <TableCell>{manager.manager_id}</TableCell>
                      <TableCell>{manager.total_deposit}</TableCell>
                      <TableCell>{manager.total_withdraw}</TableCell>
                      <TableCell>
                        {new Date(manager.created_at).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </TableCell>
                      <TableCell>{manager.user_count}</TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          gap={1}
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <Link
                            href={`/user-management/managers/${manager.id}`}
                          >
                            <Button
                              startIcon={<RemoveRedEye />}
                              variant="contained"
                              color="info"
                            >
                              Report
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleDelete(manager.id)}
                            startIcon={<Delete />}
                            loading={isDeleting === manager.id}
                            variant="contained"
                            color="error"
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack mt={2} alignItems="flex-end">
            <Pagination
              count={data?.last_page}
              page={page}
              onChange={(_e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>

      {showModal && (
        <AddOrEditManager
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </Stack>
  );
};

export default ManagersPage;
