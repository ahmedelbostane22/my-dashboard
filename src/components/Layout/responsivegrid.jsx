import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { onSnapshot, collectionGroup, query, where } from "firebase/firestore";
import { db } from "../Layout/firebase";
import { useState } from "react";

const Card = styled(Paper)(({ theme, bg }) => ({
  background: bg,
  color: "#fff",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  minHeight: 100,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export default function ResponsiveGrid() {
  const [revenue, setRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const q = query(
      collectionGroup(db, "orders"),
      where("status", "==", "Delivered")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const total = snapshot.docs.reduce((sum, doc) => {
          const data = doc.data();
          return sum + (data.totalPrice || 0);
        }, 0);

        setRevenue(total);
        setOrdersCount(snapshot.docs.length);
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    return () => unsub();
  }, []);

  const cards = [
    {
      title: "Total Revenue",
      value: `$${revenue}`,
      subtitle: "Delivered Orders",
      bg: "linear-gradient(135deg, #7F00FF, #E100FF)",
    },
    {
      title: "Orders Count",
      value: ordersCount,
      subtitle: "Completed Orders",
      bg: "linear-gradient(135deg, #00C6FF, #0072FF)",
    },
    {
      title: "Average Order",
      value: ordersCount ? `$${(revenue / ordersCount).toFixed(2)}` : "$0",
      subtitle: "Per Order",
      bg: "linear-gradient(135deg, #00FFA3, #DC1FFF)",
    },
    {
      title: "Status",
      value: "Live",
      subtitle: "Realtime Sync",
      bg: "linear-gradient(135deg, #FFA500, #FF4500)",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        width: "70%",
        margin: "auto",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card key={index} bg={card.bg}>
          <Typography variant="subtitle2">{card.title}</Typography>
          <Typography variant="h5">{card.value}</Typography>
          <Typography variant="caption">{card.subtitle}</Typography>
        </Card>
      ))}
    </Box>
  );
}
