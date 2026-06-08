import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../Layout/firebase";

const columns = [
  { id: "product", label: "Product", minWidth: 150 },
  { id: "customer", label: "Customer", minWidth: 150 },
  { id: "quantity", label: "Quantity", minWidth: 100, align: "right" },
  { id: "price", label: "Price", minWidth: 100, align: "right", format: (value) => `$${value}` },
  { id: "total", label: "Total", minWidth: 100, align: "right", format: (value) => `$${value}` },
  { id: "date", label: "Date", minWidth: 120, align: "center" },
];

export default function SalesDashboard() {
  const [sales, setSales] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalSales, setTotalSales] = React.useState(0);
  const [dateFilter, setDateFilter] = React.useState("30"); // Last Month by default
  const [productFilter, setProductFilter] = React.useState("All");
  const [customerFilter, setCustomerFilter] = React.useState("All");

  // تحميل بيانات المبيعات من Firestore
  React.useEffect(() => {
    const salesQuery = collection(db, "sales");

    const unsubscribe = onSnapshot(salesQuery, (snapshot) => {
      const rows = [];
      snapshot.docs.forEach((doc) => {
        const d = doc.data();
        if (Array.isArray(d.products)) {
          d.products.forEach((p, index) => {
            rows.push({
              id: doc.id + "_" + index,
              product: p.title ?? "N/A",
              customer: d.name ?? "Unknown",
              price: p.price ?? 0,
              quantity: p.quantity ?? 0,
              total: (p.price ?? 0) * (p.quantity ?? 0),
              date: d.deliveredAt ? new Date(d.deliveredAt.seconds * 1000) : null,
            });
          });
        }
      });
      setSales(rows);
    });

    return () => unsubscribe();
  }, []);

  // تحديث الـ Table حسب الفلتر
  const filteredSales = sales.filter((row) => {
    // فلترة حسب التاريخ
    const now = new Date();
    const days = parseInt(dateFilter, 10);
    const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const inDateRange = row.date ? row.date >= pastDate : false;

    // فلترة حسب المنتج والعميل
    const matchesProduct = productFilter === "All" || row.product === productFilter;
    const matchesCustomer = customerFilter === "All" || row.customer === customerFilter;

    return inDateRange && matchesProduct && matchesCustomer;
  });

  // حساب إجمالي المبيعات بعد الفلتر
  React.useEffect(() => {
    const total = filteredSales.reduce((sum, r) => sum + r.total, 0);
    setTotalSales(total);
  }, [filteredSales]);

  // إعداد قوائم المنتجات والعملاء للـ dropdown
  const productOptions = ["All", ...Array.from(new Set(sales.map((r) => r.product)))];
  const customerOptions = ["All", ...Array.from(new Set(sales.map((r) => r.customer)))];

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "60%", margin: "40px auto", padding: 3 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Sales Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: 20, flexWrap: "wrap" }}>
        <TextField select label="Date Filter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
          <MenuItem value="7">Last 7 Days</MenuItem>
          <MenuItem value="30">Last Month</MenuItem>
          <MenuItem value="365">This Year</MenuItem>
        </TextField>

        <TextField select label="Product Filter" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
          {productOptions.map((p) => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </TextField>

        <TextField select label="Customer Filter" value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)}>
          {customerOptions.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </TextField>
      </div>

      <h3>Total Sales: ${totalSales}</h3>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number" ? column.format(value) : (column.id === "date" && value ? value.toLocaleDateString() : value)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredSales.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
