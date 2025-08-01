import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import React, { useEffect, useState } from "react";

import Home from "./pages/Client/Home";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import Services from "./pages/Client/Services";
import Dashboard from "./pages/Client/Dashboard";
import ServiceDetails from "./pages/Client/ServiceDetails";
import Blog from "./pages/Client/Blog";

import SelectUserType from "./pages/Auth/SelectUserType";
import ClientLogin from "./pages/Auth/ClientLogin";
import VendorLogin from "./pages/Auth/VendorLogin";
import AdminLogin from "./pages/Auth/AdminLogin";

import MainLayout from "./layouts/MainLayout";
import store from "./redux/store";
import { isUserLoggedIn } from "./utils/auth";

import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const loggedIn = await isUserLoggedIn();
      setIsLoggedIn(loggedIn);
    })();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={isLoggedIn ? <Dashboard /> : <Home />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service-details" element={<ServiceDetails />} />
            <Route path="/blog" element={<Blog />} />
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
