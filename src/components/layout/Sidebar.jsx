"use client";
import { config } from "@/config/config";
import menuItems from "@/config/menu";
import useResponsive from "@/hooks/useResponsive";
import { toggleSidebar } from "@/redux/slices/layoutSlice";
import {
  ExpandLess,
  ExpandMore,
  UnfoldLess,
  UnfoldMore,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 300;
const miniDrawerWidth = 60;

const SidebarMenuItem = ({ item, isSidebarOpen, sectionOpen, pl = 2 }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sectionOpen !== null) {
      setOpen(sectionOpen);
    }
  }, [sectionOpen]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const iconStyle = {
    fontSize: "1.2rem",
    minWidth: "36px",
  };

  if (item.children) {
    return (
      <>
        <ListItemButton onClick={handleToggle}>
          <ListItemIcon sx={iconStyle}>
            <item.icon sx={{ fontSize: "inherit" }} />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            sx={{ opacity: isSidebarOpen ? 1 : 0 }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <SidebarMenuItem
                key={child.title}
                item={child}
                isSidebarOpen={isSidebarOpen}
                sectionOpen={sectionOpen}
                pl={4}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton
      component={Link}
      href={item.path}
      selected={pathname === item.path}
      sx={{ pl }}
    >
      <ListItemIcon sx={iconStyle}>
        <item.icon sx={{ fontSize: "inherit" }} />
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        sx={{ opacity: isSidebarOpen ? 1 : 0 }}
      />
    </ListItemButton>
  );
};

const MenuSection = ({ section, isSidebarOpen }) => {
  const [sectionOpen, setSectionOpen] = useState(false);

  const handleToggleSection = () => {
    setSectionOpen(!sectionOpen);
  };

  return (
    <React.Fragment>
      {isSidebarOpen && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pl: 2,
            pr: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {section.title}
          </Typography>
          {section.title !== "General" && (
            <IconButton size="small" onClick={handleToggleSection}>
              {sectionOpen ? (
                <UnfoldLess fontSize="small" />
              ) : (
                <UnfoldMore fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
      )}
      {section.children.map((child) => (
        <SidebarMenuItem
          key={child.title}
          item={child}
          isSidebarOpen={isSidebarOpen}
          sectionOpen={sectionOpen}
        />
      ))}
    </React.Fragment>
  );
};

const Sidebar = () => {
  const isMobile = useResponsive("down", "md");
  const { isSidebarOpen, themeMode } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const { siteData: data } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
  };

  const drawerContent = (
    <Box
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box
        component={Link}
        href="/"
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSidebarOpen && (data?.site_logo_light || data?.site_logo_dark) ? (
          <Image
            src={
              themeMode === "light"
                ? config.fileBaseUrl + data?.site_logo_light
                : config.fileBaseUrl + data?.site_logo_dark
            }
            alt="logo"
            width={150}
            height={40}
            objectFit="contain"
          />
        ) : data?.site_favicon ? (
          <Image
            src={config.fileBaseUrl + data?.site_favicon}
            alt="logo"
            width={30}
            height={30}
            objectFit="contain"
          />
        ) : null}
      </Box>
      <List component="nav">
        {isSidebarOpen
          ? menuItems.map((item) => (
              <MenuSection
                key={item.title}
                section={item}
                isSidebarOpen={isSidebarOpen}
              />
            ))
          : menuItems.map((item) =>
              item.children.map((child) => (
                <Tooltip
                  key={child.title}
                  title={child.title}
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    component={Link}
                    href={child.path || "#"}
                    onClick={() => dispatch(toggleSidebar(true))}
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "auto" }}>
                      <child.icon />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              ))
            )}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isSidebarOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: isMobile
          ? drawerWidth
          : isSidebarOpen
          ? drawerWidth
          : miniDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile
            ? drawerWidth
            : isSidebarOpen
            ? drawerWidth
            : miniDrawerWidth,
          boxSizing: "border-box",
          transition: (theme) =>
            !isMobile
              ? theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                })
              : "none",
          overflowX: "hidden",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
