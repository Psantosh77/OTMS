import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Client/Home";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import Services from "./pages/Client/Services";
import Dashboard from "./pages/Client/Dashboard";

import SelectUserType from "./pages/Auth/SelectUserType";
import ClientLogin from "./pages/Auth/ClientLogin";
import VendorLogin from "./pages/Auth/VendorLogin";
import AdminLogin from "./pages/Auth/AdminLogin";

import MainLayout from "./layouts/MainLayout";
import store from "./redux/store";

import "./index.css";
import React from "react";

// Add redirect logic


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
       
        <Routes>
          {/* Layout Routes - all these pages will include header/footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Auth Pages - optionally without header/footer, or add layout if needed */}
          <Route path="/auth/select-role" element={<SelectUserType />} />
          <Route path="/auth/client-login" element={<ClientLogin />} />
          <Route path="/auth/vendor-login" element={<VendorLogin />} />
          <Route path="/auth/admin-login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
