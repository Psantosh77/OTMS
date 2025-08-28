import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Log1 from "./Component/login2";

// Pages
import Dashboard from "./Pages/Account";
import Services from "./Pages/Services";
import Orders from "./Pages/Order";
import Layout from "./Component/Navbar";
import Home from "./Component/Home";

function App() {
  // 🔹 check localStorage pehle se loggedIn hai ya nahi
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  // 🔹 jab login state change ho, usko localStorage me bhi update karo
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      {!isLoggedIn ? (
        <Log1 onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                onLogout={() => setIsLoggedIn(false)}
                loggedInUser="user@test.com"
              />
            }
          >
            <Route index element={<Home />} /> {/* default home */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;
