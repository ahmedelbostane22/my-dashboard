// src/components/Layout/BestCustomerCard.jsx
import React from "react";
import { Paper, Typography, Box } from "@mui/material";

export default function BestCustomerCard() {

  const bestCustomer = {
    name: "Ahmed Ali",
    totalOrders: 15,
    totalSpent: 4500,
    
  };

  return (
    <Paper
      sx={{
        p: 3,
        textAlign: "center",
        background: "linear-gradient(135deg, #00C6FF, #0072FF)",
        color: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Best Customer
      </Typography>
      <Box>
        <Typography variant="subtitle1">{bestCustomer.name}</Typography>
        <Typography variant="body2">
          Orders: {bestCustomer.totalOrders}
        </Typography>
        <Typography variant="body2">
          Total Spent: ${bestCustomer.totalSpent}
        </Typography>
      </Box>
    </Paper>
  );
}