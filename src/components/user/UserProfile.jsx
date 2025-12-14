import { useUserActiveInactiveMutation } from "@/redux/features/user";
import ProfileImage from "@/utils/ProfileImage";
import { WorkspacePremium } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import Switch from "../common/Switch";

function UserProfile({ user }) {
  const [activeInactive, { isLoading: isUpdating }] =
    useUserActiveInactiveMutation();

  async function handleActiveInactive(id) {
    try {
      await activeInactive(id).unwrap();
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Something went wrong"
      );
    }
  }
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Stack direction="row" spacing={1}>
            <div style={{ position: "relative" }}>
              <ProfileImage
                user_name={user.name}
                profile_image={user.profile_image}
                online_status={user.online_status}
                size={80}
                fontSize={24}
                top={10}
                right={8}
              />

              <WorkspacePremium
                color="primary"
                fontSize="medium"
                sx={{ position: "absolute", bottom: 30, right: 5 }}
              />
            </div>
            <Stack>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2">ID: {user.referral_code}</Typography>
              <Typography variant="body2">
                Since{" "}
                {new Date(user.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
              <Switch
                disabled={isUpdating}
                onClick={() => handleActiveInactive(user.id)}
                checked={parseInt(user.active)}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography fontSize={16} color="info" fontWeight={600}>
              Earn: ${user.wallet_balance.earning_balance}
            </Typography>
            <Typography color="primary" fontSize={16} fontWeight={600}>
              Deposit: ${user.wallet_balance.deposit_balance}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {user.premium_subscriptions.length ? (
                user.premium_subscriptions.map((item) => (
                  <Stack
                    key={item.id}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        backgroundColor: "primary.dark",
                        borderRadius: 200,
                        padding: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
                      }}
                    >
                      <Typography fontWeight={700} fontSize={20} color="white">
                        {item.package.duration}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Start:{" "}
                      {new Date(item.start_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                    <Typography variant="body2" color="info">
                      End:{" "}
                      {new Date(item.end_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </Stack>
                ))
              ) : (
                <Typography variant="caption" color="gray">
                  No Pachage purchased
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserProfile;
