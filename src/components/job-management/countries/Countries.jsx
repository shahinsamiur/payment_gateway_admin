import {
  useDeleteCountryMutation,
  useGetCountriesQuery,
} from "@/redux/features/jobs";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
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
import React, { useState } from "react";

import Alert from "@/components/common/Alert";
import { config } from "@/config/config";
import { useDebouncer } from "@/hooks/useDebouncer";
import { toast } from "react-toastify";
import AddOrEditCountry from "./AddOrEditCountry";

function Countries({ continent }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteLoaing, setDeleteLoading] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const searchValue = useDebouncer(search, 500);
  const [editData, setEditData] = useState(null);

  const { data: countries, isLoading: loadingContries } = useGetCountriesQuery({
    country_category_id: filter,
    search: searchValue,
    page: page,
    paginate: config.dataLimit,
  });

  const [deleteCountry] = useDeleteCountryMutation();

  const handleDelete = async () => {
    try {
      const id = showDeleteModal;
      setShowDeleteModal(0);
      setDeleteLoading(id);
      await deleteCountry(id).unwrap();
      toast.success("Country deleted successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setDeleteLoading(-1);
    }
  };

  return (
    <>
      <Card sx={{ flexGrow: 1 }}>
        <CardContent>
          <Stack
            mb={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">Countries</Typography>
            <Stack direction="row" gap={1}>
              <OutlinedInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                size="small"
              />
              <Select
                input={<OutlinedInput size="small" />}
                displayEmpty
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {continent?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.country_category_name}
                  </MenuItem>
                ))}
              </Select>
              <Tooltip title="Add Country" placement="top" arrow>
                <Button
                  onClick={() => setOpenAddModal(true)}
                  variant="contained"
                >
                  <Add />
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Country Name</TableCell>
                  <TableCell>Short Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Continent</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingContries ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : countries?.data?.data?.length ? (
                  countries?.data?.data?.map((country) => (
                    <TableRow key={country.id}>
                      <TableCell>{country.id}</TableCell>
                      <TableCell>{country.country_name}</TableCell>
                      <TableCell>{country.short_name}</TableCell>
                      <TableCell>{country.country_code}</TableCell>
                      <TableCell>{country.currency}</TableCell>
                      <TableCell>
                        {country.categories[0]?.country_category_name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => setEditData(country)}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          disabled={deleteLoaing === country.id}
                          onClick={() => setShowDeleteModal(country.id)}
                        >
                          {deleteLoaing === country.id ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Delete fontSize="small" color="error" />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Country data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <Pagination
              count={countries?.data?.last_page || 1}
              page={page}
              onChange={(_e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>

      <AddOrEditCountry
        open={openAddModal || !!editData}
        handleClose={() => {
          setOpenAddModal(false);
          setEditData(null);
        }}
        editData={editData}
        continent={continent}
      />
      <Alert
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(0)}
        onConfirm={handleDelete}
        title="Delete Country"
        description="Are you sure you want to delete this country?"
      />
    </>
  );
}

export default Countries;
