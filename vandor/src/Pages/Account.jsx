import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Account = () => {
  // 🔹 Dummy Stats
  const stats = [
    { title: "Total Income", value: "₹1,20,000" },
    { title: "Pending Orders", value: "25" },
    { title: "Completed Orders", value: "340" },
    { title: "New Customers", value: "52" },
  ];

  // 🔹 Dummy Graph Data
  const data = [
    { month: "Jan", profit: 20000 },
    { month: "Feb", profit: 25000 },
    { month: "Mar", profit: 18000 },
    { month: "Apr", profit: 30000 },
    { month: "May", profit: 40000 },
    { month: "Jun", profit: 35000 },
  ];

  // 🔹 Dummy Orders
  const orders = [
    { id: 1, customer: "Rahul", status: "Pending", amount: "₹2000" },
    { id: 2, customer: "Priya", status: "Completed", amount: "₹1500" },
    { id: 3, customer: "Aman", status: "Completed", amount: "₹3000" },
    { id: 4, customer: "Sneha", status: "Pending", amount: "₹1000" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Top Stats */}
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ bgcolor: "#f5f5f5", boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graph Section */}
      <Box mt={4}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Profit
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="profit" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Box>

      {/* Recent Orders */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Account;
