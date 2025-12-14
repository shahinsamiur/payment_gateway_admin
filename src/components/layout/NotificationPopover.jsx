"use client";
import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Avatar,
  Badge,
  Box,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";

const notifications = [
  {
    id: 1,
    title: "New order received",
    description: "A new order has been placed.",
    avatar: "📦",
  },
  {
    id: 2,
    title: "User registration",
    description: "A new user has registered.",
    avatar: "👤",
  },
];

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <Notifications />
        </Badge>
      </IconButton>
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
        <Box sx={{ width: 360 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Notifications
          </Typography>
          <Divider
            sx={(theme) => ({
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : theme.palette.divider,
            })}
          />
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification.id}>
                <ListItemAvatar>
                  <Avatar>{notification.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationPopover;
