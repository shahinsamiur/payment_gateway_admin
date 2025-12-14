"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";

const getLastMonths = (count = 6) => {
  const now = new Date();
  const months = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "short" }));
  }
  return months;
};

export default function DownloadsBarChart({
  adData = [],
  jobData = [],
  title = "Ad & Job Posts Overview",
  total = 0,
  growth = 0,
}) {
  const theme = useTheme();
  const { primary } = theme.palette;

  const months = getLastMonths(Math.max(adData.length, jobData.length));

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
              size="small"
              variant="outlined"
              color={growth >= 0 ? "success" : "error"}
              label={`${growth >= 0 ? "+" : ""}${growth.toFixed(2)}%`}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Ad & Job posts in the last {months.length} months
          </Typography>
        </Stack>
        <BarChart
          height={250}
          series={[
            {
              data: adData,
              label: "Ad Posts",
              stack: "total",
              color: primary.dark,
            },
            {
              data: jobData,
              label: "Job Posts",
              stack: "total",
              color: primary.main,
            },
          ]}
          xAxis={[
            {
              data: months,
              scaleType: "band",
              tickPlacement: "middle",
              tickLabelPlacement: "middle",
              categoryGapRatio: 0.6,
            },
          ]}
          margin={{ left: 0, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          borderRadius={7}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}
