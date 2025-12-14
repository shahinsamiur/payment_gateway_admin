import StatCard from "@/components/StatCard";
import DownloadsBarChart from "@/components/charts/DownloadsBarChart";
import SessionsChart from "@/components/charts/SessionsChart";
import { Circle, People, Work } from "@mui/icons-material";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { DateField, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";

function formatWithCommas(number) {
  return Number(parseFloat(number)).toLocaleString("en-US");
}

const DashboardContent = ({ data }) => {
  const userData = analyzeDataWithGrowth(data?.total_users);
  const total_deposit = analyzeDataWithGrowth(data?.total_deposit);
  const total_withdraw = analyzeDataWithGrowth(data?.total_withdraw);
  const profit = calculateProfitAndGrowth(data?.total_earn, data?.total_cost);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const postStats = analyzePostGrowth(
    data?.total_advertisements_post || [],
    data?.total_job_post || []
  );

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        flexWrap="wrap"
      >
        <Typography variant="h4">Overview</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slots={{ field: DateField }}
              slotProps={{
                field: {
                  placeholder: "Start date",
                  size: "small",
                },
              }}
            />
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slots={{ field: DateField }}
              slotProps={{
                field: {
                  placeholder: "End date",
                  size: "small",
                },
              }}
            />
          </Stack>
        </LocalizationProvider>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Users"
            data={data?.total_users}
            trend={userData?.trend}
            value={formatWithCommas(userData?.total)}
            interval="Last 30 days"
            trendValues={userData?.growth}
            icon={<People fontSize="small" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Deposit"
            data={data?.total_deposit}
            trend={total_deposit?.trend}
            value={`$${formatWithCommas(total_deposit?.total)}`}
            interval="Last 30 days"
            trendValues={total_deposit?.growth}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Withdraw"
            data={data?.total_withdraw}
            trend={total_withdraw?.trend}
            value={`$${formatWithCommas(total_withdraw?.total)}`}
            interval="Last 30 days"
            trendValues={total_withdraw?.growth}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }} component={Card} variant="outlined">
          <CardContent
            component={Stack}
            spacing={2}
            direction="row"
            justifyContent="space-between"
          >
            <div>
              <Typography variant="caption">Total Users</Typography>
              <Typography variant="h5" fontWeight={600} component="p">
                {formatWithCommas(data?.total_users_count)}
              </Typography>
            </div>
            <People fontSize="large" />
          </CardContent>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} component={Card} variant="outlined">
          <CardContent
            component={Stack}
            spacing={2}
            direction="row"
            justifyContent="space-between"
          >
            <div>
              <Typography variant="caption">Active Users</Typography>
              <Typography variant="h5" fontWeight={600} component="p">
                {formatWithCommas(data?.online_users_count)}
              </Typography>
            </div>
            <Circle fontSize="medium" color="success" />
          </CardContent>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} component={Card} variant="outlined">
          <CardContent
            component={Stack}
            spacing={2}
            direction="row"
            justifyContent="space-between"
          >
            <div>
              <Typography variant="caption">Total Jobs</Typography>
              <Typography variant="h5" fontWeight={600} component="p">
                {formatWithCommas(data?.total_jobs_count)}
              </Typography>
            </div>
            <Work fontSize="large" />
          </CardContent>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SessionsChart
            trendvalues="up"
            netProfitData={[data?.total_earn || [], data?.total_cost || []]}
            title="Net Profit"
            total={formatWithCommas(profit?.profit)}
            growth={profit?.growth}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <DownloadsBarChart
            adData={data?.total_advertisements_post || []}
            jobData={data?.total_job_post || []}
            total={formatWithCommas(postStats?.total)}
            growth={postStats?.growth}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DashboardContent;

// Utility Functions
function analyzeDataWithGrowth(data) {
  if (!Array.isArray(data) || data?.length === 0) {
    return {
      total: 0,
      trend: "neutral",
      growth: 0,
    };
  }

  const total = data.reduce((sum, val) => sum + val, 0);
  const midpoint = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, midpoint);
  const secondHalf = data.slice(midpoint);

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);
  const firstSum = sum(firstHalf);
  const secondSum = sum(secondHalf);

  let trend = "neutral";
  if (secondSum > firstSum) trend = "up";
  else if (secondSum < firstSum) trend = "down";

  const growth =
    firstSum === 0 ? secondSum : ((secondSum - firstSum) / firstSum) * 100;

  return {
    total,
    trend,
    growth: parseFloat(growth.toFixed(2)),
  };
}

function calculateProfitAndGrowth(earn = [], cost = []) {
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  const totalEarn = sum(earn);
  const totalCost = sum(cost);
  const profit = totalEarn - totalCost;

  const growth =
    totalCost === 0 ? (totalEarn === 0 ? 0 : 100) : (profit / totalCost) * 100;

  return {
    totalEarn,
    totalCost,
    profit,
    growth: parseFloat(growth.toFixed(2)),
  };
}

function analyzePostGrowth(ad = [], job = []) {
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);
  const totalAd = sum(ad);
  const totalJob = sum(job);
  const total = totalAd + totalJob;

  const midpoint = Math.floor(ad.length / 2);
  const oldAd = sum(ad.slice(0, midpoint));
  const newAd = sum(ad.slice(midpoint));
  const oldJob = sum(job.slice(0, midpoint));
  const newJob = sum(job.slice(midpoint));

  const oldTotal = oldAd + oldJob;
  const newTotal = newAd + newJob;

  const growth =
    oldTotal === 0
      ? newTotal === 0
        ? 0
        : 100
      : ((newTotal - oldTotal) / oldTotal) * 100;

  return {
    total,
    growth: parseFloat(growth.toFixed(2)),
  };
}
