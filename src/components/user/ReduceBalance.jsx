"use client";
import { useGetAllCostListQuery } from "@/redux/features/ganeral";
import { useAdjustUserBalanceMutation } from "@/redux/features/user";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

function ReduceBalance({ userId }) {
  const { data } = useGetAllCostListQuery();
  const dollarRate = parseFloat(
    data?.data?.all_cost?.find((item) => item.name === "dollar_rate")?.cost || 0
  );
  const [adjustBalance, { isLoading }] = useAdjustUserBalanceMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      equivalent_bdt_amount: "",
      transaction_type: "",
      remark: "",
    },
  });

  const amount = watch("amount");

  useEffect(() => {
    const amt = parseFloat(amount);
    if (!isNaN(amt) && dollarRate) {
      const bdtAmount = (amt * dollarRate).toFixed(4);
      setValue("equivalent_bdt_amount", bdtAmount, { shouldValidate: true });
    } else {
      setValue("equivalent_bdt_amount", "", { shouldValidate: true });
    }
  }, [amount, dollarRate, setValue]);

  async function onSubmit(data) {
    try {
      data.user_id = userId;
      await adjustBalance(data).unwrap();
      toast.success("Balance Adjusted Successfully");
      reset();
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    }
  }

  return (
    <div>
      <Card sx={{ maxWidth: 800, mx: "auto", mt: 2 }}>
        <CardHeader title="Deduct Balance from User balance" />
        <Divider />
        <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack spacing={1} direction="row" flexWrap="wrap" gap={2}>
              <div style={{ flexGrow: 1 }}>
                <Typography>Amount</Typography>
                <OutlinedInput
                  fullWidth
                  placeholder="Enter Amount"
                  {...register("amount", { required: "Amount is required" })}
                  error={Boolean(errors.amount)}
                />
                <FormHelperText error>{errors.amount?.message}</FormHelperText>
              </div>

              <div style={{ flexGrow: 1 }}>
                <Typography>Equivalent BDT Amount</Typography>
                <OutlinedInput
                  fullWidth
                  disabled
                  placeholder="Equivalent BDT Amount"
                  {...register("equivalent_bdt_amount")}
                  error={Boolean(errors.equivalent_bdt_amount)}
                />
                <FormHelperText error={Boolean(errors.equivalent_bdt_amount)}>
                  {errors.equivalent_bdt_amount?.message ||
                    `$1 Dollar = ${dollarRate} BDT`}
                </FormHelperText>
              </div>
            </Stack>

            <div>
              <Typography>Select balance type</Typography>
              <Controller
                name="transaction_type"
                control={control}
                rules={{ required: "Transaction Type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    input={<OutlinedInput />}
                    displayEmpty
                    error={Boolean(errors.transaction_type)}
                  >
                    <MenuItem disabled value="">
                      Select balance type
                    </MenuItem>
                    <MenuItem value="debit_earning_balance_by_system">
                      Deduct from Earning Balance
                    </MenuItem>
                    <MenuItem value="debit_deposit_balance_by_system">
                      Deduct from Deposit Balance
                    </MenuItem>
                  </Select>
                )}
              />
              <FormHelperText error>
                {errors.transaction_type?.message}
              </FormHelperText>
            </div>

            <div>
              <Typography>Remark</Typography>
              <OutlinedInput
                fullWidth
                placeholder="Enter Remark"
                {...register("remark", { required: "Remark is required" })}
                error={Boolean(errors.remark)}
                multiline
                rows={3}
              />
              <FormHelperText error>{errors.remark?.message}</FormHelperText>
            </div>

            <Stack alignItems="center">
              <Button loading={isLoading} type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReduceBalance;
