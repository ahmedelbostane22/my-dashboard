import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from "../Layout/firebase";

export default function SalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collectionGroup(db, "orders"),
      (snapshot) => {
        const map = {};

        snapshot.docs.forEach((doc) => {
          const d = doc.data();

          if (d.status !== "Delivered") return;

          const date = new Date(d.orderDate);
          const key = date.toLocaleDateString("en-GB"); // 13/01/2026

          map[key] = (map[key] || 0) + (d.totalPrice ?? 0);
        });

        const chartData = Object.keys(map).map((key) => ({
          date: key,
          revenue: map[key],
        }));

        setData(chartData);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "date" }]}
        series={[
          {
            dataKey: "revenue",
            label: "Revenue ($)",
          },
        ]}
        height={300}
      />
    </div>
  );
}
