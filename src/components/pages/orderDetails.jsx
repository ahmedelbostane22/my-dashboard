import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Layout/firebase";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const statusColor = {
  Accepted: "success",
  Preparing: "warning",
  OnTheWay: "info",
  Delivered: "secondary",
  Denied: "error",
};

export default function OrderDetails() {
  const { userId, orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "users", userId, "orders", orderId);
        const snapshot = await getDoc(orderRef);

        if (snapshot.exists()) {
          setOrder(snapshot.data());
        } else {
          setOrder(null);
        }
      } catch (err) {
        console.error(err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userId, orderId]);

  // 🛑 Guards (مهم جدًا)
  if (loading) {
    return <p style={{ padding: 20 }}>Loading order details...</p>;
  }

  if (!order) {
    return <p style={{ padding: 20 }}>Order not found.</p>;
  }

  return (
    <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "90%", maxWidth: 900, borderRadius: 3 }}>
        <CardContent>

          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              تفاصيل الطلب
            </Typography>

            <Chip
              label={order.status}
              color={statusColor[order.status] || "default"}
              variant="outlined"
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Order Info */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>رقم الطلب:</strong> {order.orderId}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography><strong>الاسم:</strong> {order.name}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography><strong>المبلغ:</strong> ${order.totalPrice}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>طريقة الدفع:</strong>{" "}
                {order.paymentMethod?.method || order.paymentMethod}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>العنوان:</strong>{" "}
                {order.address
                  ? `${order.address.city}, ${order.address.street}, ${order.address.country}`
                  : "غير متوفر"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>تاريخ الطلب:</strong>{" "}
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleString("en-GB")
                  : "غير متوفر"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Products */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            المنتجات
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>المنتج</TableCell>
                <TableCell>الكمية</TableCell>
                <TableCell>السعر</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {order.products?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>x{p.quantity}</TableCell>
                  <TableCell>${p.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </Box>
  );
}
