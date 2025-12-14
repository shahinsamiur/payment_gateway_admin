"use client";

import Alert from "@/components/common/Alert";
import ChatContainer from "@/components/support/ChatContainer";
import { useDebouncer } from "@/hooks/useDebouncer";
import useResponsive from "@/hooks/useResponsive";
import {
  useGetMessagesQuery,
  useUpdateConversationMutation,
} from "@/redux/features/liveSupport";
import ProfileImage from "@/utils/ProfileImage";
import { Cancel, Chat } from "@mui/icons-material";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Support = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(0);
  const [openChat, setOpenChat] = useState(null);
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const userIdValue = useDebouncer(userId);
  const [page, setPage] = useState(1);
  const [updateConversation] = useUpdateConversationMutation();
  const [isCancelling, setIsCancelling] = useState(-1);
  const isMobile = useResponsive("down", "sm");
  const [unreadMessage, setUnreadMessage] = useState({
    conversationId: null,
    count: 0,
  });

  const { data, isLoading, refetch, isFetching } = useGetMessagesQuery({
    page,
    userId: userIdValue,
    status,
  });

  const handleCloseDeleteModal = () => setShowDeleteModal(0);
  const handleOpenDeleteModal = (id) => setShowDeleteModal(id);
  const handleOpenChat = (message) => {
    setOpenChat({
      id: message._id,
      name: message.user_name,
      user_profile: message.user_profile,
      user_online: message.is_online,
    });
  };

  // update conversation status closed
  async function handleCloseConversation() {
    try {
      const conversationId = showDeleteModal;
      setShowDeleteModal(0);
      setIsCancelling(conversationId);

      await updateConversation({
        conversationId,
        data: { status: "closed" },
      });
      toast.success("Conversation closed successfully");
    } catch (error) {
      toast.error("Failed to close conversation");
    } finally {
      setIsCancelling(-1);
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Support</Typography>

      <Card>
        <Stack p={2} direction="row" justifyContent="space-between">
          <Typography variant="h6">Message Requests</Typography>
          <Stack direction="row" gap={1}>
            {!isMobile && (
              <>
                <Button
                  loading={isFetching}
                  variant="contained"
                  onClick={() => refetch()}
                >
                  Refresh
                </Button>
                <OutlinedInput
                  placeholder="Search by User ID"
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </>
            )}
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
            >
              <MenuItem disabled value="">
                Status
              </MenuItem>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="waiting">Waiting</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Divider />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Req Time</TableCell>
                  <TableCell>Last Res Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography textAlign="center">Loading...</Typography>
                    </TableCell>
                  </TableRow>
                ) : data?.data?.length ? (
                  data.data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ cursor: "pointer" }}
                        >
                          <ProfileImage
                            online_status={item.is_online}
                            profile_image={item.user_profile}
                            user_name={item.user_name}
                          />

                          <Typography variant="subtitle2">
                            {item.user_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {item.admin_name ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ cursor: "pointer" }}
                          >
                            <ProfileImage
                              profile_image={item.admin_profile}
                              user_name={item.admin_name}
                            />

                            <Typography variant="subtitle2">
                              {item.admin_name}
                            </Typography>
                          </Stack>
                        ) : (
                          "Admin Not Assigned"
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>
                        {item.admin_id
                          ? new Date(item.updatedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true,
                              }
                            )
                          : "No Response Yet"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          color={
                            item.status === "waiting"
                              ? "warning"
                              : item.status === "closed"
                              ? "default"
                              : "primary"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Stack flexDirection="row" gap={1}>
                          <Badge
                            color="warning"
                            badgeContent={
                              unreadMessage.conversationId === item._id
                                ? unreadMessage.count
                                : 0
                            }
                          >
                            <Button
                              onClick={() => handleOpenChat(item)}
                              startIcon={<Chat />}
                              variant="contained"
                              size="small"
                            >
                              Chat
                            </Button>
                          </Badge>
                          <Button
                            disabled={
                              isCancelling === item.id ||
                              item.status === "closed"
                            }
                            onClick={() => handleOpenDeleteModal(item._id)}
                            startIcon={<Cancel />}
                            variant="contained"
                            size="small"
                            color="error"
                          >
                            Close
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography textAlign="center">No Data Found</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="flex-end" mt={3}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={data?.totalPage || 1}
              page={page}
              onChange={(_e, page) => setPage(page)}
            />
          </Stack>
        </CardContent>
      </Card>

      <ChatContainer
        openChat={openChat}
        setOpenChat={setOpenChat}
        setUnreadMessage={setUnreadMessage}
      />

      <Alert
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Close Conversation"
        description="Are you sure you want to close this conversation?"
        onConfirm={handleCloseConversation}
      />
    </Stack>
  );
};

export default Support;
