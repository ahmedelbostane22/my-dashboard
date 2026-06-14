import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import ResponsiveGrid from '../Layout/responsiveGrid'
import BetterSalesChart from '../Layout/betterselles'
import TopProductsGrid from '../Layout/TopProductsGrid'
import { DataGrid } from "@mui/x-data-grid"
import { PieChart } from "@mui/x-charts/PieChart"

function MainPage() {

  const dummyOrders = [
    { id: 1, product: "Laptop", customer: "Ahmed", price: 1200, date: "2026-01-10" },
    { id: 2, product: "Phone", customer: "Sara", price: 800, date: "2026-01-11" },
    { id: 3, product: "Headphones", customer: "Omar", price: 150, date: "2026-01-12" },
  ]

  const orderColumns = [
    { field: "product", headerName: "Product", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "price", headerName: "Price ($)", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ]

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: '#f5f5f5',
        minHeight: '100vh',
        maxWidth: "1400px",
        mx: "auto",
      }}
    >

      {/* Cards Section */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Dashboard Overview
        </Typography>
        <ResponsiveGrid />
      </Paper>

      {/* Charts Section (Responsive Layout) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
        }}
      >

        {/* Sales Chart */}
        <Paper sx={{ p: 2, flex: 2 }}>
          <BetterSalesChart />
        </Paper>

        {/* Pie Chart */}
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Product Sales Distribution
          </Typography>

          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 40, label: "Laptops" },
                  { id: 1, value: 25, label: "Phones" },
                  { id: 2, value: 20, label: "Accessories" },
                  { id: 3, value: 15, label: "Others" },
                ],
              },
            ]}
            width={300}
            height={250}
          />
        </Paper>

      </Box>

      {/* Top Products */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Top Selling Products
        </Typography>
        <TopProductsGrid />
      </Paper>

      {/* Recent Orders */}
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Orders
        </Typography>

        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <div style={{ minWidth: 600 }}>
            <DataGrid
              rows={dummyOrders}
              columns={orderColumns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              sx={{
                backgroundColor: "#fff",
                boxShadow: 2,
                borderRadius: 2,
              }}
            />
          </div>
        </Box>
      </Paper>

    </Box>
  )
}

export default MainPage