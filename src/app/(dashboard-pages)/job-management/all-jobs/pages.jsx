import LoadingIndicator from "@/components/common/LoadingIndicator";
import AllJobs from "@/components/job-management/jobs/AllJobs";
import React, { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AllJobs />
    </Suspense>
  );
}

export default Page;
