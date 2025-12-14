"use client";
import { config } from "@/config/config";
import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AccountPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Avatar
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
        alt="Avater"
        src={config.fileBaseUrl + user?.profile_image}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1">{user?.name}</Typography>
          <Typography variant="subtitle2">
            {user?.role?.is_super_admin ? "Super Admin" : "Admin"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {user?.email}
          </Typography>
        </Box>
        <Divider
          sx={(theme) => ({
            borderStyle: "dashed",
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.text.secondary
                : theme.palette.divider,
          })}
        />

        <Divider
          sx={(theme) => ({
            borderStyle: "dashed",
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.text.secondary
                : theme.palette.divider,
          })}
        />
        <MenuItem onClick={handleLogout} sx={{ m: 1, color: "error.main" }}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
