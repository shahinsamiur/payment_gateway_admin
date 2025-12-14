"use client";
import React from "react";
import { IconButton, Box, Stack } from "@mui/material";
import { Menu } from "@mui/icons-material";
import AccountPopover from "./AccountPopover";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleTheme } from "@/redux/slices/layoutSlice";
import DarkModeSwithch from "../common/DarkModeSwithch";
import SearchSection from "./SearchSection";

const Header = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.layout);

  const handleThemeToggle = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    localStorage.setItem("themeMode", newThemeMode);
    dispatch(toggleTheme());
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => dispatch(toggleSidebar())}
      >
        <Menu />
      </IconButton>

      <SearchSection />

      <Box sx={{ flexGrow: 1 }} />
      <DarkModeSwithch
        onClick={handleThemeToggle}
        checked={themeMode === "dark"}
        color="primary"
      />

      {/* <NotificationPopover /> */}
      <Box sx={{ ml: 2 }}>
        <AccountPopover />
      </Box>
    </Stack>
  );
};

export default Header;
