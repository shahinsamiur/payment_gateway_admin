"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

const DonutChart = ({ size = 200, data }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <PieChart
        series={[
          {
            data,
            innerRadius: 60,
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
          },
        }}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default DonutChart;
