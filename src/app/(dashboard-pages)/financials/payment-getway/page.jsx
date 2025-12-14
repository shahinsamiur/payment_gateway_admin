"use client";
import AutomaticGateways from "@/components/payment/AutomaticGateways";
import BankTransfer from "@/components/payment/BankTransfer";
import CryptoTransfer from "@/components/payment/CryptoTransfer";
import MobileBanking from "@/components/payment/MobileBanking";
import {
  useGetPaymentGatewayQuery,
  useSyncWithApayGatewayMutation,
  useSyncWithPassimpayGatewayMutation,
} from "@/redux/features/financials";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

const paymentTypes = {
  // mobileBanking: "mobile_banking",
  // bankTransfer: "bank_transfer",
  // cryptoTransfer: "crypto_transfer",
  apay: "apay_payment_methods",
  passim_pay: "passimpay_payment_methods",
};

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(paymentTypes.apay);
  const { data, isLoading } = useGetPaymentGatewayQuery();
  const [syncWithPassimpayGateway, { isLoading: syncPassimpayLoading }] =
    useSyncWithPassimpayGatewayMutation();
  const [syncWithApayGateway, { isLoading: syncApayLoading }] =
    useSyncWithApayGatewayMutation();

  async function handleSync(type) {
    try {
      if (type === paymentTypes.passim_pay) {
        await syncWithPassimpayGateway().unwrap();
      } else if (type === paymentTypes.apay) {
        await syncWithApayGateway().unwrap();
      }
      toast.success("Successfully synced with Passimpay API");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to sync with Passimpay API");
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Payment getway</Typography>
      <Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{ p: 2 }}
          gap={1}
        >
          <Stack direction="row" gap={1}>
            {Object.entries(paymentTypes).map(([key, value]) => (
              <Button
                key={key}
                variant={selectedTab === value ? "contained" : "outlined"}
                color="secondary"
                onClick={() => setSelectedTab(value)}
                sx={{ textTransform: "capitalize" }}
              >
                {key.replace("_", " ")}
              </Button>
            ))}
          </Stack>

          {selectedTab === paymentTypes.apay ||
          selectedTab === paymentTypes.passim_pay ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSync(selectedTab)}
              loading={syncPassimpayLoading || syncApayLoading}
            >
              Sync with {selectedTab.split("_")[0].toUpperCase()} API
            </Button>
          ) : null}
        </Stack>
        <Divider />
        <CardContent>
          {selectedTab === paymentTypes.bankTransfer ? (
            <MobileBanking
              data={data?.data?.mobile_banking}
              isLoading={isLoading}
            />
          ) : selectedTab === paymentTypes.bankTransfer ? (
            <BankTransfer
              data={data?.data?.bank_transfer}
              isLoading={isLoading}
            />
          ) : selectedTab === paymentTypes.cryptoTransfer ? (
            <CryptoTransfer
              data={data?.data?.crypto_wallet}
              isLoading={isLoading}
            />
          ) : selectedTab === paymentTypes.apay ? (
            <AutomaticGateways
              data={data?.data?.apay_payment_methods}
              isLoading={isLoading}
              type="apay"
            />
          ) : selectedTab === paymentTypes.passim_pay ? (
            <AutomaticGateways
              data={data?.data?.passimpay_payment_methods}
              isLoading={isLoading}
              type="passimpay"
            />
          ) : null}
        </CardContent>
      </Card>
    </Stack>
  );
}
