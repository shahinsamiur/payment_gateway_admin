import { config } from "@/config/config";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function ProfileImage({
  profile_image,
  user_name,
  online_status,
  size = 30,
  fontSize = 16,
  top = 1,
  right = -1,
}) {
  return (
    <div style={{ position: "relative" }}>
      {profile_image ? (
        <Image
          src={config.fileBaseUrl + profile_image}
          alt={user_name}
          height={size}
          width={size}
          style={{
            borderRadius: 200,
          }}
          objectFit="cover"
        />
      ) : (
        <Box
          sx={{
            height: size,
            width: size,
            backgroundColor: "primary.dark",
            borderRadius: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize,
          }}
        >
          <Typography color="white">
            {user_name.charAt(0).toUpperCase()}
          </Typography>
        </Box>
      )}
      {online_status !== undefined ? (
        <Box
          sx={{
            position: "absolute",
            top,
            right,
            backgroundColor: online_status ? "green" : "gray",
            borderRadius: "50%",
            width: 8,
            height: 8,
          }}
        />
      ) : null}
    </div>
  );
}

export default ProfileImage;
