import LoadingIndicator from "@/components/common/LoadingIndicator";
import AllReports from "@/components/report/AllReports";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AllReports />
    </Suspense>
  );
};

export default page;
