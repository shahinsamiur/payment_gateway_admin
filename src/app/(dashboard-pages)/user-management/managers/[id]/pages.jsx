import LoadingIndicator from "@/components/common/LoadingIndicator";
import UserList from "@/components/manager/UserList";
import React, { Suspense } from "react";

const Page = async ({ params }) => {
  const { id } = await params;
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <UserList managerId={id} />
    </Suspense>
  );
};

export default Page;
