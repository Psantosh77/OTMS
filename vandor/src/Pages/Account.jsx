import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import StepContent from "../Component/Register";
import apiService from '../utils/apiService';
import CloseIcon from '@mui/icons-material/Close';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Account = () => {
  const location = useLocation();
  const [openRegister, setOpenRegister] = useState(false);
  const [regForm, setRegForm] = useState({
    email: '',
    name: '',
    phone: '',
    businessName: '',
    address: '',
    license: '',
    vat: null,
    bankInfo: '',
    logo: null
  });

  useEffect(() => {
    if (location && location.state && location.state.openRegister) {
      setOpenRegister(true);
      if (location.state.email) setRegForm((p) => ({ ...p, email: location.state.email }));
    }
  }, [location]);

  useEffect(() => {
    if (location && location.state && location.state.openRegister) {
      setOpenRegister(true);
    }
  }, [location]);
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
  <>
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
    {/* Registration Dialog (opens when navigated after OTP) */}
    <Dialog open={openRegister} onClose={() => setOpenRegister(false)} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={() => setOpenRegister(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Complete your Vendor Registration</Typography>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <input value={regForm.email} readOnly style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
            <input placeholder="Full name" value={regForm.name} onChange={(e) => setRegForm((p) => ({ ...p, name: e.target.value }))} style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
            <input placeholder="Phone" value={regForm.phone} onChange={(e) => setRegForm((p) => ({ ...p, phone: e.target.value }))} style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
            <input placeholder="Business Name" value={regForm.businessName} onChange={(e) => setRegForm((p) => ({ ...p, businessName: e.target.value }))} style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
            <textarea placeholder="Address" value={regForm.address} onChange={(e) => setRegForm((p) => ({ ...p, address: e.target.value }))} style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={async () => {
                try {
                  // call createVendor (open endpoint) if needed
                  const res = await apiService.post('vendor/create', regForm);
                  if (res?.data?.success) {
                    setOpenRegister(false);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}>Submit</Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default Account;
