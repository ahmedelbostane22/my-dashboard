import { DataGrid } from "@mui/x-data-grid";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

const columns = [
  { field: "title", headerName: "Product Name", width: 200 },
  { field: "quantity", headerName: "Total Quantity Sold", width: 180 },

  {field:"totalPrice",headerName:"Total Price",width:180},
  {field:"date",headerName:"Date",width:180},
  {field: "customer", headerName:"Customer",width:180}
];

export default function TopProductsGrid() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
  const unsub = onSnapshot(
    collectionGroup(db, "orders"),
    (snapshot) => {
      const productMap = {};

      snapshot.docs.forEach((doc) => {
        const d = doc.data();
        if (d.status !== "Delivered") return;

        d.products?.forEach((p) => {
          if (!productMap[p.title]) {
            productMap[p.title] = {
              quantity: 0,
              totalPrice: 0,
              lastDate: d.orderDate,
              customer: d.name ?? "Unknown",
            };
          }

          productMap[p.title].quantity += p.quantity ?? 1;
          productMap[p.title].totalPrice +=
            (p.price ?? 0) * (p.quantity ?? 1);

          // أحدث تاريخ
          if (
            new Date(d.orderDate) >
            new Date(productMap[p.title].lastDate)
          ) {
            productMap[p.title].lastDate = d.orderDate;
            productMap[p.title].customer = d.name ?? "Unknown";
          }
        });
      });

      const result = Object.entries(productMap)
        .map(([title, data], index) => ({
          id: index,
          title,
          quantity: data.quantity,
          totalPrice: data.totalPrice,
          date: data.lastDate,
          customer: data.customer,
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      setRows(result);
    }
  );

  return () => unsub();
}, []);
  return (
    <div style={{ height: 350, width: "60%", margin: "auto" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
