"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import * as React from "react";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInMonth() {
  const dateCurrent = new Date();
  const date = new Date(
    dateCurrent.getFullYear(),
    dateCurrent.getMonth() + 1,
    0
  );
  const monthName = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function SessionsChart({
  title = "Net Profit",
  total = "00",
  netProfitData = [[], []],
  growth = "0",
}) {
  const theme = useTheme();
  const data = getDaysInMonth();
  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h5" fontWeight={600} component="p">
              {total}
            </Typography>
            <Chip
              variant="outlined"
              size="small"
              color="success"
              label={`${JSON.parse(growth).toFixed(2)}%`}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Net Profit for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: "direct",
              label: "Earn",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: netProfitData[0],
            },
            {
              id: "referral",
              label: "Cost",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: netProfitData[1],
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-organic": {
              fill: "url('#organic')",
            },
            "& .MuiAreaElement-series-referral": {
              fill: "url('#referral')",
            },
            "& .MuiAreaElement-series-direct": {
              fill: "url('#direct')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.dark} id="organic" />
          <AreaGradient color={theme.palette.primary.main} id="referral" />
          <AreaGradient color={theme.palette.primary.light} id="direct" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
