import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Client/Home";
import OrderStatusWrapper from "../pages/Client/OrderStatusWrapper";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-status" element={<OrderStatusWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
