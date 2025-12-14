"use client";
import { useGetSingleUserQuery } from "@/redux/features/user";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import LoadingIndicator from "../common/LoadingIndicator";
import AddBalance from "./AddBalance";
import Provider from "./Provider";
import ReduceBalance from "./ReduceBalance";
import Transactions from "./Transactions";
import UserProfile from "./UserProfile";
import Worker from "./Worker";

function UserDetails({ id }) {
  const { data, isLoading } = useGetSingleUserQuery(id);
  const [tab, setTab] = React.useState("worker");

  if (isLoading) return <LoadingIndicator />;
  const user = data?.data;
  if (!user) return <Typography align="center">User not found</Typography>;
  return (
    <Stack>
      <UserProfile user={user} />
      <Stack
        mb={2}
        direction="row"
        alignItems="center"
        columnGap={2}
        rowGap={1}
        flexWrap="wrap"
      >
        <Button
          onClick={() => setTab("worker")}
          variant={tab === "worker" ? "contained" : "outlined"}
        >
          Worker
        </Button>
        <Button
          onClick={() => setTab("job_provider")}
          variant={tab === "job_provider" ? "contained" : "outlined"}
        >
          Job Provider
        </Button>
        <Button
          onClick={() => setTab("transaction_history")}
          variant={tab === "transaction_history" ? "contained" : "outlined"}
        >
          Transaction History
        </Button>
        <Button
          onClick={() => setTab("add_balance")}
          variant={tab === "add_balance" ? "contained" : "outlined"}
        >
          Add Balance
        </Button>
        <Button
          onClick={() => setTab("reduce_balance")}
          variant={tab === "reduce_balance" ? "contained" : "outlined"}
          color="error"
        >
          Reduce balance
        </Button>
      </Stack>

      {tab === "worker" ? (
        <Worker user={user} />
      ) : tab === "job_provider" ? (
        <Provider user={user} />
      ) : tab === "transaction_history" ? (
        <Transactions user={user} />
      ) : tab === "add_balance" ? (
        <AddBalance userId={user.id} />
      ) : tab === "reduce_balance" ? (
        <ReduceBalance userId={user.id} />
      ) : null}
    </Stack>
  );
}

export default UserDetails;
