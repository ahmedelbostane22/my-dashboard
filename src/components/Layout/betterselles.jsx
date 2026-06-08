import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const monthsLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// بيانات وهمية
const dummySalesData = [1200, 1500, 1800, 2200, 2000, 2500, 2700, 3000, 2800, 3200, 3500, 4000];

export default function BetterSalesChart() {
  return (
    <Paper sx={{ p: 3, mb: 3  ,width: "60% " ,mx:"auto"}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Yearly Sales (Dummy Data)
      </Typography>
      <Box sx={{ width: "100%", height: 400 }}>
        <LineChart
          series={[
            {
              data: dummySalesData,
              label: "Sales",
              color: "#1976d2",
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: monthsLabels,
            },
          ]}
          yAxis={[{ width: 60 }]}
          grid={{ vertical: true, horizontal: true }}
          tooltip={{ trigger: "item" }}
          legend={{ position: "bottom" }}
        />
      </Box>
    </Paper>
  );
}
