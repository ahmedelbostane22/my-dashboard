import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "./letterFrequency.jsx";

export default function Chart() {
  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "auto", marginLeft: "80px", marginTop: "64px" }}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "letter" }]}
        series={[
          {
            dataKey: "frequency",
            label: "Frequency",
            valueFormatter,
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
}
