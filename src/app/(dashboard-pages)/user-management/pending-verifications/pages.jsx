"use client";
import VerificationDetails from "@/components/user/VerificationDetails";
import { useDebouncer } from "@/hooks/useDebouncer";
import { useGetPendingUsersVerificationQuery } from "@/redux/features/user";
import ProfileImage from "@/utils/ProfileImage";
import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
import React from "react";

function Page() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const searchValue = useDebouncer(search, 500);
  const { data, isLoading, refetch, isFetching } =
    useGetPendingUsersVerificationQuery({ page, search: searchValue });

  return (
    <Box>
      <Typography variant="h4">Manual verification request</Typography>
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
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Req Date</TableCell>
                  <TableCell>Joined</TableCell>
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
                    <ListItem key={item.id} item={item} />
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
              onChange={(_e, page) => setPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

function ListItem({ item }) {
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <Stack direction="row" alignItems="center" gap={1}>
            <ProfileImage
              online_status={item.user.online_status}
              profile_image={item.user.profile_image}
              user_name={item.user.name}
            />
            <Typography>{item.user.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{item.user.email}</TableCell>
        <TableCell>
          <Chip label={item.status} />
        </TableCell>
        <TableCell>${item.user.wallet_balance.deposit_balance}</TableCell>
        <TableCell>
          {new Date(item.submitted_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </TableCell>
        <TableCell>
          {new Date(item.user.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </TableCell>
        <TableCell>
          <Button
            size="small"
            variant="contained"
            startIcon={<RemoveRedEye fontSize="small" />}
            onClick={() => setShowDetails(true)}
          >
            View
          </Button>
        </TableCell>
      </TableRow>

      {showDetails && (
        <VerificationDetails
          open={showDetails}
          onClose={() => setShowDetails(false)}
          data={item}
        />
      )}
    </>
  );
}

export default Page;
