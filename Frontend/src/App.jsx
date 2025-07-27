import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Client/Home";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import Services from "./pages/Client/Services";
import Blog from "./pages/Client/Blog";
import MainLayout from "./layouts/MainLayout";
import UnifiedLogin from './pages/Auth/UnifiedLogin';

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Routes - all these pages will include header/footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/auth/login" element={<UnifiedLogin />} />

        </Route>

        {/* Auth Pages - optionally without header/footer, or add layout if needed */}
       
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
