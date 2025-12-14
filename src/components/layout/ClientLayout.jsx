"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import useResponsive from "@/hooks/useResponsive";
import { useGetUserQuery } from "@/redux/features/auth";
import { useGetSiteDataQuery } from "@/redux/features/dashboard";
import { setToken } from "@/redux/slices/authSlice";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";

const ClientLayout = ({ children }) => {
  const { isSidebarOpen } = useSelector((state) => state.layout);
  const { token } = useSelector((state) => state.auth);
  const isMobile = useResponsive("down", "md");
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(setToken(session?.accessToken));
    }
  }, [session]);

  useGetUserQuery(undefined, {
    skip: !session,
  });
  useGetSiteDataQuery();

  if (!token) return <LoadingIndicator />;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          backgroundColor: "background.default",
          width: isMobile
            ? "100%"
            : isSidebarOpen
            ? `calc(100vw - 300px)`
            : `calc(100vw - 60px)`,
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Container
          maxWidth="xl"
          component="main"
          sx={{
            px: { xs: 1, md: 2, lg: 3, "2xl": "none" },
            py: 2,
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default ClientLayout;
