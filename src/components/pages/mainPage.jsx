import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import ResponsiveGrid from '../Layout/responsiveGrid'
import BetterSalesChart from '../Layout/betterselles'
import TopProductsGrid from '../Layout/TopProductsGrid'
import { DataGrid } from "@mui/x-data-grid"
import { PieChart } from "@mui/x-charts/PieChart"

function MainPage() {
  // بيانات وهمية للـ Recent Orders
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
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* Cards Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Dashboard Overview
        </Typography>
        <ResponsiveGrid />
      </Paper>

      {/* Line Chart Section */}
      <BetterSalesChart className="w-1/4" />

      {/* Pie Chart Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
          width={400}
          height={250}
        />
      </Paper>

      {/* Top Products Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Top Selling Products
        </Typography>
        <TopProductsGrid />
      </Paper>

      {/* Recent Orders Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Orders
        </Typography>
        <div style={{ height: 300, width: "60%", margin : "auto" }}>
          <DataGrid 
            rows={dummyOrders} 
            columns={orderColumns} 
            pageSize={3} 
            rowsPerPageOptions={[3]} 
            sx={{ backgroundColor: "#fff", boxShadow: 2, borderRadius: 2 }}
          />
        </div>
      </Paper>
    </Box>
  )
}

export default MainPage
