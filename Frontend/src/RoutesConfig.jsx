import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Client/Home";
import Servicesetion from "./pages/Client/Servicessection"
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import Services from "./pages/Client/Services";
import ServiceDetails from "./pages/Client/ServiceDetails";
import Blog from "./pages/Client/Blog";
import Faq from './pages/Client/Faq'
import Bookings from "./pages/Client/Bookings";
import Checkout from "./pages/Client/Checkout";
import History from "./pages/Client/History";
import VehicleInfo from "./pages/Client/VehicleInfo";
import ClientDashboard from "./pages/Client/Dashboard";
import VendorDashboard from "./pages/Vendor/Dashboard";
import VendorKYC from "./pages/Vendor/KYC";
import VendorOnboarding from "./pages/Vendor/Onboarding";
import VendorOrders from "./pages/Vendor/Orders";
import VendorPricingSetup from "./pages/Vendor/PricingSetup";
import VendorServices from "./pages/Vendor/Services";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminCMS from "./pages/Admin/CMS";
import AdminFraudCheck from "./pages/Admin/FraudCheck";
import AdminTransactions from "./pages/Admin/Transactions";
import AdminUsers from "./pages/Admin/Users";
import AdminVendors from "./pages/Admin/Vendors";
import SelectUserType from "./pages/Auth/SelectUserType";
import ClientLogin from "./pages/Auth/ClientLogin";
import VendorLogin from "./pages/Auth/VendorLogin";
import AdminLogin from "./pages/Auth/AdminLogin";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRouter from "./components/DashboardRouter";
import { getUserInfo, getDashboardPathForRole } from "./utils/auth";
import UpdateUser from "./pages/Client/UpdateUser";
import OrderStatusWrapper from "./pages/Client/OrderStatusWrapper";



const RoutesConfig = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkAndRedirect() {
      const userInfo = await getUserInfo();
      if (userInfo.isAuthenticated && userInfo.role) {
        const dashboardPath = getDashboardPathForRole(userInfo.role);
        if (dashboardPath && location.pathname !== dashboardPath) {
          navigate(dashboardPath, { replace: true });
        }
      }
    }
    checkAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Servicessection" element={<Servicesetion/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={< Faq/>} />

      </Route>
      {/* Protected Client Routes */}
      <Route element={<MainLayout />}>
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/order-status" element={<OrderStatusWrapper />} />
        {/* <Route path="/client/dashboard" element={<ProtectedRoute allowedRoles={['customer']}><ClientDashboard /></ProtectedRoute>} /> */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        {/* <Route path="/services" element={<ProtectedRoute allowedRoles={['customer']}><Services /></ProtectedRoute>} /> */}
        <Route path="/services" element={<Services />} />
        {/* <Route path="/service-details" element={<ProtectedRoute allowedRoles={['customer']}><ServiceDetails /></ProtectedRoute>} /> */}
        <Route path="/service-details" element={<ServiceDetails />} />
        {/* <Route path="/bookings" element={<ProtectedRoute allowedRoles={['customer']}><Bookings /></ProtectedRoute>} /> */}
        <Route path="/bookings" element={<Bookings />} />
        {/* <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Checkout /></ProtectedRoute>} /> */}
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/history" element={<ProtectedRoute allowedRoles={['customer']}><History /></ProtectedRoute>} /> */}
        <Route path="/history" element={<History />} />
        {/* <Route path="/vehicle-info" element={<ProtectedRoute allowedRoles={['customer']}><VehicleInfo /></ProtectedRoute>} /> */}
        <Route path="/vehicle-info" element={<VehicleInfo />} />
      </Route>
      {/* Protected Vendor Routes */}
      <Route element={<MainLayout />}>
        {/* <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} /> */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        {/* <Route path="/vendor/kyc" element={<ProtectedRoute allowedRoles={['vendor']}><VendorKYC /></ProtectedRoute>} /> */}
        <Route path="/vendor/kyc" element={<VendorKYC />} />
        {/* <Route path="/vendor/onboarding" element={<ProtectedRoute allowedRoles={['vendor']}><VendorOnboarding /></ProtectedRoute>} /> */}
        <Route path="/vendor/onboarding" element={<VendorOnboarding />} />
        {/* <Route path="/vendor/orders" element={<ProtectedRoute allowedRoles={['vendor']}><VendorOrders /></ProtectedRoute>} /> */}
        <Route path="/vendor/orders" element={<VendorOrders />} />
        {/* <Route path="/vendor/pricing" element={<ProtectedRoute allowedRoles={['vendor']}><VendorPricingSetup /></ProtectedRoute>} /> */}
        <Route path="/vendor/pricing" element={<VendorPricingSetup />} />
        {/* <Route path="/vendor/services" element={<ProtectedRoute allowedRoles={['vendor']}><VendorServices /></ProtectedRoute>} /> */}
        <Route path="/vendor/services" element={<VendorServices />} />
      </Route>
      {/* Protected Admin Routes */}
      <Route element={<MainLayout />}>
        {/* <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} /> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/cms" element={<ProtectedRoute allowedRoles={['admin']}><AdminCMS /></ProtectedRoute>} /> */}
        <Route path="/admin/cms" element={<AdminCMS />} />
        {/* <Route path="/admin/fraud-check" element={<ProtectedRoute allowedRoles={['admin']}><AdminFraudCheck /></ProtectedRoute>} /> */}
        <Route path="/admin/fraud-check" element={<AdminFraudCheck />} />
        {/* <Route path="/admin/transactions" element={<ProtectedRoute allowedRoles={['admin']}><AdminTransactions /></ProtectedRoute>} /> */}
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        {/* <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} /> */}
        <Route path="/admin/users" element={<AdminUsers />} />
        {/* <Route path="/admin/vendors" element={<ProtectedRoute allowedRoles={['admin']}><AdminVendors /></ProtectedRoute>} /> */}
        <Route path="/admin/vendors" element={<AdminVendors />} />
      </Route>
      {/* Dynamic Dashboard Route - Redirects to appropriate dashboard based on user role */}

    </Routes>
  );
};

export default RoutesConfig;
