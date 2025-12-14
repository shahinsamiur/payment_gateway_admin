import ClientLayout from "@/components/layout/ClientLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }

  return <ClientLayout children={children} />;
};

export default Layout;
