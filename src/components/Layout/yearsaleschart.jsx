import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

const monthsLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function YearSalesChart() {
  const [salesData, setSalesData] = useState(
    new Array(12).fill(0) // 12 شهر
  );

  useEffect(() => {
    const unsub = onSnapshot(
      collectionGroup(db, "orders"),
      (snapshot) => {
        const monthlySales = new Array(12).fill(0);

        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          // نجيب الطلبات اللي اتسلمت بس
          if (data.status !== "Delivered") return;

          if (!data.orderDate || !data.totalPrice) return;

          // نحول Timestamp لتاريخ
          const date = data.orderDate;
          const monthIndex = date.getMonth(); // 0 → 11

          monthlySales[monthIndex] += data.totalPrice;
        });

        setSalesData(monthlySales);
      }
    );

    return () => unsub();
  }, []);

  return (
    <Box sx={{ width: "50%", height: 350, margin: "auto" }}>
      <LineChart
        series={[
          {
            data: salesData,
            label: "Year Sales",
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: monthsLabels,
          },
        ]}
        yAxis={[{ width: 60 }]}
      />
    </Box>
  );
}
