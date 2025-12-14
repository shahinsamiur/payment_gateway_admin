"use client";
import Switch from "@/components/common/Switch";
import { useDebouncer } from "@/hooks/useDebouncer";
import {
  useGetUsersQuery,
  useToggleUserRoleMutation,
  useUserActiveInactiveMutation,
} from "@/redux/features/user";
import ProfileImage from "@/utils/ProfileImage";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const filterOptions = [
  { label: "All", field: "all", value: "" },
  { label: "Verified", field: "verification", value: "VERIFIED" },
  { label: "Not Verified", field: "verification", value: "PENDING" },
  { label: "Premium", field: "premium", value: true },
  { label: "User", field: "role", value: "is_user" },
  { label: "Admin", field: "role", value: "is_admin" },
  { label: "Super Admin", field: "role", value: "is_super_admin" },
  { label: "Active", field: "active", value: true },
  { label: "Inactive", field: "active", value: false },
];

function Page() {
  const [page, setPage] = React.useState(1);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = React.useState("");
  const searchValue = useDebouncer(search, 500);
  const [filter, setFilter] = React.useState({
    label: "All",
    field: "all",
    value: "",
  });
  const { data, isLoading, refetch, isFetching } = useGetUsersQuery({
    page,
    search: searchValue,
    ...(filter.field !== "all" && { [filter.field]: filter.value }),
  });
  const [toggleRoleLoading, setToggleRoleLoading] = useState(-1);
  const [activeInactive] = useUserActiveInactiveMutation();
  const [activating, setActivating] = useState(-1);
  const [toggleRole] = useToggleUserRoleMutation();

  async function handleActiveInactive(id) {
    try {
      setActivating(id);
      await activeInactive(id).unwrap();
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    } finally {
      setActivating(-1);
    }
  }

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = filterOptions.find(
      (option) => option.label === selectedValue
    );
    if (selectedOption) setFilter(selectedOption);
  };

  const handleToggleRole = async (id) => {
    try {
      setToggleRoleLoading(id);
      await toggleRole(id).unwrap();
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal server error"
      );
    } finally {
      setToggleRoleLoading(-1);
    }
  };

  function checkHasAccess(targetUser) {
    const currentUser = user?.role ?? {};
    if (currentUser.id === targetUser?.id) {
      return true;
    } else if (currentUser.is_super_admin) {
      return false;
    }
    return true;
  }

  function checkDisableSwith(targetUser) {
    const currentUser = user?.role ?? {};
    if (currentUser.id === targetUser?.id) {
      return true;
    } else if (!currentUser.is_super_admin && targetUser?.is_super_admin) {
      return true;
    }
    return false;
  }

  return (
    <Box>
      <Typography variant="h4">All user</Typography>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack mb={2} direction="row" gap={2} justifyContent="flex-end">
            <Button loading={isFetching} onClick={refetch} variant="contained">
              Refresh
            </Button>
            <OutlinedInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name / Email"
            />

            <Select
              input={<OutlinedInput />}
              value={filter.label}
              onChange={handleFilterChange}
              displayEmpty
            >
              {filterOptions.map((option) => (
                <MenuItem
                  key={option.label + option.value}
                  value={option.label}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Verification</TableCell>
                  <TableCell>Is Premium</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.data?.length ? (
                  data?.data?.data?.map((item) => (
                    <TableRow key={item.id}>
                      {item.email === "admin@gmail.com" && console.log(item)}
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <ProfileImage
                            online_status={item.online_status}
                            profile_image={item.profile_image}
                            user_name={item.name}
                          />

                          <Typography>{item.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.is_verified ? "Verified" : "Not Verified"}
                      </TableCell>
                      <TableCell>
                        {item.is_premium ? "Premium" : "Not Premium"}
                      </TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title="Click to Change Role"
                          placement="top"
                          arrow
                        >
                          <Chip
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleToggleRole(item.id)}
                            label={
                              item.role && item.role?.is_super_admin
                                ? "Super Admin"
                                : item.role?.is_admin
                                ? "Admin"
                                : "User"
                            }
                            disabled={
                              toggleRoleLoading === item.id ||
                              checkHasAccess(item?.role)
                            }
                            color={
                              item.role && item.role?.is_super_admin
                                ? "success"
                                : item.role?.is_admin
                                ? "primary"
                                : "default"
                            }
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Link href={`/user-management/user/${item.id}`}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<RemoveRedEye fontSize="small" />}
                          >
                            View
                          </Button>
                        </Link>
                        <Switch
                          onClick={() => handleActiveInactive(item.id)}
                          disabled={
                            item.id === activating ||
                            checkDisableSwith(item?.role)
                          }
                          checked={parseInt(item.active)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="flex-end" mt={2}>
            <Pagination
              count={data?.data?.last_page}
              page={page}
              onChange={(e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Page;
