import LoadingIndicator from "@/components/common/LoadingIndicator";
import TransactionHistory from "@/components/transaction-history/TransactionHistory";
import React, { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <TransactionHistory />
    </Suspense>
  );
}

export default Page;
